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
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 1, writingYear: 1991, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 1, writingYear: 1992, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 1, writingYear: 1993, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 2, writingYear: 1994, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 2, writingYear: 1995, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 2, writingYear: 1996, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 3, writingYear: 1997, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 3, writingYear: 1998, createdAt: new Date()})
        await Blog.create({author: 'testauthor', url: 'testurl', title: 'testtitle', likes: 0, userId: 3, writingYear: 1999, createdAt: new Date()})
        console.log('Successfully inserted note data')
        await sequelize.close()
    } catch (error) {
        console.log(error)
    }
}

testDataInsert()