const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/pubserver');
const Topic = require('../src/models/Topic');

const should = chai.should();

const topics = JSON.parse(
  fs.readFileSync(`${process.env.PWD}/_data/topics.json`, 'utf-8')
);

chai.use(chaiHttp);

describe('Publisher Server Endpoints', () => {
  before((done) => {
    Topic.create(topics, (err) => {
      done();
    });
  });

  after((done) => {
    Topic.deleteMany({}, (err) => {
      done();
    });
  });

  context('Create a Subscription', () => {
    it('creates a subscription', (done) => {
      chai
        .request(app)
        .post('/subscribe/topic1')
        .send({
          url: 'http://mysubscriber.test',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.topic.should.be.eql('topic1');
          res.body.url.should.be.eql('http://mysubscriber.test');

          done();
        });
    });

    it('creates another subscription', (done) => {
      chai
        .request(app)
        .post('/subscribe/topic1')
        .send({
          url: 'http://anothersubscriber.test',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.topic.should.be.eql('topic1');
          res.body.url.should.be.eql('http://anothersubscriber.test');

          done();
        });
    });

    it('rejects for non-existent topic', (done) => {
      chai
        .request(app)
        .post('/subscribe/non-existent-topic')
        .send({ url: 'http://mysubscriber.test' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.be.eql('Topic does not exist.');

          done();
        });
    });

    it('rejects for empty url', (done) => {
      chai
        .request(app)
        .post('/subscribe/topic1')
        .send({ url: '' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.eql('URL cannot be empty.');

          done();
        });
    });

    it('rejects for invalid url', (done) => {
      chai
        .request(app)
        .post('/subscribe/topic1')
        .send({ url: 'invalid-url' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.eql('Subscriber must be a valid URL.');

          done();
        });
    });
  });

  context('Publish Message To Topic', () => {
    it('publishes message', (done) => {
      chai
        .request(app)
        .post('/publish/topic1', { message: 'Hello' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.eql('Message published successfully.');

          done();
        });
    });

    it('rejects publish for non-existent topic', (done) => {
      chai
        .request(app)
        .post('/publish/non-existent-topic')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.be.eql(
            'Unable to publish message to this topic.'
          );

          done();
        });
    });
  });
});
