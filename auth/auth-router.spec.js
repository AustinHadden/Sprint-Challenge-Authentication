const request = require("supertest");

const server = require("../api/server.js");

const db = require("../database/dbConfig.js");

describe("auth-router.js", function() {
    beforeEach(async () => {
        await db("users").truncate();
    });
  describe("Post /register", function() {
    it("should return a 201 OK", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "me", password: "pass" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it("should return a 500 error", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ password: "pass" })
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });
  describe("POST /login", function() {
      let username = "me";
      let password = "pass";
    it("should return a 200 OK", function() {
        request(server)
        .post("/api/auth/register")
        .send({ username: "me", password: "pass" })
        .then(res => {
            username = res.username;
            password = res.password;
        })
      return request(server)
        .post("/api/auth/login")
        .send({ username: username, password: password })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should return a 401 invalid credentials", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "Austin", password: "passsssss" })
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });
});
