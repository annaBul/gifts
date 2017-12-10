var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');
var request = require('request');
var cheerio = require('cheerio');

router.get('/gifts', function(req, res, next) { 
    var URLs = ['https://ylet.by/category/hity-prodazh/'];
    var data = [];

    getResults(URLs[0], parsePodaro4ek, function(result){
        data = data.concat(result); 
   /* data = [{
        name: "подарочек",
        imageUrl: "http://localhost:3000/1.jpg",
        price: "100 BYN"
    }]*/
       // console.log(data);
        return res.send({
            success: true,
            gifts: data});           
    });
});

var  getResults =function(url, parser, callback){
    request(url, function (err, resp, body){
        try{ 
            
            callback(parser(resp.body)); 
        }
        catch(e){
            console.log(e);
            callback([]);
        }
    });
}
    

var getMultipleResults = function (url, parser, callback) {
var results = [], t = 1,
    handler = function (error, response, body) {
        try{   
            //console.log(response);
            if (response.statusCode == 403 || response.statusCode == 404) { 
                callback(results);                 
            }
            else {
                console.log(10);
                results = results.concat(parser(response.body));
                
               // console.log(results);
                while((results.length ==0)){};
                t++;
                request(url, handler);
            }
        }
        catch(e)
        {
            console.log(e);
            callback(results);
        }

    };
    request(url, handler)    
};


function parsePodaro4ek(body){
    var results = [];
    flag = false;
    while(flag == false){
        var $ = cheerio.load(body);
        $('div.product').each(function(i, element){
          //  $('li.menu-item').each(function(i, element){
            var name = $(this).children('form').children('div.prdbrief_name').children('a').text();
            var href = 'https://ylet.by' + $(this).children('form').children('div.prdbrief_thumbnail').children('a').attr('href');
          //  console.log(cheerio.load($(this).children('div.product-image').children('div').children('div').children('div').children('div.slick-current').children('a').children('img').children('src')));
            var imageUrl = 'https://ylet.by' + $(this).children('form').children('div.prdbrief_thumbnail').children('a').children('img').attr('src');
        //    console.log(imageUrl);
            var price = $(this).children('form').children('span.prdbrief_price').children('span').text()  ;
            //parseFloat($(this).children('td.h_pr').children('span.price_mr').text().replace(",", "."));
        //    if (isNaN(price))
      //          var price = "not available";
       //     else
       //         price += " BYN"
        
            results.push({
                name: name,
                imageUrl: imageUrl,
                price: price,
                href: href
            });
           // console.log(name);
            flag = true;
        });
    }
    while(flag == false){};
   //  console.log(results);
    return results;
}
module.exports = router;