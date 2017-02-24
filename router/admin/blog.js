/**
 * Created by Nealyang on 17/2/25.
 */
const express = require('express');
const common = require('../../lib/common');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    port: 8080,
    user:'root',
    password:' neal',
    database:'blog'
});

module.exports = function () {
    var router = express.Router();
    router.get('/',function (req,res) {
       res.render('admin/blog.ejs');
    });
    return router;
};
