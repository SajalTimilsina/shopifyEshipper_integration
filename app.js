const express = require("express");
const shopifyRoutes = require("./routes/shopify");
const eshipperRoutes = require("./routes/eshipper");

const app = express();
app.use("/shopify", shopifyRoutes);
app.use("/eshipper", eshipperRoutes);

module.exports = app;
