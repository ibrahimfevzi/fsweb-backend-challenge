/* eslint-disable no-undef */
const db = require("./data/db-config");
const request = require("supertest");
const server = require("./api/server");

afterAll(async () => {
  await db.destroy();
});
beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

describe("POST /register ve /login", () => {
  test("[1] yeni kullanıcı oluşuyor mu", async () => {
    const userData = {
      username: "ibrahimfevzi",
      password: "1234",
      email: "ibrahim@example.com",
    };

    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);

    // İsteğin döndürdüğü yanıtın kontrolü
    expect(actual.status).toBe(201);
    expect(actual.body[0]).toHaveProperty("username", "ibrahimfevzi");
    expect(actual.body[0]).toHaveProperty("email", "ibrahim@example.com");
  });

  test("[2] post methodunda olmayan alan hata döndürüyor mu", async () => {
    const userData = {
      username: "William",
    };
    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);
    //assert
    expect(actual.status).toBe(400);
  });

  test("[3] login bilgileri hatalı ise giriş yapılıyor mu", async () => {
    const userDataLogin = {
      username: "John Doe",
      password: "1452",
      email: "john@example.com",
      user_id: "4",
    };

    let actual = await request(server)
      .post("/api/auth/login")
      .send(userDataLogin);

    // İsteğin döndürdüğü yanıtın kontrolü
    expect(actual.status).toBe(401);
  });
});

describe("Post testleri", () => {
  test("[5] Başarılı login oldu.", async () => {
    //act
    var loginPayload = {
      username: "ibrahim",
      email: "ibrahim@example.com",
      password: "1234",
    };
    let actual = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    expect(actual.status).toBe(200);
    /// Act
    const response = await request(server)
      .get("/api/users/")
      .set("authorization", actual.body.token);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  test("[6] yeni tweet oluşuyor mu", async () => {
    const tweet = {
      content: "test",
    };

    // Login to get the authorization token
    const loginPayload = {
      username: "ibrahim",
      email: "ibrahim@example.com",
      password: "1234",
    };
    const loginResponse = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    const token = loginResponse.body.token;

    // Create a new tweet with the authorization token
    const response = await request(server)
      .post("/api/posts")
      .send(tweet)
      .set("authorization", token);

    // Check the response
    expect(response.status).toBe(201);
  });

  test("[7] yeni comment oluşuyor mu", async () => {
    const comment = {
      content: "test",
      post_id: "1",
    };

    // Login to get the authorization token
    const loginPayload = {
      username: "ibrahim",
      email: "ibrahim@example.com",
      password: "1234",
    };
    const loginResponse = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    const token = loginResponse.body.token;

    // Create a new comment with the authorization token
    const response = await request(server)
      .post("/api/comments")
      .send(comment)
      .set("authorization", token);

    // Check the response
    expect(response.status).toBe(201);
  });
});

//DELETE TESTLERİ
describe("Delete testleri", () => {
  test("[8] tweet siliniyor mu", async () => {
    // Login to get the authorization token
    const loginPayload = {
      username: "ibrahim",
      email: "ibrahim@example.com",
      password: "1234",
    };

    const loginResponse = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    const token = loginResponse.body.token;

    // Create a new tweet with the authorization token and get the id
    const tweet = {
      content: "test",
    };
    const response = await request(server)
      .post("/api/posts")
      .send(tweet)
      .set("authorization", token);
    const id = response.body.id;

    // Delete the tweet
    const deleteResponse = await request(server)
      .delete(`/api/posts/${id}`)
      .set("authorization", token);

    // Check the response
    expect(deleteResponse.status).toBe(200);
  });

  test("[9] comment siliniyor mu", async () => {
    // Login to get the authorization token
    const loginPayload = {
      username: "ibrahim",
      email: "ibrahim@example.com",
      password: "1234",
    };

    const loginResponse = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    const token = loginResponse.body.token;

    // Create a new comment with the authorization token and get the id
    const comment = {
      content: "test",
      post_id: "1",
    };
    const response = await request(server)
      .post("/api/comments")
      .send(comment)
      .set("authorization", token);
    const id = response.body.id;

    // Delete the comment
    const deleteResponse = await request(server)
      .delete(`/api/comments/${id}`)
      .set("authorization", token);

    // Check the response
    expect(deleteResponse.status).toBe(200);
  });
});

//PUT TESTLERİ
describe("Put testleri", () => {
  test("[10] tweet güncelleniyor mu", async () => {
    // Login to get the authorization token
    const loginPayload = {
      username: "ibrahim",
      email: "ibrahim@example.com",
      password: "1234",
    };

    const loginResponse = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    const token = loginResponse.body.token;

    // Create a new tweet with the authorization token and get the id
    const tweet = {
      content: "test",
    };
    const response = await request(server)
      .post("/api/posts")
      .send(tweet)
      .set("authorization", token);
    const id = response.body.id;

    // Update the tweet
    const updateResponse = await request(server)
      .put(`/api/posts/${id}`)
      .send({ content: "test2" })
      .set("authorization", token);

    // Check the response
    expect(updateResponse.status).toBe(200);
  });

  test("[11] comment güncelleniyor mu", async () => {
    // Login to get the authorization token
    const loginPayload = {
      username: "ibrahim",
      email: "ibrahim@example.com",
      password: "1234",
    };

    const loginResponse = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    const token = loginResponse.body.token;

    // Create a new comment with the authorization token and get the id
    const comment = {
      content: "test",
      post_id: "1",
    };
    const response = await request(server)
      .post("/api/comments")
      .send(comment)
      .set("authorization", token);
    const id = response.body.id;

    // Update the comment
    const updateResponse = await request(server)
      .put(`/api/comments/${id}`)
      .send({ content: "test2", post_id: "1" })
      .set("authorization", token);

    // Check the response
    expect(updateResponse.status).toBe(200);
  });
});
