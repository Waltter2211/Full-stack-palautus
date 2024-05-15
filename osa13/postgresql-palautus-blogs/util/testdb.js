const { Sequelize } = require('sequelize');
require('dotenv').config()

const { User, Blog } = require('../models')
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const testDataInsert = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected to db')
        console.log('Inserting user data...')
        await User.create({username: 'testusername@gmail.com', name: 'testname', createdAt: new Date()})
        await User.create({username: 'testadminusername@gmail.com', name: 'testadminname', createdAt: new Date()})
        await User.create({username: 'testinactiveusername@gmail.com', name: 'testinactivename', createdAt: new Date()})
        console.log('Successfully inserted user data')
        console.log('Inserting note data...')
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 1, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 1, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 1, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 2, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 2, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 2, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 3, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 3, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 3, createdAt: new Date()})
        console.log('Successfully inserted note data')
        await sequelize.close()
    } catch (error) {
        console.log(error)
    }
}

testDataInsert()