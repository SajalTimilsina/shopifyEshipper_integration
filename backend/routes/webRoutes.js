const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
let uniqueLinks = new Set(); // To store unique links

// const startingURL = "https://emerdepot.com";
// const keywords = ["hiv", "anesthetic"]; // Add your desired keywords

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { url, keywords } = req.body;
    if (!url || !keywords)
      return res
        .status(500)
        .json({ message: "Error ! Please provide url & keywords" });

    const { results = [], uniqueLinks = {} } = await scrape(url, keywords);
    const setToArray = Array.from(uniqueLinks);
    res.status(200).json({
      message: "Success",
      data: {
        results,
        setToArray,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Error occurred while scraping.",
      error: error.message,
    });
  }
});

async function scrape(url, keywords) {
  try {
    console.log("Trying to scrape" + url);
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    // Check for keywords on the current page
    const content = $("body").text().toLowerCase();

    const results = [];

    keywords.forEach((keyword) => {
      if (content.includes(keyword.toLowerCase())) {
        console.log(`Keyword ${keyword} found on: ${url}`);
        results.push(keyword);
      }
    });

    // Collect unique links from the page
    $("a").each((index, element) => {
      const link = $(element).attr("href");
      if (link && !link.startsWith("http")) {
        const absoluteLink = new URL(link, url).href;
        if (!uniqueLinks.has(absoluteLink)) {
          uniqueLinks.add(absoluteLink); // Store unique links in the set
          //console.log(absoluteLink);
          //scrape(absoluteLink); // Recursively scrape the new link after the delay
        }
      }
    });
    console.log(uniqueLinks);
    return { results, uniqueLinks };
  } catch (error) {
    console.error("Error fetching/scraping the page:", error.message);
    throw error;
  }
}

module.exports = router;
