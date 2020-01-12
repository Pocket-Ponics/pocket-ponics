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
INSERT INTO `active_sessions` VALUES ('+9/Z2dUP3kxaW7HBYzKJnzLVCz7vW46NZvHonkBMTs0=','2020-01-12 20:25:29',7),('+ZwDc7xBjeqeokpinwwbD/fjuzvHDIARMTLjB1BiYEw=','2020-01-12 17:16:47',7),('/loitGLFoKo7ii+iKOPWMrfUqQ7LOY295wlFTlHJyMo=','2020-01-12 03:12:12',7),('0/5DTi2ADR8HJre2SR65NdWlXRmSKmWBAw4Czz79cAY=','2020-01-12 20:41:55',7),('0v0oQ80Rbwfg+TGxBrtwzmVGH8owy42xyPKCZJDXZ6Y=','2020-01-12 20:42:12',7),('1KM192YEO1JV7GYJAF90//mu7YL8xlWnkUGgwm5wApQ=','2020-01-12 17:28:24',7),('27S4LBImP9w8U8rPzt7s8pUnJMKQb6EDaxgHWMAuJ98=','2020-01-12 17:26:30',7),('35fj8lVvIo7TzbYGt1oJ6gBs/VJ2oI6cvIzX3CcCqNM=','2020-01-12 17:01:21',7),('3a7jJxPXp6HuBiHMUT9+gOOkn+5fTwGD5SNc2U5et1M=','2020-01-12 17:14:05',7),('3QPDfn6ACVy9OOxNMqb3NShyDMJEvP8zof83rV7a9xc=','2020-01-12 17:45:51',7),('3SypWjRZJ+W/r8VRMO0OX5f1eUAFp3mvci4oFDxF8fY=','2020-01-12 17:27:12',7),('3VvIabgh6zCV2JPfnjsZ7VUpVpp9PrK3iCvuWn3OJJY=','2020-01-12 17:23:17',7),('4HscyfBoaE96Svx+XhAvbXwM3+ssXW2mFUhglJLHfHQ=','2020-01-12 03:11:03',7),('6/1+Q9e7/XLlcL1G/dl6XYSEKdhBZkqANVRfUlnXUt4=','2020-01-12 16:47:14',7),('6/OywQlMD97zzysSKR3odkXKt3g32k8hmJkBWkGva78=','2020-01-12 17:47:14',7),('6g0C+xCAIiquXBGqllAUsco1mG9D+bhbljsBY9nM3eI=','2020-01-12 03:12:15',7),('7DbY9CckMxHa/9XlG7nFAWX/XvxdzbTCWxsGeD+mpHA=','2020-01-12 17:24:43',7),('7iQ6aFZXN2R+OwzJxgQ5ijG7jNwltBD5SGVZwUaEbb4=','2020-01-12 17:22:20',7),('8/ZcSs7QnHFJ/b+q3DBbQKCFVRXm9Gq622fewiitllY=','2020-01-12 02:43:58',7),('a/NM1WsxHd9OEjgzfETuvpfQ6zC2qbFygYmzSdDHXTA=','2020-01-12 17:17:21',7),('A0g5f1Hi1632Hh+OO2CG8lBaCmCvnboI6NKv2LoNc8c=','2020-01-12 17:35:19',7),('aAz1TO09H88SvV7+JQDNTZlZOuIxs4NKmDQIedwbfs0=','2020-01-12 02:51:13',7),('aIEoeuLsS9gq+nl7UrXNXHGw50bpcy+axaKc8zZB5DE=','2020-01-12 02:41:40',6),('bbalkUrK/nL8Q7YLsibXo9IHIlUV1i9JC2O6IGMa5GU=','2020-01-12 03:30:01',7),('BCKBU8Afnl5rzkvzw4xBtChkFM12beD/rjl0UTtD228=','2020-01-12 03:28:47',7),('Bi7EENYN6ry0MRx325xMxJ64FZ7xhKJYhN3EjvWv1wU=','2020-01-12 17:13:22',7),('bOHlSX7uyoby7+y975OYo9kJznQyvYHQhs5tBKrtzI8=','2020-01-12 17:35:57',7),('BUpp9FC3C9b/cQF7cOJ/SE39LmNppvW8qxcmC73fxjM=','2020-01-12 19:10:11',10),('C5nLRSq9stywgIyuWp52pFDtmlSJyC7UGuLmMDkvoA4=','2020-01-12 03:15:00',7),('c7jWJCVypALQVDWeKh5nLSbL91+S/tvcDH3mlqjBWrE=','2020-01-12 16:53:21',7),('cjVFlIwhF1mHc1gKoG+t11piXCz4BVLj16tjY38GceY=','2020-01-12 17:02:21',7),('d1iWCo5Fvnx/w770yNnkMA5714vbpHMGC9WSQCY11Zg=','2020-01-12 17:41:28',7),('dCzRBMPiBPLZ7eQLt2oYQxP/2PG0WM1Ib94cb85CeU4=','2020-01-12 17:41:02',7),('dl2U7EIbXiCJzcFXImlZO1nNML5g0vpocP7t61EO7nQ=','2020-01-12 18:01:20',7),('DLp+d/0+9CGJFNrW3Kmb+Pg3Xfxdmq8prgGJvv3c+zA=','2020-01-12 16:57:36',6),('EAIhkFvDNrlSiVL6w/Aes5cXotWREUWWjXpW1vvmC0s=','2020-01-12 17:26:35',7),('efNQuCVB3iQlMV1Il6/1opkmpHFIzbAUvZlqYw5h+18=','2020-01-12 18:09:32',7),('EftIxslZ1lmviMHjpPwzuFV9cZj0qG50bKCKo4RTAsw=','2020-01-12 20:25:37',7),('F8t97vol78Sl27Qe9zpMxANH4e3JfX+zD1wkuyXjOP8=','2020-01-12 03:03:53',7),('FsdLqSK4618dOZwVoEFuf+mJs6JYNGz6s/guHVtNAQY=','2020-01-12 17:34:55',7),('G4I3+81uwjV3EED4HIE6FaJHmr3J+BP6+rx7sCyPCws=','2020-01-12 03:41:03',7),('GcBhuHZ01u3IC4TpIpGY4or9GklBfxMWHTZUr9XfR4o=','2020-01-12 03:32:04',7),('gUEvtbPcYeujCYtNz4oKohaniKdsYUuzsLcTNza77B8=','2020-01-12 17:40:13',7),('GYSy3QEU5bREIhvoyp9w1zp7S8uMcjGN4DB7J4ucJhw=','2020-01-12 17:15:07',7),('HBeOmcp6tZ0tBQB+E4piefME46CyyWjG9O4OoFI1Q3c=','2020-01-12 20:42:44',7),('heenZKTsRYP4pWSCUWXMLA6uI7/mcSgXHJqu2lrVGG0=','2020-01-12 17:41:41',7),('HlvoDB8IGMMdbNa9IqW9wBQAG95lRdk4aJtpjxZb1S4=','2020-01-12 17:46:58',7),('hRI3zWR1QFFgCWODXSFK6A/lto8aKj6NMPJR3p8fDec=','2020-01-12 17:15:37',7),('HsCtfR1an8M+mtq0gvw4PfHiEvRz8eGxWf6m4AQnIwU=','2020-01-12 17:46:30',7),('hWbqiVcFS0+AeE6obMausokGEZ81mC5UV41+TqZEnJM=','2020-01-12 17:25:50',7),('hz6kXl3eGm/1o8256migGuClqW0mYgxnteOUpQR472Q=','2020-01-12 17:06:24',7),('ibLXf3cC/n1W3lzKSjoVVHqxznE+iOr4aYx5G9G2K+k=','2020-01-12 17:37:25',7),('iemRXws/3riWRaPPpKFjxkhWw80eitc8bGw6AGeRDS4=','2020-01-12 17:43:13',7),('IfTj5H3Bd3Yxv4N5peAtjag4J7NeB7kg/6c48lQB5eg=','2020-01-12 20:43:50',7),('IVjhQ2KkMDFbnz/V7VDkDTsUuXxH6KVm6KCfQ5n44v4=','2020-01-12 02:25:54',7),('jEoc4bZKE9wUjQXyBJ0u1PRoOvhwqZBjv4dFfprFhXM=','2020-01-12 17:41:09',7),('L0D1q9NVGIeX0O7q8dVBVH9J3SlMX/+m6Pe4+BjT8hg=','2020-01-12 17:43:28',7),('Lb4u15gf69SYb7mMn1lZetlyldyo27y0cQGfey7KzqY=','2020-01-12 17:43:42',7),('LMYYJMEvia5GIMka2l46g2j6FDDJi3QUf1fZMv9IcN0=','2020-01-12 02:52:15',7),('LxoGyw6k9/+wXCTLWtKdUMbHb76ffZK9R6MIyo6ONuI=','2020-01-12 18:01:12',7),('LYoUZ0rCWOHUhrmc+OIBbYtaSuzae75v/B10zzU70+s=','2020-01-12 17:17:44',7),('MniyKhZ1cto3DdWOx2zuqFyGED1LNmLF4yevmuY99dE=','2020-01-12 19:52:40',13),('mnovuafB32+BX8Kn/oyFLLT3H28mLsdEIcxuTxrHO1k=','2020-01-12 20:06:11',12),('mzAmOdzMkBdZrooiHRTGUsXGf5SmpijlZREWxZkbUIg=','2020-01-12 19:02:26',7),('Niak2WxFKudfbaH4ME8KMjoetUQyaL9o2JmI/uiFHx8=','2020-01-12 20:24:59',7),('NjHZ9qoswMNmVatC7Tan9eypoxLG1JDUUhdKMj7PrTM=','2020-01-12 17:43:33',7),('o1TMt8RsziNv8kl3rOqiSemPclO3os6ugfHO9+um6QY=','2020-01-12 17:42:18',7),('O7EElxBYuh2gB2+ipAjZ8Jk9cpmTxz2uJZPkC3aUXtQ=','2020-01-12 17:42:49',7),('o8evKDf4UAbZSlhpsV/kZnEgtofyHW9EHVYGj5B7aAg=','2020-01-12 17:30:33',7),('OqQy6TtK7AR1UFtysx54OBlHOPkiWiWw31Q8UX8aFvs=','2020-01-12 17:44:29',7),('OwbBL+E6VI4FJq/xT3KGTyWC0GE7RAn6Sg9CuIQEuqk=','2020-01-12 20:24:20',7),('PQWg3TjyDVF2iIWrofq0+7yTzfe+l6yJQPcNen8ry9U=','2020-01-12 17:44:17',7),('PXDu+sJ1x782RFggYyjCkXnW/nX52tUJKTZbszFAxjE=','2020-01-12 17:24:21',7),('Pxx5hNZEXRmy5hCxwtIB//IqbgKcBPtuqB5krnfUowA=','2020-01-12 17:21:26',7),('QqFbbgDfFH6m4X0dBG4tFd5pk3zbiLZZWFimmRSit/Y=','2020-01-12 20:56:34',7),('qtJ1WTgxpRtgBXQ6AzOW6zuKaOsP/XPKrMWJobeSALY=','2020-01-12 02:49:53',7),('qvtUW9MxBw/u1vLphWgxslNfb+m26eurULIz4dA4yBA=','2020-01-12 17:48:03',7),('r+HFc1YUAejsZ2zuC7rCY+IYAerKuCtYkR1CYG0GOwY=','2020-01-12 17:57:30',7),('rkrxFiogjobUpYq6wHFBtojypFKYbzmmsljJH2sxxWs=','2020-01-12 17:33:20',7),('RSU749a7/1o/hf5TJMBfPUO8CxllIRPftPI8XLRltC0=','2020-01-12 20:42:38',7),('s6Kaa2DPPMK5ahK+h1M0yDxXEmYui5+VpAylvyXgYfA=','2020-01-12 02:24:24',7),('S7yz3F/RSWuo/O1TyYzbe0LzsH5WGepycfW6R8f+BZo=','2020-01-12 17:04:59',7),('SKU2ZUj6ylDRqS8u+0v+cLEm9WHRYDC5ij9c1uTOvdo=','2020-01-12 17:06:48',7),('SPUyJHX9q0/nABZgX0l8dWU5rZzUFP4GoDNn5IlVRNc=','2020-01-12 17:37:35',7),('stVtFGi+YWIDpfTRWMeW5Vt/QI1YxUqngwWxFacCaAk=','2020-01-12 17:00:51',7),('uA7/z16VQ3685RV2jlNxC7qKafM4v9cCuN7yfdFkkng=','2020-01-12 17:03:53',7),('UHEgK+ybZS42VDXoNYd4gVNM/aRSQUezHRpaqBq9Ltk=','2020-01-12 17:14:36',7),('UQNlj7e8DGeF20h9OucNtypxrVgegrtXRVndW0lYm3g=','2020-01-12 17:37:30',7),('vCfWaBxQ90ndOqx/sC8lAxXrc3of0cxRNq2/30TO8dQ=','2020-01-12 17:30:48',7),('Vfs8Xrd0U80DErxO4aCNyyumpXnK/TeIG5b32JM4pYM=','2020-01-12 20:14:28',14),('viHIVoyKmdvh6Xn2gQ5bMjH55DWAtoWUJY1f+muUFFU=','2020-01-12 19:51:46',13),('Vu4sZua6ra8cSIuHKx0A+EfeL6mNajbkmLAfBLnGWc0=','2020-01-12 03:13:39',7),('x1BMaDCrpjNyJNiWKHkhpCXQY1gNjiBfbHF/GbZ6UT0=','2020-01-12 17:29:31',7),('XK3TjL36Fkzt0+YJHC6IRbbTBgcTaAQZ19UHzh3o4sE=','2020-01-12 03:06:59',7),('XojgLLfJvblIEP9CVLpxACvb5x8HoJjvsdbweUTkDxA=','2020-01-12 02:21:34',6),('XXBPdfrdy9I8FqeAE5Oy1E+93+gLdlyIe01IXo15j9w=','2020-01-12 02:51:24',7),('yFnhJWAI7n9q4jX5UvkiIfYRwCQPeeGqXn4Arjfu7jc=','2020-01-12 20:03:54',10),('yMyGFNvO4k3kMLbnIJFfHLByrLIXeRvckWVHMWZhQeM=','2020-01-12 03:02:12',7),('YrVlA+aq6aKOGXcc/B0sHJE8HDsmCdyDc5LhE3QjgOM=','2020-01-12 17:48:22',7),('Yyfd1YDr9CfZiULvx08ROLB7zY7dtnKDJZVBsYZrWr8=','2020-01-12 17:57:49',7),('Z+JNnIMxqxnaGETBc0JO+qXwv33McqSG1XpOcVp84Us=','2020-01-12 17:47:33',7),('z2owD+hJWN6BXJ3VYG0Rzsbf4YJrtwuL0M/WXm4Sw0A=','2020-01-12 17:43:38',7),('ZihMvZFrIfziO4enVlhPhK/1aqM3o6QtuGUDfwB589g=','2020-01-12 03:27:45',7),('ZkLOzjYdJdOstYx48C/KfCV45Ex4zPNywbN5Q6I+ILA=','2020-01-12 03:10:52',7),('ZrRzjaNGdAGHSVOm6AVTQzMYc9zgYB4iCXtywuFOo4k=','2020-01-12 20:43:09',7),('ZtzDM6R9PHY6i9aXOJzQAxsyJkCVnVxRq6cTyxVuXZ8=','2020-01-12 02:38:15',7);
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
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'test1@gmail.com','$2b$10$bKlJAzUuaDVgK3N2s24J.e4otFGGWDThol.XjLnVvJ8P9jVf2vFvC'),(7,'test3@gmail.com','$2b$10$UJrmPjYCNIpPbeN9XARwSeA83XnxRuOAhfMisotYOrCDhJ1DhKWXW'),(8,'test4@gmail.com','$2b$10$8AmRyi12JCsSeBiT521kEOkcChvRfeWSvq2N8GGwNxymi4Rw39Ima'),(10,'demouser@gmail.com','$2b$10$5MVQi20FUDTzKVuc5jfwJO1ZkOCx0CTVhbka8JDkEATSNymraaRVG'),(11,'undefined','$2b$10$4NdivfssgseKM99MCMxIv.UQe32XtNoQTlty546Os1m9cWVygQnl6'),(12,'demouser','$2b$10$t8X3vlSjEEKpt1CBJrk4A.mWx6gAtJFcZD4Isqw28YtmXrt3b6N66'),(13,'banana','$2b$10$pD/kxYoHZRram54wTWUSrOhdQKXcFU7Ov087AVyeUv2aXosSKc63.'),(14,'test5@gmail.com','$2b$10$2/UQgrax426gNVRCVWM0X.aUIeyn8ZfcTYEs4OsMPH8lrtjFphQ7.');
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

-- Dump completed on 2020-01-12 15:27:55
