/**
 * Created by Nealyang on 17/2/25.
 */
const express = require('express');
const common = require('../../lib/common');
const mysql = require('mysql');
const fs = require('fs');
const pathLib = require('path');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: ' neal',
    database: 'blog'
});

module.exports = function () {
    var router = express.Router();
    router.get('/', function (req, res) {
        switch (req.query.action) {
            case 'del'://删除操作
                db.query('SELECT * FROM user_table WHERE ID="' + req.query.id + '"', function (err, queryData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'});
                    } else if (queryData.length == 0) {
                        res.status(400).send({code: 400, msg: 'parameters error'});
                    } else {
                        fs.unlink(queryData[0].pic_header.replace('\/files','static'), function (err) {
                            if (err) {
                                console.error(err);
                                res.status(500).send({code:500,msg:'operate err'});
                            } else {
                                db.query('DELETE FROM user_table WHERE ID="'+
                                    req.query.id+'"',function (err,resultData) {
                                    if(err){
                                        console.error(err);
                                        res.status(500).send({code: 500, msg: 'database error'});
                                    }else{
                                        res.redirect('/admin/users');
                                    }
                                })
                            }
                        })
                    }
                });
                break;
            case 'mod':
                db.query('SELECT * FROM user_table',function (err,allData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'});
                    } else {
                        db.query('SELECT * FROM user_table WHERE ID="'+req.query.id+'"',function (err,modData) {
                            if (err) {
                                console.error(err);
                                res.status(500).send({code: 500, msg: 'database error'});
                            }else if(modData.length == 0){
                                res.status(400).send({code: 400, msg: 'parameters error'});
                            }else {
                                res.render('admin/users.ejs',{usersData:allData,modData:modData});
                            }
                        });
                    }
                });
                break;
            default:
                db.query('SELECT * FROM user_table', function (err, allUsersData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'});
                    } else {
                        res.render('admin/users.ejs', {usersData: allUsersData});
                    }
                });
        }
    });
    router.post('/', function (req, res) {
        var username = req.body.username;
        var email = req.body.email;
        if(req.files.length>0){
            var ext = pathLib.parse(req.files[0].originalname).ext;
            var pic_header = '/files/upload/' + req.files[0].filename + ext;
        }

        //需要进行一些校验，这里就忽略了
        if(req.body.modified){//修改
            //查看有没有新传来的头像，如果有，则删除，新建，如果没有，直接更新需要更新的内容
            if(req.files.length>0){
                //有修改头像，则进行原来头像的删除，再上传
                db.query('SELECT * FROM user_table WHERE ID="'+req.body.modified+'"',function (err,modData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'});
                    }else if(modData.length == 0){
                        res.status(400).send({code: 400, msg: 'parameters error'});
                    }else{
                        fs.unlink(modData[0].pic_header.replace('\/files','static'),function (err) {
                            if(err){
                                console.error(err);
                                res.status(500).send({code:500,msg:'operate error'});
                            }else{
                                //删除成功，开始对新的文件进行重命名
                                fs.rename(req.files[0].path, req.files[0].path + ext, function (err) {
                                    if (err) {
                                        console.error(err);
                                        res.status(500).send({code: 500, msg: 'operate error'});
                                    } else {
                                        db.query('UPDATE user_table SET username="'+
                                            username+'",email="' + email + '",pic_header="' +
                                            pic_header + '" WHERE ID="'+req.body.modified+'"',function (err,data) {
                                            if (err) {
                                                console.error(err);
                                                res.status(500).send({code: 500, msg: 'database error'});
                                            }else{
                                                res.redirect('/admin/users');
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                })
            }else{
                db.query('UPDATE user_table SET username="'+username+'",email="' + email + '" WHERE ID="'+
                    req.body.modified+'"',function (err,data) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'});
                    }else{
                        res.redirect('/admin/users');
                    }
                });
            }
        }else{//新增
            fs.rename(req.files[0].path, req.files[0].path + ext, function (err) {
                if (err) {
                    console.error(err);
                    res.status(500).send({code: 500, msg: 'data error'});
                } else {
                    db.query('INSERT INTO user_table (username,email,pic_header) VALUE("' + username + '","' +
                        email + '","' + pic_header + '")', function (err, resultData) {
                        if (err) {
                            console.error(err);
                            res.status(500).send({code: 500, msg: 'database error'});
                        } else {
                            res.redirect('/admin/users');
                        }
                    });
                }
            });
        }

    });
    return router;
};