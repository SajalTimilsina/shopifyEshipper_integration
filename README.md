# Shopify & Eshipper - Shipping Rate Discrepancy Analyzer

This web application integrates Eshipper and Shopify APIs to analyze discrepancies between customer-paid rates and merchant-incurred shipping costs. Discrepancies often arise due to factors like incorrect product dimensions, flawed 4D boxing algorithms, or inaccurate packaging sizes recorded in the system. The primary aim is to identify and minimize these discrepancies to prevent financial losses.

## Overview

The application employs Node.js, Express.js for the backend, and React for the frontend. It serves as a tool to highlight differences in shipping rates, providing insights into potential causes behind these discrepancies.

### Functionality

#### Eshipper Integration

- **Endpoint:** `/api/eshipper`
- **Functionality:**
  - Authentication with Eshipper.
  - Retrieval of shipping-related data from the Eshipper API.
  - Initial identification of shipping rate disparities.

#### Shopify Integration

- **Endpoint:** `/api/shopify`
- **Functionality:**
  - Retrieval of order-related data from the Shopify API.
  - Processing of order information to facilitate rate comparison.
  - Display of order IDs and corresponding shipping rates to highlight disparities.

### Project Goal

The primary objective is to pinpoint and mitigate discrepancies between customer-paid rates and merchant-incurred shipping costs. By flagging these differences, the tool aims to minimize financial leakage caused by inaccurate shipping calculations. However, further analysis and steps are required to delve deeper into the reasons behind these discrepancies.

## Setup Instructions

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory and set environment variables (refer to `.env.example`).
4. Run the backend server using `npm start`.
5. Start the frontend application using `npm start` or your preferred React setup.

### Environment Variables
Create config.env file such as:
Ensure the following environment variables are set:

- `PORT`: Backend server port (default: 5000).
- Shopify API credentials:
  - `SHOPIFY_URL`: Shopify API endpoint.
  - `SHOPIFY_SHPAT`: Shopify API token.
- Eshipper API credentials:
  - `ESHIPPER_URL`: Eshipper API endpoint.
  - `ESHIPPER_USERNAME`: Eshipper username.
  - `ESHIPPER_PASSWORD`: Eshipper password.
- Database credentials (if applicable).
- MongoDB credentials (if applicable).

## Running the Application

1. Run the backend server using `npm start`.
2. Start the frontend to interact with the application using `npm start`.
You might also need to run a proxy in the backend as you might get a COROS error. I have used `http-proxy-middleware` to solve this issue.

### Contributors

- [Sajal Timilsina](https://github.com/SajalTimilsina) - Web Developer
