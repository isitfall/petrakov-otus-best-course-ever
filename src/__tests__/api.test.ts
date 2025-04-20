import request from 'supertest';
import { app } from "../app";


describe('API Tests', () => {
    let token: string;
    let courseId: string;
    let lessonId: string;

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
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
        it('should login a user and return a token', async () => {
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
        it('should return the current user info', async () => {
            const response = await request(app)
                .get('/api/users/me')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('email', 'test@example.com');
        });
    });

    describe('POST /api/courses', () => {
        it('should create a new course', async () => {
            const response = await request(app)
                .post('/api/courses')
                .set('Authorization', `Bearer ${token}`)
                .field('title', 'Test Course')
                .field('description', 'This is a test course')
                .field('tags', JSON.stringify(['tag1', 'tag2']))
                .field('difficulty', 'beginner');

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('Test Course');
            courseId = response.body.id;
        });
    });

    describe('GET /api/courses/:id', () => {
        it('should return course details', async () => {
            const response = await request(app)
                .get(`/api/courses/${courseId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Test Course');
        });
    });

    describe('PUT /api/courses/:id', () => {
        it('should update course details', async () => {
            const response = await request(app)
                .put(`/api/courses/${courseId}`)
                .set('Authorization', `Bearer ${token}`)
                .field('title', 'Updated Course Title')
                .field('description', 'Updated description');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Updated Course Title');
        });
    });

    describe('DELETE /api/courses/:id', () => {
        it('should delete a course', async () => {
            const response = await request(app)
                .delete(`/api/courses/${courseId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Course deleted successfully');
        });
    });

    describe('POST /api/lessons', () => {
        it('should create a new lesson', async () => {
            const response = await request(app)
                .post('/api/lessons')
                .set('Authorization', `Bearer ${token}`)
                .field('title', 'Test Lesson')
                .field('description', 'This is a test lesson')
                .field('courseId', courseId);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('Test Lesson');
            lessonId = response.body.id;
        });
    });

    describe('GET /api/lessons/:id', () => {
        it('should return lesson details', async () => {
            const response = await request(app)
                .get(`/api/lessons/${lessonId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Test Lesson');
        });
    });

    describe('PUT /api/lessons/:id', () => {
        it('should update lesson details', async () => {
            const response = await request(app)
                .put(`/api/lessons/${lessonId}`)
                .set('Authorization', `Bearer ${token}`)
                .field('title', 'Updated Lesson Title')
                .field('description', 'Updated description');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Updated Lesson Title');
        });
    });

    describe('DELETE /api/lessons/:id', () => {
        it('should delete a lesson', async () => {
            const response = await request(app)
                .delete(`/api/lessons/${lessonId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Lesson deleted successfully');
        });
    });

    describe('POST /api/ratings', () => {
        it('should add a rating to a lesson', async () => {
            const response = await request(app)
                .post('/api/ratings')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    lessonId,
                    rating: 5,
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('rating', 5);
        });
    });

    describe('GET /api/ratings/:lessonId', () => {
        it('should return all ratings for a lesson', async () => {
            const response = await request(app)
                .get(`/api/ratings/${lessonId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/tags', () => {
        it('should create a new tag', async () => {
            const response = await request(app)
                .post('/api/tags')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'New Tag',
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('title', 'New Tag');
        });
    });

    describe('DELETE /api/tags/:id', () => {
        it('should delete a tag', async () => {
            const tagResponse = await request(app)
                .post('/api/tags')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Tag to Delete',
                });

            const tagId = tagResponse.body.id;

            const response = await request(app)
                .delete(`/api/tags/${tagId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Tag deleted successfully');
        });
    });
});