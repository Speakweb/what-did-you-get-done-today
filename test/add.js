const request = require('supertest');

const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mockMongoDBUri = await mongoServer.getUri();
    process.env.MONGODB_URI=mockMongoDBUri;

    const app = require('../app.js');

    describe('GET /add', () => {
        it('should return 200 OK', (done) => {

        });

        it('should render an HTML page', (done) => {
            /**
             * checking to see if the res.render function is called
             * maybe there is a way to test if the server side rendered content is correct
             */
        })
    });

    describe('POST /add', () => {
        it('should return 200 OK', (done) => {

        });

        it('should contain the correct content', (done) => {
            /**
             * checking to see if sending a POST request with data of type String works
            */
        });

        it('should render an HTML page in response to receiving data', (done) => {
            /**
             * checking to see if the res.render function is called
             * maybe there is a way to test if the server side rendered content is correct
             */
        })
    });
})();
