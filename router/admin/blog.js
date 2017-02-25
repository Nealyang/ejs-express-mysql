/**
 * Created by Nealyang on 17/2/25.
 */
const express = require('express');
const common = require('../../lib/common');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: ' neal',
    database: 'blog'
});

module.exports = function () {
    var router = express.Router();
    router.get('/', function (req, res) {
        switch (req.query.action) {
            case 'del':
                //删除操作
                db.query('DELETE FROM blog_list_table WHERE id="'+req.query.id+'"',function (err,resultData) {
                    if(err){
                        console.error(err);
                        res.status(500).send({code:500,msg:'database error'});
                    }else{
                        res.redirect('/admin/blog');
                    }
                });
                break;
            case 'mod':
                //修改操作
                db.query('SELECT * FROM blog_list_table WHERE id="'+req.query.id+'"',function (err,modData) {
                    if(err){
                        console.error(err);
                        res.status(500).send({code:500,msg:'database error'});
                    }else if(modData.length == 0){
                        res.status(400).send({code:400,msg:'parameters error'});
                    }else{
                        db.query('SELECT * FROM blog_list_table',function (err,allData) {
                            if(err){
                                console.error(err);
                                res.status(500).send({code:500,msg:'database error'});
                            }else{
                                res.render('admin/blog.ejs',{formData:allData,modData:modData});
                            }
                        });
                    }
                });
                break;
            default:
                db.query('SELECT * FROM blog_list_table', function (err, resultData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'}).end();
                    } else {
                        res.render('admin/blog.ejs', {formData: resultData});
                    }
                });
        }

    });
    router.post('/', function (req, res) {
        //此处验证应该更加严格，比如正则
        var title = req.body.title.trim();
        var author = req.body.author.trim();
        var summary = req.body.summary.trim();
        var href = req.body.href.trim();

        if (title && author && summary && href) {
            if(req.body.modified){
                db.query('UPDATE blog_list_table SET title="'+title+'",author="'+author+'",summary="'+summary+'",href="'+href+'" WHERE ID="'+req.body.modified+'"',function (err,resultData) {
                    if(err){
                        console.error(err);
                        res.status(500).send({code:500,msg:'database error'});
                    }else{
                        res.redirect('/admin/blog');
                    }
                })
            }else{
                db.query('INSERT INTO blog_list_table (title,author,summary,href) VALUE("' + title + '","' + author + '","' + summary + '","' + href + '")', function (err, data) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'}).end();
                    } else {
                        res.redirect('/admin/blog');
                    }
                });
            }
        } else {
            res.status(400).send({code: 400, msg: 'parameters error'}).end();
        }

    });
    return router;
};
