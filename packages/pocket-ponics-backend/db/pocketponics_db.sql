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
INSERT INTO `active_sessions` VALUES ('IVjhQ2KkMDFbnz/V7VDkDTsUuXxH6KVm6KCfQ5n44v4=','2020-01-12 02:25:54',7),('s6Kaa2DPPMK5ahK+h1M0yDxXEmYui5+VpAylvyXgYfA=','2020-01-12 02:24:24',7),('XojgLLfJvblIEP9CVLpxACvb5x8HoJjvsdbweUTkDxA=','2020-01-12 02:21:34',6);
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
  `seedling_time` datetime DEFAULT NULL,
  `power_source` tinyint(4) DEFAULT '0',
  `light_level` decimal(5,2) DEFAULT '0.00',
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`greenhouse_id`),
  UNIQUE KEY `greenhouse_id_UNIQUE` (`greenhouse_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id_fkgr` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `greenhouse`
--

LOCK TABLES `greenhouse` WRITE;
/*!40000 ALTER TABLE `greenhouse` DISABLE KEYS */;
INSERT INTO `greenhouse` VALUES (74,'Greenhouse 1',0.00,0.00,0.00,NULL,0,0.00,6),(76,'Greenhouse 12',0.00,0.00,0.00,NULL,0,0.00,6),(84,'Greenhouse 123',0.00,0.00,0.00,NULL,0,0.00,6),(85,'herewegoagain',0.00,0.00,0.00,NULL,0,0.00,7);
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
  `ph_level_low` decimal(5,2) NOT NULL,
  `ec_level_low` decimal(5,2) NOT NULL,
  `water_level_low` decimal(5,2) NOT NULL,
  `temp_low` decimal(5,2) NOT NULL,
  `cycle_time` int(11) NOT NULL,
  `ph_level_high` decimal(5,2) NOT NULL,
  `ec_level_high` decimal(5,2) NOT NULL,
  `water_level_high` decimal(5,2) NOT NULL,
  `temp_high` decimal(5,2) NOT NULL,
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
INSERT INTO `plant_ideal` VALUES (1,5.50,2.00,0.00,0.00,84,6.50,5.00,0.00,0.00,'tomato'),(2,6.00,2.00,0.00,0.00,65,6.50,4.00,0.00,0.00,'greenbeans'),(3,5.50,1.80,0.00,0.00,60,6.60,2.30,0.00,0.00,'spinach'),(4,6.00,1.80,0.00,0.00,45,6.50,2.40,0.00,0.00,'turnip');
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
INSERT INTO `sensor_grid` VALUES ('1234536789','$2b$10$mqnUmT4U/ma.Mv2mehKFVenGbR8klRacJGCgrf5hqBzSjnpocGxLG',6,76),('12345367894','$2b$10$MXOcxLGZplE8j/EiwtdF/uXWIYfLzQfnCq6/4HZ4Zlx3a83Z.HZwS',6,84),('123456789','$2b$10$qB6qBz8jIpBtEYyd5eC3H.UKy6HsS4A7XxWMz97qt9g34Ab5xgkce',6,74),('19989898989898','$2b$10$ueme8jZ7wLKxaXnX9QMVWutvxm951TErIODBEPuT.mjJ3ng3X1gJW',7,85);
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
  `cycle_time` time DEFAULT NULL,
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
INSERT INTO `tiers` VALUES (1,NULL,0.00,0.00,0.00,NULL,0,74,6),(1,NULL,0.00,0.00,0.00,NULL,0,76,6),(1,NULL,0.00,0.00,0.00,NULL,0,84,6),(1,NULL,0.00,0.00,0.00,NULL,0,85,7),(2,NULL,0.00,0.00,0.00,NULL,0,74,6),(2,NULL,0.00,0.00,0.00,NULL,0,76,6),(2,NULL,0.00,0.00,0.00,NULL,0,84,6),(2,NULL,0.00,0.00,0.00,NULL,0,85,7),(3,NULL,0.00,0.00,0.00,NULL,0,74,6),(3,NULL,0.00,0.00,0.00,NULL,0,76,6),(3,NULL,0.00,0.00,0.00,NULL,0,84,6),(3,NULL,0.00,0.00,0.00,NULL,0,85,7),(4,NULL,0.00,0.00,0.00,NULL,0,74,6),(4,NULL,0.00,0.00,0.00,NULL,0,76,6),(4,NULL,0.00,0.00,0.00,NULL,0,84,6),(4,NULL,0.00,0.00,0.00,NULL,0,85,7);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'test1@gmail.com','$2b$10$bKlJAzUuaDVgK3N2s24J.e4otFGGWDThol.XjLnVvJ8P9jVf2vFvC'),(7,'test3@gmail.com','$2b$10$UJrmPjYCNIpPbeN9XARwSeA83XnxRuOAhfMisotYOrCDhJ1DhKWXW');
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

-- Dump completed on 2020-01-11 21:06:47
