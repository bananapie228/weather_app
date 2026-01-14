# Weather & Info Dashboard (Assignment 2)

A full-stack web application that aggregates real-time weather, local news, and currency exchange rates. This project demonstrates **Backend API Integration** by routing all third-party API requests through a Node.js/Express server to ensure security and clean architecture.

## Features

* **Server-Side Weather Data:** Fetches detailed weather info (Temperature, Wind, Rain Volume) using OpenWeatherMap.
* **Local News Integration:** Automatically retrieves top headlines for the searched country using NewsAPI.
* **Currency Converter:** Converts 1 USD to the local currency of the searched location using ExchangeRate-API.
* **Responsive Design:** Optimized for both desktop and mobile devices.
* **Secure Architecture:** All API keys are stored on the server side (`.env`) and never exposed to the frontend.

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **HTTP Client:** Axios
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Tools:** Dotenv (environment variables), Nodemon (development)

---

## ⚙️ Setup & Installation


### 1. Clone the Repository
```bash
git clone <https://github.com/bananapie228/weather_app>
cd weather_app

```

### Configure Environment Variables

Properties

PORT=3000
* WEATHER_API_KEY=your_openweather_key_here
* NEWS_API_KEY=your_newsapi_key_here
* CURRENCY_API_KEY=your_exchangerate_key_here

### Install Dependencies


```bash

npm install
```
API Usage Details
The backend exposes three main endpoints used by the frontend:

### 1. Get Weather 

Endpoint: GET /api/weather

Query Param: city (e.g., London)

Response: Returns temperature, coordinates, rain volume (3h), and country code.

Source: OpenWeatherMap API

### 2. Get News
Endpoint: GET /api/news

Query Param: countryCode (e.g., GB, US)

Response: JSON array of the top 3 headlines for that region.

Source: NewsAPI

### 3. Get Currency
Endpoint: GET /api/currency

Query Param: countryCode (e.g., GB for Pounds)

Response: Conversion rate from USD to the target local currency.

Source: ExchangeRate-API





<img width="907" height="456" alt="Screenshot 2025-12-27 at 18 29 38" src="https://github.com/user-attachments/assets/231b7cb8-82e0-4b18-bfd1-535798266afc" />
