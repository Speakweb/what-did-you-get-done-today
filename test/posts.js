const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mockMongoDBUri = await mongoServer.getUri();
    process.env.MONGODB_URI=mockMongoDBUri;

    const app = require('../app.js');

    describe('GET /posts', () => {
        it('should return 200 OK', (done) => {
            request(app)
            .get('/posts')
            .expect(200, done);
        });

        it('should render an HTML page', (done) => {
            /**
             * checking to see if the res.render function is called
             * maybe there is a way to test if the server side rendered content or pug file name  is correct
             */
        })
    });

    describe('GET /posts/search', () => {
        it('should return 200 OK', (done) => {
            request(app)
            .get('/posts/search')
            .expect(200, done);
        });

        it('should render an HTML page', (done) => {
            /**
             * checking to see if the res.render function is called
             * maybe there is a way to test if the server side rendered content or pug file name  is correct
             */
        })
    });

    describe('GET /posts/:userId', () => {
        it('should return 200 OK', (done) => {
            const userId = 'testUserId';
            request(app)
            .get(`/posts/${userId}`)
            .expect(200, done);
        });

        it('should get the correct params on the server', (done) => {
            
        });

        it('should render an HTML page', (done) => {
            /**
             * checking to see if the res.render function is called
             * maybe there is a way to test if the server side rendered content or pug file name  is correct
             */
        })
    });

    describe('GET /posts/:userId/:postId', () => {
        it('should return 200 OK', (done) => {
            request(app)
            .get('/posts/:userId/:postId')
            .expect(200, done);
        });

        it('should get the correct params on the server', (done) => {
            
        });

        it('should render an HTML page', (done) => {
            /**
             * checking to see if the res.render function is called
             * maybe there is a way to test if the server side rendered content or pug file name  is correct
             */
        })
    });

    describe('POST /posts', () => {
        it('should return 200 OK', (done) => {
            request(app)
            .post('/posts')
            .expect(200, done);
        });

        it('should contain the correct post content', (done) => {
            /**
             * checking to see if sending a POST request with data of type String works
            */
        });

        it('should create a Post in the database with the correct content', (done) => {
            /**
             * checking to see if a MongoDB document was created
             * checking to see if the correct content was saved to the newly created document
             */
        });

        it('should render the correct web page in response to receiving and saving the content to the database', (done) => {
            /**
             * checking to see if the res.render function is called
             * maybe there is a way to test if the server side rendered HTML content or pug file name is correct
             */
        });
    });
})();
