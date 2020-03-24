CREATE DATABASE  IF NOT EXISTS `pocketponics` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `pocketponics`;
-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: pocketponics
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `active_sessions`
--

DROP TABLE IF EXISTS `active_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `active_sessions` (
  `token` varchar(128) NOT NULL,
  `expiration_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`token`),
  UNIQUE KEY `token_UNIQUE` (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id_fkas` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_sessions`
--

LOCK TABLES `active_sessions` WRITE;
/*!40000 ALTER TABLE `active_sessions` DISABLE KEYS */;
INSERT INTO `active_sessions` VALUES ('+iQzWra25ZKxRoshUl1GWJeDO7T3xmj9HEOZTwqO6Z4=','2020-02-18 18:34:56',22),('+S8jkou0ZF6VThdAZqC56bNPz6KQOKEvOgbWlYMHivE=','2020-02-19 02:51:19',22),('07F+1XGPQqek00o7NefvWEILWwVDprmn+eexhRUaUlM=','2020-02-21 21:13:06',22),('0hDkF3B9W7ChAEfAtsqGCEYF6lbfAmuCEORCBnXW2mE=','2020-02-20 21:48:46',22),('0zxubgEdeXMcvuLUinj81e+TI2jLZYunu6QbbUb7h4M=','2020-02-21 21:16:02',22),('1vOCCmw05Tn1NOwb1t25QYUib5E28ebcUiVufjZdivY=','2020-02-18 16:21:28',22),('1YkPvNGdRhLOOIqWR0fy1H6gE+Xz+UtDffaKhBPMrko=','2020-02-27 14:38:15',22),('26AehgIDu8tSKWZHu/IG5oTb6A+PkJr1LqiJ5K0vO7I=','2020-02-20 22:01:49',22),('28OaRmNLMp/JCCRR31bf8wUEMjiROLiEPsC30fpFASA=','2020-02-12 00:54:35',21),('2Mr08PIED1uBXgnZUQG/xthm8kORYM6BSnYUEu/aBwA=','2020-02-20 20:36:44',22),('2pDMdHDYoMUp6CbxnwKMP6c3VFV7LHB3TAVVywhklfA=','2020-02-20 19:28:17',22),('2WNebLUOMLq6uOw4SxAKCoy1zaaDv6mR8J2cSwsplzM=','2020-02-20 19:04:06',22),('35Lj0uVn895wlABe3qcCTDhMxkWV18jEqcIkpiWDBdQ=','2020-02-27 14:33:12',22),('4iYl3TbFL2e2YxnFgc0ERIp7nOXsel49pAETGmmH9zA=','2020-02-20 20:55:22',22),('4jh+5Qgcz17zI4c4QKuHeaRWunmk3KF9D9pIjwUkFGI=','2020-02-20 21:42:54',22),('56mE+l8OvjGRSHbBBE7b96xj0hJ7Md0wgiZUrKwiKFs=','2020-02-20 19:08:21',22),('5hczdR+Un7h4Lyy/gJkJLX2l4YqYdKoZerv2V6UCc58=','2020-02-27 14:06:55',22),('5tNin2num7TEPxD8leL5qhLen8gsjuyu7kbHunB/qFc=','2020-02-20 23:13:27',22),('5YpDlvzoxJzCv7m/cMp2RMffRKGzu0+WxlBL8pg0XLE=','2020-02-20 21:12:23',22),('7VqQP19Cq3kTyrjvss0PWANeLiyqJOhsuF6U+5vye5w=','2020-02-20 17:12:33',22),('8fHu5hN+bisY/hbPjztJ0+TDrTT/xCx7cxUyhNalbN4=','2020-02-20 21:20:03',22),('8JDlY/kvpWTqHQE3EuiFN5rG94B33XdiwfFawZ0NDDg=','2020-02-20 21:05:55',22),('8RQlCg4IIyaFMdQXqI+Zs4/Rzvw9upmDQXjM3MG1L1c=','2020-02-20 20:36:16',22),('9kSdZb6m4AeHnOza4wc+DAjeNoxUDFvijXxd/7zDE30=','2020-02-21 20:26:29',22),('9vkVgyi2YBlqQhGpe/0V61z/iUGJNolSD9pZzd8t+B8=','2020-02-20 21:00:52',22),('a1sLr1zJK24SBd3EdlSatw7GFKFiiUUQj1sFBh1kN3k=','2020-02-20 21:20:18',22),('a6G1Q7v6lVMOAgPftCnl1pEGOq0Pl0gaij8CxbTcf1Q=','2020-02-20 22:20:20',22),('aO4D0A0s1TLpZR6wEnYyHOyY5DNVzWxXPMBA0jrpAqQ=','2020-02-20 19:45:09',22),('ave6xY6Y+zo1Xppb+0guRcbOnp095i+3i/uLSm0V50I=','2020-02-20 20:36:17',22),('b50pl+BOHuwGwFvrkFMb5UFzTjTkzmDBqGvlQHr25kA=','2020-02-27 14:37:10',22),('bDqffIRcLM2ASIPrtHcI3Eyf1d7Df7vqCSSEnRMKnpw=','2020-02-27 14:30:40',22),('BNzQTs4B3ge9rlSxd6hwCLUuO9qlwUw580W9UrhNMiw=','2020-02-20 21:03:07',22),('Bord6FU80IGiRbaYP5Dm3BCOe94NgNTadSKg8+UNBxU=','2020-02-20 21:43:13',22),('BqaY74LKFDBI4M3rN04jxo3V99ytoAWjpKp0If3EYcM=','2020-02-20 19:33:34',22),('BU48sUuu0OANYJ8BTOK33FP83K1aJ6CN206k699iQuM=','2020-02-20 19:22:11',22),('cMkZzM/Vz2zoHlEBDK8ttKjrCBmn0/qiNfxH4vow+40=','2020-02-18 16:23:34',22),('D/isVeOWgMuNSXrmQWsGsWva9Q0rAhv8FGpXffXk0Ws=','2020-02-20 19:58:57',22),('D19Hk+eRaAtnI5ZGznW++RVP9vHsrvVYgHjDinYiDJw=','2020-02-18 19:25:49',22),('dGqM4isxJDqk7UP4OTpHKv+LX0zUFOiepBtU8flXuUs=','2020-02-19 18:27:25',22),('DP9ScRWvH1Ep2K8urUqY1w0C4qnJ4S1l2tUKSOc9M/w=','2020-02-20 23:15:18',22),('dsFbcG2p/p6I/62MfuwkiouQydBooIivUPYssML0Y6k=','2020-02-20 19:34:09',22),('DTwCicwdatKHt8JHb8FAlep8enGKfTBZL7h2lrjVKVI=','2020-02-19 18:30:29',22),('e3qNco7P1c5SkTLrIR4UbVP01A0nAAkO54WkG8qraJQ=','2020-02-20 19:58:56',22),('edlWKR1us5YJSJ1Sz85EA5CHGHnfSZvWW4Na+H2x3I0=','2020-02-19 18:08:47',22),('egUL60wLuCtkITkZq6gR3KfhCiDRDMsgiGUPztNIusY=','2020-02-19 17:49:27',22),('eKnO754RAA1XELtxcAiEvtthYoTZzFWDsOeDfljbXEw=','2020-02-20 20:28:33',22),('f9yVLC97GZNr9PzSkm7N9vB6xm7iB66NziotndKrO18=','2020-02-20 22:03:47',22),('FBW2iucnym3G50XbFHw02AzU9dTUWuuyLPBahsov9jc=','2020-02-19 17:48:20',22),('FcIxQWYU+DlWd5WcT0n1Q/VzWKjbrs/83NNytACIcGI=','2020-02-18 17:51:17',22),('FpFvbSI8hBZp50O9ZjMFQm1cgUPGBLUyA7ICgVFGUWM=','2020-02-20 21:40:37',22),('FYfCNBk6iDMN6Xo97Qa21AxAZpJQwDu4UVVINdY6OXo=','2020-02-20 23:06:38',22),('GlQC87kzZ0WakZkQaXrdJ0JD6zwiKBWB3DuaeiOxv1c=','2020-02-27 15:28:45',22),('gnVgR1Yl2xTaQ1HDWAFmkY7lMPH2cmvLQoWxi9dfn8U=','2020-02-20 22:23:03',22),('gRgomK6SMFHyiuRvQi+LKaYCfI6YuqVMddN0Hsa3MJ8=','2020-02-19 18:10:24',22),('h8OBpx+koReeWHslA8KR4MzrPjVW+khd0cD9qP/P1bQ=','2020-02-20 22:01:07',22),('HCm4YJwWkqFVIB4h1ls9bU+Lv4pK5EgAX93ik3eXtYI=','2020-02-18 16:56:52',22),('hDfUFj/9yLOwbAZTyXn1Fxi3xINe6K6lqaqgOxPH9ZM=','2020-02-17 03:07:39',22),('hKIhOR33lRrqdAnPWfcp+pB4FTXa/0qJfjWMhiA0nGM=','2020-02-20 21:01:48',22),('I7otRxN3MGHjNSLYvZeGE/imrTymADVvu7X8Houys4I=','2020-02-20 22:22:24',22),('iGxk8cHr26VJOXz2ReTkulihVzna5w6qs/unokvziv4=','2020-02-20 20:42:23',22),('Il8QadCQHaYGZu+XWWyu0K//t8lYOqk/CeU56QvC1xo=','2020-02-20 21:03:58',22),('IUcryzj6cRZHWsvllGlbAEi4sVuyxV/ZPSZOssDaZlM=','2020-02-19 21:54:45',22),('iuZR/9h5o1AwCx3spfwPTAFljIK7zD5+4BPnkLn0gqM=','2020-02-27 15:35:04',22),('J5piaD+/1LlcfTGnaNyZn65fIxfDriCPBoOaxL529yU=','2020-02-27 15:47:53',22),('JgCktWcAMN2tbIppD2gXISXnw2gOEEVVUKSQMTt60Oo=','2020-02-27 14:29:29',22),('JGN7aST2KTr2n5HqYMp5z9bQPvO1BO0frIxEsJuRWfc=','2020-02-19 21:53:40',22),('jlwjs4K+I4QFeuQpKILZOMBigJ319Gef1oXsCIYuC7s=','2020-02-20 21:46:58',22),('jsjRWe0nB+KYwRbrm4aIOtz+vqYRniqPYz3q4vJQNb4=','2020-02-17 03:01:58',22),('JVKC/AbhVHCHZpIowbJpbcRNkZkg7rITffeNqtp29Dg=','2020-02-19 17:46:03',22),('K2VaFKMR3RM2lCVsSYYsqQgcGanSi+W74mIXrNBMj7I=','2020-02-20 20:01:14',22),('KbTkcUtOs1AKbNQd64vFJ1FUy4Vqp9orl5eKq1cdUGc=','2020-02-20 23:08:47',22),('kNhCqWvzyeGgMIrO0jTVEp+Icjnx/sj4Q1G2ff7AGOc=','2020-02-20 21:05:15',22),('KOaar+Vs/uwrDcvi9D+h1m111byUrl0z74EIaIAQvNA=','2020-02-20 23:11:58',22),('lCmOYn5GwV0FVTOYLL3TdRU617b6sRGu6CP4FYECHNw=','2020-02-27 15:48:09',22),('lg+OsU3+/vGb1eEF5wxB7lO8JFt18gSPZ37C4RzPwIk=','2020-02-20 20:01:34',22),('lINQuYKHTf3xVv8I1UQvBqYcdx6DppkM0F/M6bjNU5Q=','2020-02-18 17:49:51',22),('Lmaz7I1pktndeoL+BHA4VGoSkzVuxvXesCO8yGxkErs=','2020-02-27 15:23:09',22),('lnHfuTKwKZuRkRwcP94rhOfSXovnyIFO9V8meH7ftUo=','2020-02-20 20:08:17',22),('LOcBUs5g0gjc5yVO8rs6a8Lk2LeIhPVOjlEjuNWU7a0=','2020-02-18 18:36:21',22),('m6DaTWEDFup+gOYvhSBYpa/0Y+4nAcRsiYd5jGPR9js=','2020-02-27 15:05:51',22),('m7ucyzm2wHpnpP6G/lyqCC9jtgAVEHydQ+d2ktHEIXU=','2020-02-20 23:16:56',22),('MOm1D+TiqgCaaWaBmOm3MoVRuW/UpfJjxtCT63KJLZs=','2020-02-20 23:08:27',22),('mq/HQwtWN0KIROw4GrR9oaHd1XRYy+/9+Dbe9VP9C9k=','2020-02-20 20:25:19',22),('Nanvf/6bsIS/w7OtEAhOJMImCs34PR9yMD9MwAgant4=','2020-02-20 19:26:32',22),('nARD7AKkvRI0plpJLnw5tO5+YiDTaVD7fI4JlFkKCSQ=','2020-02-20 21:07:34',22),('NbgWfee0La0w2/gAPfsufRUFJDKY2B9SFVhIXhMSYAs=','2020-02-20 19:35:45',22),('NIfRVKBvywEBqm5l3HizqFday9qHfespEuP3nGprrNg=','2020-02-20 18:59:35',22),('nMaOCZbLwBolVb/Et5RSPwFOsmUo2VvXjjYVEm4oYBg=','2020-02-20 20:40:13',22),('nOgj//SwNB8pWpVRxYZJa9L1A8QiCdLUJ1jpeFg/JaA=','2020-02-20 20:54:54',22),('nUTN/6QxlAnrxG0WfLEzMxr93Ry3gNHLmO5uu6XVTrs=','2020-02-27 14:45:56',22),('nz9RzvhdpvkmpxIEfLAr3SXHAKD9xuPkLxuhCdVk2go=','2020-03-01 00:28:51',24),('o87AnP+MAJ54CqJi2HgbsqsG7RjBZGbW1nbw0o2Puig=','2020-02-20 21:57:37',22),('Ob0dCDPUpsEcUd/SZGcmt9+1au1IQ0iB9cNojNw0cEw=','2020-02-20 19:27:04',22),('oHPiVH89NvFproBJd0GlgTduCKpqDfAIwmMCebrgQOw=','2020-02-20 21:44:20',22),('OpnCoWkKBddL94xgwU0E5GyOMG3xAy35SoDoqOQHSFQ=','2020-02-19 17:51:38',22),('oPqTpwjobwGjP2fx/uLjb+oMlkrxERiJmfQFXw9fPXw=','2020-02-20 16:37:50',22),('oXdV1p+PwWtv6U7CPDpnP5SQg7SEd6Y7HvVrxUBvEE4=','2020-02-20 20:14:38',22),('PT65yj1j3jbH21nIkU9EiTVkzJCeG8Grtt0J0WIZPM0=','2020-02-20 21:46:14',22),('QA/ETuQ64vSIhbH1I0pZ8WjVxnhrAceCGBoKux8auYI=','2020-02-20 21:41:15',22),('QbJ0fHBR6bIM9eDX0XHli0Z3vtv/ftvZhHr0N28nDCU=','2020-03-01 00:21:03',21),('qMw6oTSqxj2Y8wGXTaCBl496ROGr13Fn4g1RjbbuHFA=','2020-02-20 20:25:22',22),('QqHlk5NWHGbxH3gr1p3jVSEIj4MyG1uD3UxPJk5hgpg=','2020-02-20 20:45:35',22),('QYSwH8WL+ehbem/5B4X3SwxiiQG99pFw3ojkff/EJsk=','2020-02-27 15:11:44',22),('rH2AKp41AQqXF4pcsrIodJujQyllQ/XcjxR9T7BUu0c=','2020-02-20 20:36:15',22),('RYgx7wLF8o0pHTeuv/F/NcUEXKRdhXxhcgkXrcN8glw=','2020-02-20 21:37:14',22),('RYqsjR23YXtitQ6QQ2uDKYSvz2FMygBYPrg3TR8KUsM=','2020-02-20 18:57:55',22),('sbqUxzZX6lApnjVGR7O+TP52buH+cqVmUKAovuw1hsg=','2020-02-20 23:19:14',22),('SC0pNQz81gxPWcku6/3Sw8eduqzn3JUxt9jzMLVO28M=','2020-02-19 18:01:28',22),('sfzVBOEt4TKh9kyFMKyco5dWrN93F40TVYJUpFjeyIM=','2020-02-20 21:02:17',22),('sQOlQnuiKKp7K2APTVy1EX3vBh5X4Na/ZZ/BSotWz8Q=','2020-02-20 19:07:19',22),('srsFps+vBsKwSUoS/q/vPG0U6YgznfnemEjdiL0gxTk=','2020-02-20 23:14:31',22),('SsqoQ1aoewlm2D6JlDgIz6c0wUI/gjJEf5/9GaGF3xU=','2020-02-20 19:31:16',22),('td9qVi+L5uuyUUCBHn6v5LMsGvy2ggRQFKGvC435GH4=','2020-02-20 20:20:38',22),('trxjh+ZO0wOI05wR4sZkER98EZQ3Fb47c/0Bu0PxohI=','2020-02-20 17:38:46',22),('Tv5NgaVYZyHJUvhWEWcwAiXu8aH8J/FyZohmzn97uO0=','2020-02-20 20:28:51',22),('UAdE82iTAzXaiKgy1OQgJiNRYHYsXqGvdkZCB505JwQ=','2020-02-20 20:10:07',22),('uf5qs5/NCFehjMe0a37Mbs5uz3bGuigBSJJ6iJHPNYA=','2020-02-20 21:40:30',22),('ur1X8sO4clKRE5obx9t2zsjzRHfuUfBQZmg7m1K9eZU=','2020-02-27 15:34:37',22),('uTTFATjPJQDLfCc0qjLwTds4c3GUi6zUKi0WAvEUvbk=','2020-02-19 17:53:48',22),('v/0QyFD8UB8bAVjqFqewV4XKv8XhEoUQbHqRQlV2mbk=','2020-02-27 14:26:53',22),('VlVEXKGkCnRH217jRTU/27vbC0mevCvccV4xYTYFwIc=','2020-02-20 21:02:31',22),('W6a6yA8eKvObwnzBXxuCVgOsPAenw0cwAIrDvF8lBVQ=','2020-02-20 21:20:07',22),('WZHVuujVUWMvrAlAAit1xsf0YJip1ioLgVtF1ip7Vpw=','2020-02-20 20:28:10',22),('xdmmLebElXslaTbyv8/aBqQ/lrMdbne1XnQ/1g1Ckl0=','2020-02-20 20:07:02',22),('XeoZ9WvGkE0ZPks3OExTi7VcZf1cQDBF8AtAglWs72E=','2020-02-17 20:13:27',21),('XmmhC5VSbZqNmk7j6kgh+m9LEFNbythZKrpI/8Sw+/w=','2020-02-20 21:14:51',22),('xQYEubzNOoFgp2rTPJl8ZTfux/vtG4sz11/mbw5NGlo=','2020-02-20 19:58:09',22),('xyAT/ykzxmra1k/hmrKWwMc1+XvxNtDMEYqDd9rrPAk=','2020-02-19 18:03:25',22),('y6tUMPl6yjAfRy1GW/MFj3kIFCPS0wKuJAD4j4jBDE8=','2020-02-20 20:13:41',22),('yjQiDR/cwtyeH2ZAkaOGFyihdkQxgsgcRZpBVLLKnZg=','2020-02-20 19:58:08',22),('yNI1T+AZSD1kf1AgIPmCdI7iOJTqJ3jtSJPftW1SA70=','2020-02-27 14:39:48',22),('YtZQAiUqVX+8fAGyFmk8nnxil2YR4Fkc9QKjMJ2TPS0=','2020-02-20 20:24:41',22),('z9TBXn3pNT1TDWo8ycMMMczj9xiklOT0/Xaw4vxlk/c=','2020-02-20 19:25:37',22),('ZvOvl+B8VcC7C7aBO5vKTi5QP4eA1ULdVl42N1nAbV4=','2020-02-20 23:15:52',22);
/*!40000 ALTER TABLE `active_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `user_id` int(11) NOT NULL,
  `device_key` varchar(45) NOT NULL,
  UNIQUE KEY `device_key_UNIQUE` (`device_key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (24,'ExponentPushToken[g5paj4PLG4CBPLrBTCwEaz]');
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `greenhouse`
--

DROP TABLE IF EXISTS `greenhouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `greenhouse` (
  `greenhouse_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `water_level` decimal(5,2) DEFAULT '0.00',
  `nutrient_level` decimal(5,2) DEFAULT '0.00',
  `battery` decimal(5,2) DEFAULT '0.00',
  `seedling_time` date DEFAULT NULL,
  `power_source` tinyint(4) DEFAULT '0',
  `light_level` decimal(5,2) DEFAULT '0.00',
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`greenhouse_id`),
  UNIQUE KEY `greenhouse_id_UNIQUE` (`greenhouse_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id_fkgr` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `greenhouse`
--

LOCK TABLES `greenhouse` WRITE;
/*!40000 ALTER TABLE `greenhouse` DISABLE KEYS */;
INSERT INTO `greenhouse` VALUES (6,'YO ITS A GREENHOUSE',0.00,0.00,90.00,NULL,1,10.00,24);
/*!40000 ALTER TABLE `greenhouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historical_data`
--

DROP TABLE IF EXISTS `historical_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historical_data` (
  `date` datetime NOT NULL,
  `water_level` decimal(5,2) NOT NULL,
  `nutrient_level` decimal(5,2) NOT NULL,
  `battery` decimal(5,2) NOT NULL,
  `power_source` tinyint(4) NOT NULL,
  `greenhouse_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `light_level` decimal(5,2) NOT NULL,
  PRIMARY KEY (`date`,`user_id`,`greenhouse_id`),
  KEY `user_id` (`user_id`),
  KEY `greenhouse_id` (`greenhouse_id`),
  CONSTRAINT `greenhouse_id_fkhd` FOREIGN KEY (`greenhouse_id`) REFERENCES `greenhouse` (`greenhouse_id`),
  CONSTRAINT `user_id_fkhd` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historical_data`
--

LOCK TABLES `historical_data` WRITE;
/*!40000 ALTER TABLE `historical_data` DISABLE KEYS */;
INSERT INTO `historical_data` VALUES ('2020-03-01 00:01:46',0.00,0.00,5.00,1,6,24,10.00),('2020-03-01 00:06:17',0.00,0.00,5.00,1,6,24,10.00),('2020-03-01 00:06:33',0.00,0.00,90.00,1,6,24,10.00);
/*!40000 ALTER TABLE `historical_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_ideal`
--

DROP TABLE IF EXISTS `plant_ideal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plant_ideal` (
  `plant_id` int(11) NOT NULL AUTO_INCREMENT,
  `ph_level_low` decimal(5,2) DEFAULT NULL,
  `ec_level_low` decimal(5,2) DEFAULT NULL,
  `temp_low` decimal(5,2) DEFAULT NULL,
  `cycle_time` int(11) DEFAULT NULL,
  `ph_level_high` decimal(5,2) DEFAULT NULL,
  `ec_level_high` decimal(5,2) DEFAULT NULL,
  `temp_high` decimal(5,2) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `light_time` int(11) DEFAULT NULL,
  `steps` varchar(250) DEFAULT NULL,
  `plant_url` varchar(250) DEFAULT NULL,
  `harvest_url` varchar(250) DEFAULT NULL,
  `num_plants` int(11) DEFAULT NULL,
  PRIMARY KEY (`plant_id`),
  UNIQUE KEY `plant_id_UNIQUE` (`plant_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_ideal`
--

LOCK TABLES `plant_ideal` WRITE;
/*!40000 ALTER TABLE `plant_ideal` DISABLE KEYS */;
INSERT INTO `plant_ideal` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'empty',NULL,NULL,NULL,NULL,NULL),(2,6.00,2.00,0.00,65,6.50,4.00,0.00,'Green Beans',12,NULL,NULL,NULL,8),(3,5.50,1.80,0.00,60,6.60,2.30,0.00,'Spinach',10,NULL,NULL,NULL,18),(4,6.00,1.80,0.00,45,6.50,2.40,0.00,'Turnip',12,'Remove the turnip from the tier. With a pair of scissors, cut the leaves off the root, and remove any dangling roots.','https://lh3.googleusercontent.com/HvTSEJ6TtVkSl0EV11E-L-cQ5jQrIUr9A_KRzCek1WDlswBLpav5PT836DcocoDKaG-IGqgU0ZunVnd_3NQZxXEThwq26yQUNikDox4d-LlZ1jQuwA=w1280',' https://lh4.googleusercontent.com/H-8W1ypQLpiFElIqjlHeKU2skb5d-e8d547m0K4ZzjagdHGLEbHZqJy5ws6DttMA_bF3hiZi=w1280',18),(5,5.50,2.00,0.00,84,6.50,5.00,0.00,'Tomato',10,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `plant_ideal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_grid`
--

DROP TABLE IF EXISTS `sensor_grid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_grid` (
  `serial_no` varchar(45) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  `user_id` int(11) NOT NULL,
  `greenhouse_id` int(11) NOT NULL,
  PRIMARY KEY (`serial_no`),
  UNIQUE KEY `greenhouse_id_UNIQUE` (`greenhouse_id`),
  UNIQUE KEY `password_hash_UNIQUE` (`password_hash`),
  UNIQUE KEY `serial_no_UNIQUE` (`serial_no`),
  KEY `greenhouse_id` (`greenhouse_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `greenhouse_id_fksg` FOREIGN KEY (`greenhouse_id`) REFERENCES `greenhouse` (`greenhouse_id`),
  CONSTRAINT `user_id_fksg` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_grid`
--

LOCK TABLES `sensor_grid` WRITE;
/*!40000 ALTER TABLE `sensor_grid` DISABLE KEYS */;
INSERT INTO `sensor_grid` VALUES ('12345678','$2a$10$kMUtmNTibFdbXjLRFT4QGuO8nluHsl.75mK4pXT71Qzdxy7q5VFMC',24,6);
/*!40000 ALTER TABLE `sensor_grid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiers`
--

DROP TABLE IF EXISTS `tiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiers` (
  `tier` int(11) NOT NULL,
  `plant_id` int(11) DEFAULT '1',
  `ph_level` decimal(5,2) DEFAULT '0.00',
  `ec_level` decimal(5,2) DEFAULT '0.00',
  `water_level` decimal(5,2) DEFAULT '0.00',
  `cycle_time` date DEFAULT NULL,
  `light_start` int(11) DEFAULT NULL,
  `greenhouse_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`tier`,`greenhouse_id`,`user_id`),
  KEY `greenhouse_id` (`greenhouse_id`),
  KEY `user_id` (`user_id`),
  KEY `plant_id_fkt_idx` (`plant_id`),
  CONSTRAINT `greenhouse_id_fkt` FOREIGN KEY (`greenhouse_id`) REFERENCES `greenhouse` (`greenhouse_id`),
  CONSTRAINT `plant_id_fkt` FOREIGN KEY (`plant_id`) REFERENCES `plant_ideal` (`plant_id`),
  CONSTRAINT `user_id_fkt` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiers`
--

LOCK TABLES `tiers` WRITE;
/*!40000 ALTER TABLE `tiers` DISABLE KEYS */;
INSERT INTO `tiers` VALUES (1,NULL,8.20,2.50,34.00,NULL,NULL,6,24),(2,1,7.80,3.20,35.00,'2020-03-01',6,6,24),(3,NULL,8.00,2.10,32.00,NULL,NULL,6,24),(4,NULL,7.90,3.31,33.00,NULL,NULL,6,24);
/*!40000 ALTER TABLE `tiers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  `admin` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `password_hash_UNIQUE` (`password_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (21,'rohan@gmail.com','$2a$10$fR8QgJOPrhWQRIvzywjg5uQaRX6FvF3VSt97rV9p/an26kXncHqxe',0),(22,'admin@gmail.com','$2a$10$iyF8.H/0J7hun9aZ0oV6G.S7EGBR/ObB0GP4MWmaPh3qMcslyf9zW',1),(23,'rohan@tgmail.com','$2a$10$n9Udr4f21GrERjlIdIzgOOOJsgBa2wPscpBbtF5kuBxZlF8XEw4W2',0),(24,'pr4h6n@gmail.com','$2a$10$udr.iccHhsI6hG7Xe48mkOLncleV0czMc.6K2R9xICY6nCxLnaQO.',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-29 19:08:31
