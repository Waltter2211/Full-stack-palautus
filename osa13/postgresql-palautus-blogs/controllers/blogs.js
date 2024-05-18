const router = require("express").Router();
const { Op } = require("sequelize");
const jwtVerifier = require("../util/jwtVerifier");

const { Blog, User } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: "usersMarked",
      },
    ],
  });
  next();
};

router.get("/", async (req, res) => {
  try {
    let where = {};

    if (req.query.search) {
      where = {
        [Op.or]: {
          title: {
            [Op.substring]: req.query.search,
          },
          author: {
            [Op.substring]: req.query.search,
          },
        },
      };
    }

    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        as: "usersMarked",
        attributes: ["name"],
      },
      where,
      order: [["likes", "DESC"]],
    });
    res.send(blogs);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/:id", blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      res.send(req.blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", jwtVerifier, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.send(blog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json({ likes: req.blog.likes });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", jwtVerifier, blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      await req.blog.destroy();
      res.json(req.blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
