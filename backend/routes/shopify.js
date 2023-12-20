const express = require("express");
const router = express.Router();
const axios = require("axios");
const request = require("request");

module.exports = router;

//emerhealth
// let apiKey = '';
// let pass = '';
// let shpat = '';
// let endpoint = 'orders';

const shpat = process.env.SHOPIFY_SHPAT;
let endpoint = "orders";
const url = process.env.SHOPIFY_URL;

let getorders = {
  method: "GET",
  url: url,
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": shpat,
  },
};

router.get("/", async (req, res) => {
  request(getorders, function (error, response) {
    if (error) throw new Error(error);
    const result = JSON.parse(response.body);
    if (result) {
      const orders = result.orders;

      const mapOrder = orders.flatMap((order) => {
        const order_id = order.id;
        if (order.shipping_lines) {
          return order.shipping_lines.map((line) => ({
            orderId: order_id,
            shippingRate: line.discounted_price,
          }));
        } else {
          return {
            orderId: order_id,
            shippingRate: "0",
          };
        }
      });
      res.send(mapOrder);
    } else {
      res.send(result);
    }
  });
});
