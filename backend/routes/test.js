const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", async (req, res) => {
  // Example usage:
  const startingURL = "https://emerdepot.com";
  const keywordsToFind = ["hiv", "anesthetic"]; // Add your desired keywords

  try {
    await scrapeWithRetry(startingURL, keywordsToFind);
    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Error occurred while scraping.",
      error: error.message,
    });
  }
});

// Collection to store unique links
const uniqueLinks = new Set();

// Function to delay between requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to scrape a given URL with retries
async function scrapeWithRetry(url, keywords, maxRetries = 3) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      await scrape(url, keywords);
      return; // If successful, exit the loop
    } catch (error) {
      console.error(`Error scraping (${retries + 1}/${maxRetries}):`, error);
      retries++;
      await delay(2000); // Delay before retrying (adjust as needed)
    }
  }
  throw new Error(`Failed to scrape after ${maxRetries} attempts.`);
}

// Function to scrape a given URL
async function scrape(url, keywords) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  // Check for keywords in the current page's content
  const pageContent = $("body").text();
  const foundKeywords = keywords.filter((keyword) =>
    pageContent.toLowerCase().includes(keyword.toLowerCase())
  );

  // If keywords are found, send the status to the frontend
  if (foundKeywords.length > 0) {
    // Replace this with your logic to send status to the frontend
    console.log(`Keywords found at: ${url}`);
  }

  // Find all href links in the current page and add to uniqueLinks
  $("a").each((index, element) => {
    const link = $(element).attr("href");
    if (link && !uniqueLinks.has(link)) {
      uniqueLinks.add(link);
    }
  });
}

module.exports = router;
