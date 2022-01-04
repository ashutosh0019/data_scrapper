const express = require('express');
const res = require('express/lib/response');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

//enter api key
const apiKey = 'dfg5df48t7yht454jmhj6k54sa656';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Data Scraper API');
});

//get product details
app.get('/products/:productId', async(req, res)=>{
    const { productId} = req.params;
    try{
        const response = await request(`${baseUrl}&url=https://www.amazon.in/dp/${productId}`);

        res.json(JSON.parse(response));
    }
    catch (error){
        res.json(error);
    }
});

//get product reviews
app.get('/products/:productId/reviews', async(req, res)=>{
    const { productId} = req.params;
    try{
        const response = await request(`${baseUrl}&url=https://www.amazon.in/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    }
    catch (error){
        res.json(error);
    }
});

//get product offers
app.get('/products/:productId/offers', async(req, res)=>{
    const { productId} = req.params;
    try{
        const response = await request(`${baseUrl}&url=https://www.amazon.in/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    }
    catch (error){
        res.json(error);
    }
});

//get search result
app.get('/search/:searchQuery', async(req, res)=>{
    const {searchQuery} = req.params;
    try{
        const response = await request(`${baseUrl}&url=https://www.amazon.in/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    }
    catch (error){
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`server runnning on ${PORT}`));