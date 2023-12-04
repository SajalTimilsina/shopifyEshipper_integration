const express = require("express");
const router = express.Router();
const axios = require("axios");
const request = require("request");

module.exports = router;

//emerhealth
// let apiKey = '904204a93d0ab4551b7959ff6b358605';
// let pass = '3c5a98eb1d62d52b7ff18423d030d254';
// let shpat = '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';
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
