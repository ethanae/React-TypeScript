import 'mocha';
import * as chai from 'chai';
const chaiHttp = require('chai-http');

import sut from '../Server';

chai.use(chaiHttp);
const expect = chai.expect;

const mockUser = {
  idNumber: "123456789",
  firstName: "bobby",
  lastName: "tables",
  email: "bob@tables.drop",
  tel: "123456789",
  address: "123 table lane"
};

describe('create a user', () => {
  it('should be 201 accepted', async () => {
    const result = await chai.request(sut).post('/api/user').send(mockUser);
    expect(result).to.have.status(201);
  });
});

describe('search a user', () => {
  it('should be 200 OK', async () => {
    const result = await chai.request(sut).get(`/api/user/id/${mockUser.idNumber}`);
    expect(result).to.have.status(200);
    expect(result.body.idNumber).to.equal(mockUser.idNumber);
    expect(result.body.firstName).to.equal(mockUser.firstName);
    expect(result.body.lastName).to.equal(mockUser.lastName);
    expect(result.body.email).to.equal(mockUser.email);
    expect(result.body.tel).to.equal(mockUser.tel);
    expect(result.body.address).to.equal(mockUser.address);
  });
});

describe('delete a user', () => {
  it('should be 202 no content', async () => {
    const result = await chai.request(sut).del(`/api/user/id/${mockUser.idNumber}`);
    expect(result).to.have.status(202);
  });
});

describe('search a non-existent user', () => {
  it('should be 404', async () => {
    const result = await chai.request(sut).get(`/api/user/id/123`);
    expect(result).to.have.status(404);
  });
});







