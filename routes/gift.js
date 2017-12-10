var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');
var request = require('request');
var cheerio = require('cheerio');
var GiftModel =  require('../models').GiftModel;

router.post('/gift', function(req, res, next) { 
    if(!req.body.href){
        return res.send({ error: 'Incorrected data' });
    }
    getResults(req.body.href, parseYlet, function(gift){
        return res.send({
            success: true,
            gift: gift});           
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
    
function parseYlet(body){
    var result;
        var $ = cheerio.load(body);
        $('div.cpt_maincontent').each(function(i, element){
            var name = $(this).children('form').children('div.product-detail.row').children('div.col-xs-8').children('div.cpt_product_name').children('h1').text();
            console.log( $(this).children('div.product-detail.row').children('div.col-xs-8').children('div.cpt_product_name').children('h1').text());
            var href = 'https://ylet.by' + $(this).children('form').attr('action');
          //  console.log(cheerio.load($(this).children('div.product-image').children('div').children('div').children('div').children('div.slick-current').children('a').children('img').children('src')));
            var imageUrl = 'https://ylet.by' + $(this).children('form').children('div.product-detail.row').children('div.col-xs-4').children('div.cpt_product_images').children('div.main').children('a.fancybox').children('img').attr('src');
        //    console.log(imageUrl);
            var description = $(this).children('form').children('div.product-detail.row').children('div.col-xs-8').children('div.cpt_product_description').children('div').children('p').text();
            var price =  $(this).children('form').children('div.product-detail.row').children('div.col-xs-8').children('div.price_info').children('div.cpt_product_price').children('span.totalPrice').text()  ;
            //parseFloat($(this).children('td.h_pr').children('span.price_mr').text().replace(",", "."));
        //    if (isNaN(price))
      //          var price = "not available";
       //     else
       //         price += " BYN"
        
          result = {
                name: name,
                imageUrl: imageUrl,
                price: price,
                href: href,
                description: description
            };
        });
    return result;
}













router.post('/add_gift_to_favorites',function(req, res, next) {    
    passport.authenticate('jwt', function (err, user) {         
       if (err) {
           res.statusCode = 500;
           console.log('Internal error(%d): %s',res.statusCode,err.message);
           return res.send({ error: 'Server error' });
       } else {
           if(user)
           {                         
                GiftModel.find({'name': req.body.name} , function (err, gifts) {
                    if (err) {
                        res.statusCode = 500;
                        log.error('Internal error(%d): %s',res.statusCode,err.message);
                        return res.send({ error: 'Server error' });
                    } else {
                        if(gifts.length === 0)
                        {               
                            var newGift = {
                                name: req.body.name,
                                imageUrl: req.body.imageUrl,
                                price: req.body.price,
                                href: req.body.href,
                                description: req.body.description
                            };
                            GiftModel.create(newGift, function(err, item) {
                                if(!err){
                                    user.favorites.push(item._id);
                                    user.save();
                                    return res.send({
                                        success: true,
                                        gift: newGift});
                                }
                                
                            });
                        } else {
                            return res.send({error: 'Project exists!'});
                        }          
                    }
                });

           } else {
               return res.send({error: "User don't found!"});
           }          
       }
   } )(req, res, next)  
 });




module.exports = router;