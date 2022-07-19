const PORT = 3000;
const axios = require('axios').default;
const cheerio = require('cheerio');
const express = require('express');

const app = express();

// insert the url that you want to scrap
const url = "https://www.yucatan.com.mx";

axios(url).then(response => {

    const html = response.data;

    const $ = cheerio.load(html);

    const articles = [];

    // For Each div with the class mentioned 
    $('.titulo', html).each(function()  {
    // we get the Title text,  and convert it into text replacing /n's
        const title =  $(this).text().replace(/\n/g,'');
    // we get the url of the article, in this case, a href does not have his own url
        const urlArticle = url + $(this).find("a").attr("href")
        articles.push({
            title,
            urlArticle
        })
    })
    console.log(articles)
}).catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));