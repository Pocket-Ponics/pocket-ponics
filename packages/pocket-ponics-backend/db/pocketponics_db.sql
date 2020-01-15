CREATE DATABASE  IF NOT EXISTS `pocketponics` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `pocketponics`;
-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: pocketponics
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

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
INSERT INTO `active_sessions` VALUES ('8RJOVrD7AMbpPbiuzEs6bFoD/cyngnDcR2RwKk56kHQ=','2020-01-13 21:53:29',15),('9MoqiSJlGHTcrWPBJ5aI2VvS+2bMv9D3VGJaJGAfrtg=','2020-01-13 21:57:03',8),('aIEoeuLsS9gq+nl7UrXNXHGw50bpcy+axaKc8zZB5DE=','2020-01-12 02:41:40',6),('BUpp9FC3C9b/cQF7cOJ/SE39LmNppvW8qxcmC73fxjM=','2020-01-12 19:10:11',10),('c169YFvH+TOQXTBO+/naJNJ2g+T7LSjdSje2yQTW0do=','2020-01-13 00:37:38',12),('DLp+d/0+9CGJFNrW3Kmb+Pg3Xfxdmq8prgGJvv3c+zA=','2020-01-12 16:57:36',6),('g2PBIPP9iuNxE3MWu58HAOuyLcyB6fKpv7zNnI+y8vs=','2020-01-13 21:57:16',8),('MniyKhZ1cto3DdWOx2zuqFyGED1LNmLF4yevmuY99dE=','2020-01-12 19:52:40',13),('mnovuafB32+BX8Kn/oyFLLT3H28mLsdEIcxuTxrHO1k=','2020-01-12 20:06:11',12),('t/wa7S8cCYvfg3At6O/dzRyfBUTVj6IDAsQ/MkFo/IM=','2020-01-13 21:52:00',15),('Vfs8Xrd0U80DErxO4aCNyyumpXnK/TeIG5b32JM4pYM=','2020-01-12 20:14:28',14),('viHIVoyKmdvh6Xn2gQ5bMjH55DWAtoWUJY1f+muUFFU=','2020-01-12 19:51:46',13),('XojgLLfJvblIEP9CVLpxACvb5x8HoJjvsdbweUTkDxA=','2020-01-12 02:21:34',6),('yFnhJWAI7n9q4jX5UvkiIfYRwCQPeeGqXn4Arjfu7jc=','2020-01-12 20:03:54',10);
/*!40000 ALTER TABLE `active_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adjustments`
--

DROP TABLE IF EXISTS `adjustments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adjustments` (
  `adjustment_type` tinyint(4) NOT NULL,
  `amount` decimal(5,2) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tier` int(11) NOT NULL,
  `greenhouse_id` int(11) NOT NULL,
  PRIMARY KEY (`adjustment_type`,`user_id`,`greenhouse_id`,`tier`),
  KEY `user_id` (`user_id`),
  KEY `greenhouse_id` (`greenhouse_id`),
  CONSTRAINT `greenhouse_id_fkadj` FOREIGN KEY (`greenhouse_id`) REFERENCES `greenhouse` (`greenhouse_id`),
  CONSTRAINT `user_id_fkadj` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adjustments`
--

LOCK TABLES `adjustments` WRITE;
/*!40000 ALTER TABLE `adjustments` DISABLE KEYS */;
/*!40000 ALTER TABLE `adjustments` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `greenhouse`
--

LOCK TABLES `greenhouse` WRITE;
/*!40000 ALTER TABLE `greenhouse` DISABLE KEYS */;
INSERT INTO `greenhouse` VALUES (2,'DateTest',0.00,0.00,0.00,'2020-01-26',0,0.00,7),(3,'CycleTimeTest',0.00,0.00,0.00,'2020-01-26',0,0.00,7),(4,'Name',0.00,0.00,0.00,'2020-01-27',0,0.00,15),(5,'herewbanana',0.00,0.00,0.00,'2020-01-12',0,0.00,8);
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
/*!40000 ALTER TABLE `historical_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_ideal`
--

DROP TABLE IF EXISTS `plant_ideal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plant_ideal` (
  `plant_id` int(11) NOT NULL,
  `ph_level_low` decimal(5,2) DEFAULT NULL,
  `ec_level_low` decimal(5,2) DEFAULT NULL,
  `water_level_low` decimal(5,2) DEFAULT NULL,
  `temp_low` decimal(5,2) DEFAULT NULL,
  `cycle_time` int(11) DEFAULT NULL,
  `ph_level_high` decimal(5,2) DEFAULT NULL,
  `ec_level_high` decimal(5,2) DEFAULT NULL,
  `water_level_high` decimal(5,2) DEFAULT NULL,
  `temp_high` decimal(5,2) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`plant_id`),
  UNIQUE KEY `plant_id_UNIQUE` (`plant_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_ideal`
--

LOCK TABLES `plant_ideal` WRITE;
/*!40000 ALTER TABLE `plant_ideal` DISABLE KEYS */;
INSERT INTO `plant_ideal` VALUES (0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'empty'),(1,5.50,2.00,0.00,0.00,84,6.50,5.00,0.00,0.00,'tomato'),(2,6.00,2.00,0.00,0.00,65,6.50,4.00,0.00,0.00,'greenbeans'),(3,5.50,1.80,0.00,0.00,60,6.60,2.30,0.00,0.00,'spinach'),(4,6.00,1.80,0.00,0.00,45,6.50,2.40,0.00,0.00,'turnip');
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
INSERT INTO `sensor_grid` VALUES ('428828','$2b$10$tYlOmk0FOCGdIXS0osb/SuFriItAZOczcsg8Cvz/lnd0OzzxQLD.6',15,4),('594517','$2b$10$LTb883kVMv/QlAx.dWFZI.UOeHVIt8Qtv.ivUTdgQvEYaYJNhJfiq',7,3),('650033','$2b$10$KzCDmIkOmkgWUQKfSoKwwuHQiYzYv8W.d/NbeeegNzZX6JxUcJTo2',7,2),('89898989879','$2b$10$DlL40aU9d6ZOXrW2n.H0COSMCvl/styWSxXCf/HoSzqZKw2ZENRLO',8,5);
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
  `plant_id` int(11) DEFAULT NULL,
  `ph_level` decimal(5,2) DEFAULT '0.00',
  `ec_level` decimal(5,2) DEFAULT '0.00',
  `water_level` decimal(5,2) DEFAULT '0.00',
  `cycle_time` date DEFAULT NULL,
  `num_plants` int(11) DEFAULT '0',
  `greenhouse_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`tier`,`greenhouse_id`,`user_id`),
  KEY `plant_id` (`plant_id`),
  KEY `greenhouse_id` (`greenhouse_id`),
  KEY `user_id` (`user_id`),
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
INSERT INTO `tiers` VALUES (1,1,0.00,0.00,0.00,'2020-01-28',1,2,7),(1,1,0.00,0.00,0.00,'2020-04-05',1,3,7),(1,1,0.00,0.00,0.00,'2020-04-06',1,4,15),(1,NULL,0.00,0.00,0.00,NULL,0,5,8),(2,NULL,0.00,0.00,0.00,NULL,0,2,7),(2,2,0.00,0.00,0.00,'2020-03-17',1,3,7),(2,3,0.00,0.00,0.00,'2020-03-13',18,4,15),(2,NULL,0.00,0.00,0.00,NULL,0,5,8),(3,NULL,0.00,0.00,0.00,NULL,0,2,7),(3,3,0.00,0.00,0.00,'2020-03-12',18,3,7),(3,4,0.00,0.00,0.00,'2020-02-27',18,4,15),(3,NULL,0.00,0.00,0.00,NULL,0,5,8),(4,NULL,0.00,0.00,0.00,NULL,0,2,7),(4,4,0.00,0.00,0.00,'2020-02-26',18,3,7),(4,2,0.00,0.00,0.00,'2020-03-18',8,4,15),(4,NULL,0.00,0.00,0.00,NULL,0,5,8);
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
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `password_hash_UNIQUE` (`password_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'test1@gmail.com','$2b$10$bKlJAzUuaDVgK3N2s24J.e4otFGGWDThol.XjLnVvJ8P9jVf2vFvC'),(7,'test3@gmail.com','$2b$10$RwyicNdHHhvfOfv3edzbh.vsDHWhHcMIAB.dQhuBnJPyEd8UTQC/e'),(8,'test4@gmail.com','$2b$10$8AmRyi12JCsSeBiT521kEOkcChvRfeWSvq2N8GGwNxymi4Rw39Ima'),(10,'demouser@gmail.com','$2b$10$5MVQi20FUDTzKVuc5jfwJO1ZkOCx0CTVhbka8JDkEATSNymraaRVG'),(11,'undefined','$2b$10$4NdivfssgseKM99MCMxIv.UQe32XtNoQTlty546Os1m9cWVygQnl6'),(12,'demouser','$2b$10$t8X3vlSjEEKpt1CBJrk4A.mWx6gAtJFcZD4Isqw28YtmXrt3b6N66'),(13,'banana','$2b$10$pD/kxYoHZRram54wTWUSrOhdQKXcFU7Ov087AVyeUv2aXosSKc63.'),(14,'test5@gmail.com','$2b$10$2/UQgrax426gNVRCVWM0X.aUIeyn8ZfcTYEs4OsMPH8lrtjFphQ7.'),(15,'banana@gmail.com','$2b$10$0kfsnaWjqMzqiaKhb7eZxeoe/10qw0W6ACO/jZeaNSYw9OcEuMUzS');
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

-- Dump completed on 2020-01-14 21:59:01
