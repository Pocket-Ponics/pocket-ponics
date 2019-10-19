-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: pocketponics
-- ------------------------------------------------------
-- Server version	8.0.18

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
  `token` int(11) NOT NULL,
  `expiration_date` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `adjustments`
--

DROP TABLE IF EXISTS `adjustments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adjustments` (
  `adjustment_type` varchar(45) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `greenhouse_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `tier` int(11) DEFAULT NULL,
  PRIMARY KEY (`adjustment_type`),
  KEY `greenhouse_id` (`greenhouse_id`),
  KEY `user_id` (`user_id`) /*!80000 INVISIBLE */,
  KEY `tier` (`tier`) /*!80000 INVISIBLE */,
  CONSTRAINT `greenhouse_id_fkadj` FOREIGN KEY (`greenhouse_id`) REFERENCES `greenhouse` (`greenhouse_id`),
  CONSTRAINT `tier` FOREIGN KEY (`tier`) REFERENCES `tiers` (`growth_stage`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_fkadj` FOREIGN KEY (`user_id`) REFERENCES `greenhouse` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `greenhouse`
--

DROP TABLE IF EXISTS `greenhouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `greenhouse` (
  `greenhouse_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `water_level` int(11) NOT NULL,
  `nutrient_level` int(11) NOT NULL,
  `battery` tinyint(4) NOT NULL,
  `seedling_time` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`greenhouse_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id_fkg` FOREIGN KEY (`user_id`) REFERENCES `active_sessions` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `historical_data`
--

DROP TABLE IF EXISTS `historical_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historical_data` (
  `date` datetime NOT NULL,
  `greenhouse_id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `water_level` int(11) DEFAULT NULL,
  `nutrient_level` int(11) DEFAULT NULL,
  `battery` tinyint(4) DEFAULT NULL,
  `seedling_time` datetime DEFAULT NULL,
  PRIMARY KEY (`date`),
  KEY `greenhouse_id` (`greenhouse_id`),
  CONSTRAINT `greenhouse_id_fkhd` FOREIGN KEY (`greenhouse_id`) REFERENCES `greenhouse` (`greenhouse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `plant_ideal`
--

DROP TABLE IF EXISTS `plant_ideal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plant_ideal` (
  `plant_id` int(11) NOT NULL,
  `growth_stage` int(11) NOT NULL,
  `ph_level_low` decimal(10,0) NOT NULL,
  `ph_level_high` decimal(10,0) NOT NULL,
  `ec_level_low` decimal(10,0) NOT NULL,
  `ec_level_high` decimal(10,0) NOT NULL,
  `water_level_low` int(11) NOT NULL,
  `water_level_high` int(11) NOT NULL,
  `temp_low` decimal(10,0) NOT NULL,
  `temp_high` decimal(10,0) NOT NULL,
  `cycle_time` time NOT NULL,
  PRIMARY KEY (`growth_stage`,`plant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sensor_grid`
--

DROP TABLE IF EXISTS `sensor_grid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_grid` (
  `serial_no` int(11) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  `greenhouse_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`serial_no`),
  KEY `greenhouse_id` (`greenhouse_id`) /*!80000 INVISIBLE */,
  KEY `user_id` (`user_id`),
  CONSTRAINT `sensor_id_fkgh` FOREIGN KEY (`greenhouse_id`) REFERENCES `greenhouse` (`greenhouse_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sensor_id_fkus` FOREIGN KEY (`user_id`) REFERENCES `greenhouse` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tiers`
--

DROP TABLE IF EXISTS `tiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiers` (
  `tier` int(11) NOT NULL,
  `growth_stage` int(8) NOT NULL,
  `greenhouse_id` int(11) DEFAULT NULL,
  `ph_level` int(11) NOT NULL,
  `ec_level` int(11) NOT NULL,
  `water_level` int(11) NOT NULL,
  `light_level` int(11) NOT NULL,
  `cycle_time` time NOT NULL,
  `temp` decimal(10,2) NOT NULL,
  `num_plants` int(11) NOT NULL,
  `plant_id` int(11) NOT NULL,
  PRIMARY KEY (`growth_stage`,`plant_id`),
  KEY `greenhouse_id` (`greenhouse_id`),
  KEY `tier` (`tier`),
  CONSTRAINT `greenhouse_id_fktr` FOREIGN KEY (`greenhouse_id`) REFERENCES `greenhouse` (`greenhouse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `password_hash_UNIQUE` (`password_hash`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
