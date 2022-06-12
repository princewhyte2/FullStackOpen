const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('../utils/list_helper');
const api = supertest(app);



beforeAll(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    console.log('cleared')

    const person = {
        username: 'Princewhyte1',
        password: 'Admin@123',
        name: 'Prince Whyte',
    }

    const response = await api.post('/api/users').send(person)
    helper.initialBlogs[0].user = response.body.id


    const blogObject = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObject.map(blog => blog.save());
    await Promise.all(promiseArray);
}, 30000);




describe('retrieve blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 30000)

    test('unique identifier is id', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body[0].id).toBeDefined();
    }, 30000)
})



describe('handling blog posts', () => {
    test('if no url api should return failed', async () => {

        const personLogin = {
            username: 'Princewhyte1',
            password: 'Admin@123',
        }
        const response = await api.post('/api/login').send(personLogin)
        const user = response.body


        const newBlog = {
            title: 'Test blog',
            author: 'Test author',
        }
        await api.post('/api/blogs').set('Authorization', `Bearer ${user.token}`).send(newBlog).expect(400);


    }, 30000)

    test('if no title api should return failed', async () => {


        const personLogin = {
            username: 'Princewhyte1',
            password: 'Admin@123',
        }
        const response = await api.post('/api/login').send(personLogin)
        const user = response.body


        const anotherBlog = {
            url: 'www.test.com',
        }
        await api.post('/api/blogs').set('Authorization', `Bearer ${user.token}`).send(anotherBlog).expect(400);
    }, 30000)


    test('creates a new blog', async () => {
        const response = await api.post('/api/login').send({
            username: 'Princewhyte1',
            password: 'Admin@123'
        })
        const user = response.body

        const newBlog = {
            title: 'Test blog',
            author: 'Test author',
            url: 'www.test.com',
            likes: 2
        }
        await api.post('/api/blogs').set('Authorization', `Bearer ${user.token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
    }, 30000)

    test('if likes not included in post it should default to 0', async () => {
        const userLogin = await api.post('/api/login').send({
            username: 'Princewhyte1',
            password: 'Admin@123'
        })
        const user = userLogin.body



        const newBlog = {
            title: 'Test blog',
            author: 'Test author',
            url: 'www.test.com',
        }
        const response = await api.post('/api/blogs').set('Authorization', `Bearer ${user.token}`).send(newBlog)

        expect(response.body.likes).toBe(0);
    }, 30000)

})




describe('bloglist deleting ', () => {
    test('deletes a blog', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];
        const response = await api.post('/api/login').send({
            username: 'Princewhyte1',
            password: 'Admin@123'
        })
        const user = response.body
        await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${user.token}`).expect(204);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);
    }, 30000)
})

describe('bloglist updating ', () => {
    test('updates a blog', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];
        const response = await api.post('/api/login').send({
            username: 'Princewhyte1',
            password: 'Admin@123'
        })
        const user = response.body
        const updatedBlog = {
            title: 'Test blog',
            likes: 20
        }
        await api.put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', `Bearer ${user.token}`).send(updatedBlog).expect(200);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd.length).toBe(blogsAtStart.length);
        expect(blogsAtEnd[0].likes).toBe(20);
    }, 30000)
})

describe('users activities', () => {
    test('invalid users not created', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: 'te',
            name: 'test',
            password: 'test'
        }
        await api.post('/api/users').send(newUser).expect(400);

        const newUser2 = {
            username: 'test',
            name: 'test',
        }
        await api.post('/api/users').send(newUser2).expect(400);

        const newUser3 = {
            name: 'test',
            password: 'test'
        }
        await api.post('/api/users').send(newUser3).expect(400);

        const newUser4 = {
            username: 'test',
            name: 'test',
            password: 'te'
        }
        await api.post('/api/users').send(newUser4).expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    }, 30000)
})

afterAll(() => {
    mongoose.connection.close()
})