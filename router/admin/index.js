/**
 * Created by Nealyang on 17/2/25.
 */
const express = require('express');

module.exports = function () {
    var router = express.Router();
    router.use(function (req,res,next) {
        if(!req.session['user_id'] && req.url != '/login'){
            res.redirect('/admin/login');
        }else{
            next();
        }
    });
    router.use('/login',require('./login')());
    router.use('/blog',require('./blog')());
    router.use('/users',require('./users')());
    router.get('/',function (req,res) {
        res.render('admin/index.ejs');
    });
    return router;
};