console.log("My Weather Key is:", process.env.WEATHER_API_KEY);

require('dotenv').config(); // Load environment variables
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); 
app.use(express.static('public')); 


// Weather API
app.get('/api/weather', async (req, res) => {
    const { city } = req.query; 
    
    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        //  fetching data  on server side
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        const response = await axios.get(url);
        const data = response.data;

    
        const weatherData = {
            temperature: data.main.temp,
            description: data.weather[0].description,
            coordinates: data.coord,
            feels_like: data.main.feels_like,
            wind_speed: data.wind.speed,
            country_code: data.sys.country,
            rain_last_3h: data.rain ? data.rain['3h'] || 0 : 0 
        };

        res.json(weatherData);

    } catch (error) {
        console.error('Weather API Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});


// 2. Aews 
app.get('/api/news', async (req, res) => {
    const { countryCode } = req.query;

    try {
        const apiKey = process.env.NEWS_API_KEY;

        const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${apiKey}`;
        
        const response = await axios.get(url);
        // Return only the top 3 articles to keep the UI clean
        res.json(response.data.articles.slice(0, 3)); 

    } catch (error) {
        console.error('News API Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});


// 3. ADDITIONAL API : Currency 

app.get('/api/currency', async (req, res) => {
    const { countryCode } = req.query;
    
    // You would map country codes to currency codes here (e.g., US -> USD, GB -> GBP)
    // For simplicity, this is a placeholder structure
    const currencyMap = { 'US': 'USD', 'GB': 'GBP', 'JP': 'JPY', 'KZ': 'KZT' };
    const targetCurrency = currencyMap[countryCode] || 'USD';

    try {
        const apiKey = process.env.CURRENCY_API_KEY;
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/${targetCurrency}`;
        
        const response = await axios.get(url);
        res.json({
            base: 'USD',
            target: targetCurrency,
            rate: response.data.conversion_rate
        });

    } catch (error) {
        console.error('Currency API Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch currency data' });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});