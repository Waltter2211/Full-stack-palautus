const router = require("express").Router();
const { Op } = require("sequelize");

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        as: "readBlogs",
        attributes: { exclude: ["userId"] },
      },
    });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  let read = {
    [Op.in]: [true, false]
  }

  if (req.query.read) {
    read = req.query.read === 'true'
  }

  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        /* {
          model: Blog,
          as: "readBlogs"
        }, */
        {
          model: Blog,
          as: "readBlogs",
          attributes: {
            exclude: ["userId"],
          },
          through: {
            attributes: ["id", "read"],
            where: {
              read
            }
          },
        },
      ],
    });
    if (!user) {
      res.status(404).end();
    } else {
        res.send(user)
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = req.body;
    user.password = "testpass";
    await User.create(user);
    res.send("success");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:username", async (req, res) => {
  try {
    const foundUser = await User.findOne({
      where: { username: req.params.username },
    });
    if (foundUser) {
      foundUser.name = req.body.name;
      foundUser.save();
      res.send(foundUser);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.send("success");
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
