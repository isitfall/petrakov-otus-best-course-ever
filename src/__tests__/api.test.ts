import request from 'supertest';
import mongoose from "mongoose";
import { User } from "../db/models/user.models";
import { main } from "../app";
import { DatabaseClient } from "../db/client";
import config from "../db/config";

const TEST_DB_URI = `mongodb://${config.db_login}:${config.db_password}@localhost:27017/testdb_${Date.now()}?authSource=admin`;

let app: any;

beforeAll(async () => {
    app = await main(TEST_DB_URI);
    console.log("Connected to test DB");
}, 10000);

afterAll(async () => {
    await DatabaseClient.getInstance().disconnect();

}, 10000);

beforeAll(async () => {
    await User.deleteMany({});
})


describe('API Tests', () => {
    let token: string;
    let courseId: string;
    let lessonId: string;
    let ratingId: string;
    let tagId: string;

    describe('POST /api/auth/register', () => {
        it.skip('should register a new user', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.email).toBe('test@example.com');
        });
    });

    describe('POST /api/auth/login', () => {
        it.skip('should login a user and return a token', async () => {
            await request(app).post('/api/auth/register').send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            token = response.body.token;
        });
    });

    describe('GET /api/users/me', () => {
        it.skip('should return the current user info', async () => {
            const response = await request(app)
                .get('/api/users/me')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('email', 'test@example.com');
        });
    });

    describe("GET /api/users", () => {
        it("should return 404 if no users exist", async () => {
            const response = await request(app).get("/api/users");

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Users Not Found");
        });

        it("should return 200 and list of users", async () => {
            await User.create({
                username: "alice123",
                email: "alice@example.com",
                password: "password123",
                role: "user"
            });

            await User.create({
                username: "bob123",
                email: "bob@example.com",
                password: "password456",
                role: "admin"
            });

            const response = await request(app).get("/api/users");


            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0].username).toBe("alice123");
            expect(response.body[1].email).toBe("bob@example.com");
        });
    });

    describe("POST /api/users", () => {
        it("should return 400 if user data is missing", async () => {
            const response = await request(app)
                .post("/api/users")
                .send({});

            expect(response.status).toBe(400);
        });

        it("should create a new user", async () => {
            const userData = {
                username: "Charlie",
                email: "charlie@example.com",
                password: "password123",
                role: "user"
            };

            const response = await request(app)
                .post("/api/users")
                .send(userData);

            expect(response.status).toBe(201);
            expect(response.body.username).toBe(userData.username);
            expect(response.body.email).toBe(userData.email);
            expect(response.body.password).toBe(userData.password);
            expect(response.body.role).toBe(userData.role);
        });
    });

    describe("DELETE /api/users/:id", () => {
        it("should return 404 if user does not exist", async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app).delete(`/api/users/${fakeId}`);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("User does not exist");
        });

        it("should delete an existing user", async () => {
            const user = await User.create({ username: "Dave", email: "dave@example.com", password: "pass", role: "user" });
            const response = await request(app).delete(`/api/users/${user._id}`);

            expect(response.status).toBe(200);

            const deletedUser = await User.findById(user._id);
            expect(deletedUser).toBeNull();
        });
    });

    describe("PUT /api/users/:id/role", () => {
        it("should return 404 if user does not exist", async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app)
                .put(`/api/users/${fakeId}/role`)
                .send({ role: "admin" });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("User does not exist");
        });

        it("should update the role of a user", async () => {
            const user = await User.create({ username: "Eve", email: "eve@example.com", password: "password123" });

            const response = await request(app)
                .put(`/api/users/${user._id}/role`)
                .send({ role: "admin" });

            expect(response.status).toBe(201);

            const updatedUser = await User.findById(user._id);
            expect(updatedUser?.role).toBe("admin");
        });
    });

    describe('POST /api/courses', () => {
        it('should create a new course', async () => {
            const user = await User.create({
                username: "alice1234",
                email: "alice123231@example.com",
                password: "password123",
                role: "user"
            });

            const courseData = {
                title: "Test Course",
                authorId: user._id as string,
                description: 'This is a test course',
                difficulty: "beginner",
            };


            const response = await request(app)
                .post('/api/courses').send(courseData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('_id');
            expect(response.body.title).toBe('Test Course');
            courseId = response.body._id;
        });
    });

    describe('GET /api/courses/:id', () => {
        it('should return course details', async () => {
            const response = await request(app)
                .get(`/api/courses/${courseId}`)
                // .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Test Course');
        });
    });

    describe('PUT /api/courses/:id', () => {
        it('should update course details', async () => {
            await request(app)
                .put(`/api/courses/${courseId}`)
                .send({title: 'Updated Course Title', description: "Updated description"})
                // .set('Authorization', `Bearer ${token}`)

            const response = await request(app)
                .get(`/api/courses/${courseId}`)


            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Updated Course Title');
        });
    });

    describe('DELETE /api/courses/:id', () => {
        it('should delete a course', async () => {
            const response = await request(app)
                .delete(`/api/courses/${courseId}`)
                // .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Updated Course Title');
        });
    });

    describe('POST /api/lessons', () => {
        it('should create a new lesson', async () => {

            const lesson = {
                title: 'Test Lesson',
                description: "Lesson",
                courseId,
            }

            const response = await request(app)
                .post('/api/lessons')
                // .set('Authorization', `Bearer ${token}`)
                .send(lesson);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('_id');
            expect(response.body.title).toBe('Test Lesson');
            lessonId = response.body._id;
        });
    });

    describe('GET /api/lessons/:id', () => {
        it('should return lesson details', async () => {
            const response = await request(app)
                .get(`/api/lessons/${lessonId}`)
                // .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Test Lesson');
        });
    });

    describe('PUT /api/lessons/:id', () => {
        it('should update lesson details', async () => {
            await request(app)
                .put(`/api/lessons/${lessonId}`)
                .send({title: 'Updated lesson Title', description: "Updated description"})
                // .set('Authorization', `Bearer ${token}`)

            const response = await request(app)
                .get(`/api/lessons/${lessonId}`)
                // .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Updated lesson Title');
        });
    });

    describe('DELETE /api/lessons/:id', () => {
        it('should delete a lesson', async () => {
            const response = await request(app)
                .delete(`/api/lessons/${lessonId}`)
                // .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Updated lesson Title');
        });
    });

    describe('POST /api/ratings', () => {
        it('should add a rating to a lesson', async () => {
            const user = await User.create({
                username: "bob123",
                email: "bob11@example.com",
                password: "password456",
                role: "admin"
            });

            const response = await request(app)
                .post('/api/ratings')
                // .set('Authorization', `Bearer ${token}`)
                .send({
                    lessonId,
                    userId: user._id,
                    value: 5,
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('value', 5);
            ratingId = response.body._id;
        });
    });

    describe('GET /api/ratings/:id', () => {
        it('should return all ratings for a lesson', async () => {
            const response = await request(app)
                .get(`/api/ratings/${ratingId}`)
                // .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
        });
    });

    describe('POST /api/tags', () => {
        it('should create a new tag', async () => {
            const response = await request(app)
                .post('/api/tags')
                // .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'New Tag',
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('title', 'New Tag');
            tagId = response.body._id;
        });
    });

    describe('DELETE /api/tags/:id', () => {
        it('should delete a tag', async () => {
        const response = await request(app)
                .delete(`/api/tags/${tagId}`)
                // .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'New Tag');
        });
    });
});