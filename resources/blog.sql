/*
 Navicat Premium Data Transfer

 Source Server         : neal
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : blog

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 02/25/2017 12:44:35 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `admin_table`
-- ----------------------------
DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE `admin_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `admin_table`
-- ----------------------------
BEGIN;
INSERT INTO `admin_table` VALUES ('1', 'root', 'cecd14064502f3ab34cd5b0dee3545c2'), ('2', 'neal', 'b644584d66f1740887e60408b543cea0'), ('3', 'Nealyang', '9a162c584b7cad5c3eb19e9fbcbd8592');
COMMIT;

-- ----------------------------
--  Table structure for `blog_list_table`
-- ----------------------------
DROP TABLE IF EXISTS `blog_list_table`;
CREATE TABLE `blog_list_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `summary` varchar(500) NOT NULL,
  `href` varchar(300) NOT NULL,
  `author` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `blog_list_table`
-- ----------------------------
BEGIN;
INSERT INTO `blog_list_table` VALUES ('2', '关于nodejs中cookie和session浅谈', 'cookie，session作用，以及在nodejs中如何操作和利用cookie和session', 'https://my.oschina.net/Nealyang/blog/844049', 'Nealyang'), ('6', 'angularJs中关于ng-class的三种使用方式说明', '在开发中我们通常会遇到一种需求：一个元素在不同的状态需要展现不同的样子。\r\n\r\n而在这所谓的样子当然就是改变其css的属性，而实现能动态的改变其属性值，必然只能是更换其class属性', 'https://my.oschina.net/Nealyang/blog/525865', 'Nealyang'), ('7', '点燃中国冰雪运动的火炬——习近平总书记关心北京冬奥会5个镜头', '筹备工作紧锣密鼓。春节前后，习近平总书记的日程中，北京冬奥会筹备工作占据着重要位置。', 'http://china.huanqiu.com/article/2017-02/10199694.html', 'Huanqiu'), ('8', '缅甸工人罢工还打砸抢，中资服装厂过去两个半月经历了什么', '一家位于缅甸仰光兰达亚工业区的中资服装厂23日遭遇数百名缅籍罢工工人及外来人员打砸破坏，7名中国籍员工在厂内被困9小时才获准离开。企业负责人说，该厂已经被占据近一个月，迄今仍被罢工者控制。', 'http://world.huanqiu.com/article/2017-02/10200088.html', '环球网');
COMMIT;

-- ----------------------------
--  Table structure for `user_table`
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `pic_header` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user_table`
-- ----------------------------
BEGIN;
INSERT INTO `user_table` VALUES ('6', 'Nealyang', 'sunsting@163.com', '/files/upload/c630494b49e1e54a713f2e4f275edd2e.jpg'), ('7', 'Neal', 'nealyang231@outlook.com', '/files/upload/68efe455c4ecda9517d644751c749849.jpg'), ('8', '婷婷', 'sunsting@163.com', '/files/upload/872ce9c96a353d082f20f20575af158f.jpg');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
