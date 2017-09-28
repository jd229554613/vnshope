var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods')
var User = require('../models/user')
mongoose.connect('mongodb://localhost:27017/sever',{useMongoClient: true});

mongoose.connection.on('connected', function() {
    console.log("mongondb connected success");
})

mongoose.connection.on('error', function() {
    console.log("mongondb connected fail");
})

mongoose.connection.on('disconnected', function() {
    console.log("mongondb connected disconnected");
})

router.get("/list", function(req, res, next) {
    let sort = req.param('sort');
    let priceLevel=req.param('priceLevel');
    let priceGt='',priceLte='';
    let param={};
    if(priceLevel!='all'){
        // switch (priceLevel){
        //     case'0':priceGt=0;priceLte=100;
        //     case'1':priceGt=100;priceLte=500;
        //     case'2':priceGt=500;priceLte=1000;
        //     case'3':priceGt=1000;priceLte=5000;
        //     break;
        let priceItem=[[0,100],[100,500],[500,2000],[2000,5000]];
        param={
            salePrice:{
                $gt:priceItem[priceLevel][0],
                $lte:priceItem[priceLevel][1]
            }
        };
        }

    let currentPage=(parseInt(req.param('page')))?parseInt(req.param('page')):1;
    let pagesize=(parseInt(req.param('pagesize')))?parseInt(req.param('pagesize')):8;
    let skip=(currentPage-1)*pagesize;
    let goodModel = Goods.find(param).sort({ 'salePrice': sort }).skip(skip).limit(pagesize)
    goodModel.exec({}, function(err, doc) {
        res.json({ status: 0, result: doc })

    });
});
router.post('/addCart',function (req,res,next) {
    let userId = '100000077';
    let productId = req.body.productId;
    // res.json({
    //     id:productId
    // })

    User.findOne({userId: userId}, function (err, userDoc) {
        let goodItem = '';
        userDoc.cartList.forEach(function (item) {
            if (item.productId == productId) {
                goodItem = item;
                item.productNum++;
            }
        })
        if (goodItem) {
            userDoc.save(function (err3, doc3) {
                if (err3) {
                    res.json({status: 1, msg: err3.message})
                } else {
                    res.json({status: 0, msg: '', result: '数量添加成功'})
                }
            })
        }
        else {
            // console.log(userDoc);
            Goods.findOne({productId: productId}, function (err1, goodDoc) {
                goodDoc.productNum = 1;
                userDoc.cartList.push(goodDoc);
                userDoc.save(function (err2, doc2) {
                    if (err2) {
                        res.json({status: 1, msg: err2.message})
                    } else {
                        res.json({status: 0, msg: '', result: '加入购物车成功'})
                    }
                })
            })
        }
    })
})

module.exports = router;