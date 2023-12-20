const express = require("express");
const shopifyRoutes = require("./routes/shopify");
const eshipperRoutes = require("./routes/eshipper");
const webRoutes = require("./routes/webRoutes");
const cors = require("cors");

const app = express();
// Middleware to parse JSON in the req.body
app.use(cors());
app.use(express.json());
app.use("/shopify", shopifyRoutes);
app.use("/eshipper", eshipperRoutes);
app.use("/web", webRoutes);

module.exports = app;
