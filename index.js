// const express = require("express");
// const request = require("request");
// const axios = require("axios");

// const app = express();
// const port = 3000;

// let bearerToken = null;
// app.get("/login", async (req, res) => {
//   try {
//     const loginUrl = "https://ww2.eshipper.com/api/v2/authenticate";
//     const credentials = {
//       principal: "emerdepot",
//       credential: "Edepot@es3220",
//     };
//     const loginResponse = await axios.post(loginUrl, credentials);

//     bearerToken = loginResponse.data.token;
//     console.log(loginResponse);
//     //console.log(typeof loginResponse);
//     res.json(bearerToken);

//     // res.status(200).json({
//     //   status: "success",
//     //   message: loginResponse,
//     // });
//   } catch (error) {
//     console.error("Error during login", error);
//     res.status(500).json({
//       status: "error",
//       message: "Error during login",
//     });
//   }
// });

// app.get("/getData", async (req, res) => {
//   try {
//     const url = "https://ww2.eshipper.com/api/v2/ship/5000000497171";
//     console.log(bearerToken);
//     if (!bearerToken) {
//       return res.status(401).json({ error: "Please log in first" });
//     }

//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${bearerToken}`,
//       },
//     });
//     const data = response.data;
//     res.json(data.quote.totalChargedAmount);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });

// app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
