const { Client } = require("pg");
const request = require("request");
const micro = require("micro");
const getKey = require("./key");

const URL = getKey("URL");
const token = getKey("Authorization");

const options = {
  method: "POST",
  url: URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json"
  }
};

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/publist";

const client = new Client(connectionString);

client.connect();

request(options, function(error, response, body) {
  if (error) throw new Error(error);
  for (let i = 0; i < body.length; i++) {
    const query = client.query(
      "INSERT into articles (author,created, description, id, image_url, language, mobile_url, published_at, read_time, score, slug, title,url,word_count)" +
        "VALUES($1, $2, $3, $4, $5,$6,$7, $8,$9,$10,$11,$12,$13.$14)",
      [
        response[i].author,
        response[i].created,
        response[i].description,
        response[i].id,
        response[i].image_url,
        response[i].language,
        response[i].mobile_url,
        response[i].published_at,
        response[i].read_time,
        response[i].score,
        response[i].slug,
        response[i].title,
        response[i].url,
        response[i].world_count
      ]
    );
  }
});
