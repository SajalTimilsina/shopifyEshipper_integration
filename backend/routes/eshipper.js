const express = require("express");
const router = express.Router();
const axios = require("axios");

const app = express();

const url = process.env.ESHIPPER_URL;
const username = process.env.ESHIPPER_USERNAME;
const password = process.env.ESHIPPER_PASSWORD;
let bearerToken = null;

const getLogin = async () => {
  console.log("Reached GetLogin");
  const loginUrl = `${url}/authenticate`;
  const credentials = {
    principal: username,
    credential: password,
  };
  const loginResponse = await axios.post(loginUrl, credentials);
  bearerToken = loginResponse.data.token;
  if (!bearerToken) throw new Error("Bearer token is not available");
};
router.get("/login", async (req, res) => {
  try {
    await getLogin();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error during login",
    });
  }
});

router.get("/getData", async (req, res) => {
  // try {
  //   await getLogin();
  //   const url = "https://ww2.eshipper.com/api/v2/ship/5000000497171";
  //   //console.log(bearerToken);
  //   if (!bearerToken) {
  //     return res.status(401).json({ error: "Please log in first" });
  //   }

  //   const response = await axios.get(url, {
  //     headers: {
  //       Authorization: `Bearer ${bearerToken}`,
  //     },
  //   });
  //   const data = response.data;
  //   console.log(data);

  //   res.json(data.quote.totalChargedAmount);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   res.status(500).json({ error: "Failed to fetch data" });
  // }

  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

module.exports = router;
