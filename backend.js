const express = require('express')
const request = require('request')    /// used for get request from API
const dbconnect = require('./mongo')
const app = express();

const port = process.env|3000;

//// get_price() fetch data form Wazirx API
function get_price() {
    request('https://api.wazirx.com/api/v2/tickers', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let prices = JSON.parse(body);
            set_price(prices);
        }
    })
}
// set_price() set the prices in the Database
async function set_price(prices) {
    let collection = await dbconnect();
    let data = {};
    for (let i = 0; i < 10; i++) {
        let key = Object.keys(prices)[i];
        let value = prices[key];
        data[key] = value;
    }
    let result = await collection.updateOne({}, { $set: { prices: data } })
    console.log(result)
    console.log("Prices Updated");
}

// for updating the Database in Each 1000ms
setInterval(() => {
    get_price()
}, 60000);

/// this route take data form Database and serving
app.get('/', async (req, resp) => {
    let collection = await dbconnect();
    let data = await collection.find({}).toArray();
    resp.send(data[0].prices);
})


app.listen(port,()=>{
    console.log(`server is listening on port: ${port}`);
});
