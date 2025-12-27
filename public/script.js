async function getDashboardData() {
    const city = document.getElementById('cityInput').value;
    const errorDiv = document.getElementById('errorMessage');
    
    // Clear previous errors/data
    errorDiv.style.display = 'none';
    errorDiv.innerText = '';
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        //  fetch Weather
        updateUI('weatherData', 'Loading...');
        const weatherRes = await fetch(`/api/weather?city=${city}`);
        const weather = await weatherRes.json();

        if (weather.error) throw new Error(weather.error);

        // display weather
        document.getElementById('weatherData').innerHTML = `
            <div class="weather-main">${weather.temperature}°C</div>
            <div>${weather.description}</div>
            <hr>
            <div>Feels like: ${weather.feels_like}°C</div>
            <div>Wind: ${weather.wind_speed} m/s</div>
            <div>Rain (3h): ${weather.rain_last_3h} mm</div>
            <div>Country: ${weather.country_code}</div>
            <div>Coords: ${weather.coordinates.lat}, ${weather.coordinates.lon}</div>
        `;

        // fetch News 
        updateUI('newsData', 'Loading news...');
        const newsRes = await fetch(`/api/news?countryCode=${weather.country_code}`);
        const news = await newsRes.json();
        
        if (news.length === 0) {
            document.getElementById('newsData').innerHTML = 'No news found for this region.';
        } else {
            const newsHtml = news.map(article => `
                <div class="news-item">
                    <strong>${article.title}</strong><br>
                    <small><a href="${article.url}" target="_blank">Read more</a></small>
                </div>
            `).join('');
            document.getElementById('newsData').innerHTML = newsHtml;
        }

        // fetch Currency 
        updateUI('currencyData', 'Calculating exchange...');
        const currencyRes = await fetch(`/api/currency?countryCode=${weather.country_code}`);
        const currency = await currencyRes.json();

        document.getElementById('currencyData').innerHTML = `
            <div>1 USD =</div>
            <div class="weather-main">${currency.rate} ${currency.target}</div>
            <small>Base: United States Dollar</small>
        `;

    } catch (error) {
        console.error(error);
        showError(error.message || 'Failed to fetch data');
        updateUI('weatherData', 'Error');
        updateUI('newsData', 'Error');
        updateUI('currencyData', 'Error');
    }
}

function showError(msg) {
    const el = document.getElementById('errorMessage');
    el.innerText = msg;
    el.style.display = 'block';
}

function updateUI(id, html) {
    document.getElementById(id).innerHTML = html;
}