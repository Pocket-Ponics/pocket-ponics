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
INSERT INTO `active_sessions` VALUES ('q9jNiDqWBPdS0+XXdwvmzltdFyCyCqN0VhC+VY8Sg8U=','2020-01-27 22:53:58',18),('wQe47h5651H5JXoSEokI7qOQFT7R7tDq88ZKNlBuSGU=','2020-01-27 22:44:24',17);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `greenhouse`
--

LOCK TABLES `greenhouse` WRITE;
/*!40000 ALTER TABLE `greenhouse` DISABLE KEYS */;
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
  `steps` varchar(45) DEFAULT NULL,
  `plant_url` varchar(45) DEFAULT NULL,
  `harvest_url` varchar(45) DEFAULT NULL,
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
INSERT INTO `plant_ideal` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'empty',NULL,NULL,NULL,NULL),(2,6.00,2.00,0.00,65,6.50,4.00,0.00,'greenbeans',12,NULL,NULL,NULL),(3,5.50,1.80,0.00,60,6.60,2.30,0.00,'spinach',10,NULL,NULL,NULL),(4,6.00,1.80,0.00,45,6.50,2.40,0.00,'turnip',12,NULL,NULL,NULL),(5,5.50,2.00,0.00,84,6.50,5.00,0.00,'tomato',10,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (17,'rohanpatel5753@knights.ucf.edu','$2b$10$cfEDA/Heq.B20Yr1mPg17uM/s8GKoQ7OWsAV.dcSD1OXTKUgHRZRi',1),(18,'test@knights.ucf.edu','$2b$10$yFkEgHLeiZ9AdXkzxUUvROgylUQMt4VAMYBl5CmB3uoahr7yrkZ.a',0);
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

-- Dump completed on 2020-01-29 15:45:43
