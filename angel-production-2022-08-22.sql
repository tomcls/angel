-- MySQL dump 10.17  Distrib 10.3.15-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: angel
-- ------------------------------------------------------
-- Server version	10.3.15-MariaDB-1:10.3.15+maria~xenial-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `doctor_patients`
--

DROP TABLE IF EXISTS `doctor_patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor_patients` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `doctor_id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `doctor_id` (`doctor_id`,`patient_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `doctor_patients_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_patients_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_patients`
--

LOCK TABLES `doctor_patients` WRITE;
/*!40000 ALTER TABLE `doctor_patients` DISABLE KEYS */;
INSERT INTO `doctor_patients` VALUES (5,1,2,'2022-06-25 13:07:45');
/*!40000 ALTER TABLE `doctor_patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctors` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `hospital_id` int(10) DEFAULT NULL,
  `daysin` varchar(100) DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `date_created` (`date_created`),
  KEY `hospital_id` (`hospital_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctors_ibfk_2` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,1,2,'[\"mon\",\"tue\",\"wed\"]','2022-05-28 18:57:45','2022-06-13 20:06:46');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug_descriptions`
--

DROP TABLE IF EXISTS `drug_descriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drug_descriptions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `drug_id` int(10) NOT NULL,
  `lang_id` varchar(2) NOT NULL,
  `description` text DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `drug_id_2` (`drug_id`,`lang_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `drug_descriptions_ibfk_1` FOREIGN KEY (`drug_id`) REFERENCES `drugs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug_descriptions`
--

LOCK TABLES `drug_descriptions` WRITE;
/*!40000 ALTER TABLE `drug_descriptions` DISABLE KEYS */;
INSERT INTO `drug_descriptions` VALUES (1,1,'en','<p>lorem ipsum sit amet aa bb</p>','2022-06-09 15:17:11','2022-06-09 20:10:00'),(5,2,'en','<p><strong>Description in francench</strong></p>','2022-06-09 18:20:59','2022-06-10 23:13:10'),(7,4,'en','<p>Rhina NaturActiv Toux est indiqué pour la toux seche et grasse lorsque celle ci est associée à une infection des voies respiratoires</p>','2022-06-17 13:05:54',NULL);
/*!40000 ALTER TABLE `drug_descriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drugs`
--

DROP TABLE IF EXISTS `drugs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drugs` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `laboratory_id` int(10) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `code` varchar(10) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `date_created` (`date_created`),
  KEY `laboratory_id` (`laboratory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drugs`
--

LOCK TABLES `drugs` WRITE;
/*!40000 ALTER TABLE `drugs` DISABLE KEYS */;
INSERT INTO `drugs` VALUES (1,NULL,'Dafalgan','ASPE','2022-06-09 15:11:10','2022-06-09 20:10:00'),(2,NULL,'Mama natura gastro','naturag','2022-06-09 18:20:59','2022-06-10 23:13:10'),(4,NULL,'Rhina NaturActiv','3462-654','2022-06-17 13:05:54',NULL);
/*!40000 ALTER TABLE `drugs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospitals`
--

DROP TABLE IF EXISTS `hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospitals` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `zip` int(10) DEFAULT NULL,
  `street_number` varchar(15) DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospitals`
--

LOCK TABLES `hospitals` WRITE;
/*!40000 ALTER TABLE `hospitals` DISABLE KEYS */;
INSERT INTO `hospitals` VALUES (1,'Delta Chirec','chirec@itcl.io','+321654987654311','rue delta','Auderghem','belgium',1192,'5','2022-06-10 12:50:00','2022-06-10 10:50:00'),(2,'Sint Peter ','peter@itcl.io','+32165498764','rue de la cambre','Bruxelles','belgium',1190,'56',NULL,'2022-06-13 07:53:26');
/*!40000 ALTER TABLE `hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laboratories`
--

DROP TABLE IF EXISTS `laboratories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `laboratories` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `zip` int(10) DEFAULT NULL,
  `street_number` varchar(15) DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laboratories`
--

LOCK TABLES `laboratories` WRITE;
/*!40000 ALTER TABLE `laboratories` DISABLE KEYS */;
INSERT INTO `laboratories` VALUES (1,'Pfizer','p@itcl.io','+32165498732','rue de pivers','Bruxelles','belgium',1190,'6','2022-06-10 12:49:33','2022-06-10 10:49:33'),(2,'Marie curry','m@itcl.io','+336654987611','rue de la gare du nord','Paris','france',15214,'65',NULL,'2022-06-10 10:51:31');
/*!40000 ALTER TABLE `laboratories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mood_descriptions`
--

DROP TABLE IF EXISTS `mood_descriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mood_descriptions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `mood_id` int(10) NOT NULL,
  `lang_id` varchar(2) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mood_id` (`mood_id`,`lang_id`),
  KEY `survey_id` (`mood_id`),
  CONSTRAINT `mood_descriptions_ibfk_1` FOREIGN KEY (`mood_id`) REFERENCES `moods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mood_descriptions`
--

LOCK TABLES `mood_descriptions` WRITE;
/*!40000 ALTER TABLE `mood_descriptions` DISABLE KEYS */;
INSERT INTO `mood_descriptions` VALUES (1,3,'en','Health','<p>Related to you Mental and physical Situation</p>','2022-06-11 13:41:39','2022-06-11 15:46:39'),(2,4,'fr','Qualité de vie','<p>Votre qualité de vie</p>','2022-06-11 13:42:43','2022-06-11 15:47:34'),(3,3,'nl','Gezondheid','<p>Relatif à votre situation physique et psychologique</p>','2022-06-11 13:43:25','2022-06-11 16:14:09'),(4,4,'en','Life quality','<p>Your quality life description</p>','2022-06-11 13:47:17',NULL),(5,5,'en','Concentration','<p>concentration</p>','2022-06-11 13:48:28',NULL),(6,3,'fr','Santé','<p>Relatif a votre santé</p>','2022-06-11 14:14:41',NULL),(7,5,'fr','Concentration','<p>concentration desc</p>','2022-06-11 14:15:06',NULL),(8,5,'nl','Concentratie','<p>Concentratie</p>','2022-06-11 14:15:16',NULL),(9,6,'fr','Appétit','<p>Appétit desc</p>','2022-06-11 14:51:48',NULL),(10,6,'en','Appetite','<p>Appetite</p>','2022-06-11 14:52:25',NULL),(11,6,'nl','Eetlust','<p>Eetlust</p>','2022-06-11 14:52:51',NULL);
/*!40000 ALTER TABLE `mood_descriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moods`
--

DROP TABLE IF EXISTS `moods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moods` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `date_created` (`date_created`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moods`
--

LOCK TABLES `moods` WRITE;
/*!40000 ALTER TABLE `moods` DISABLE KEYS */;
INSERT INTO `moods` VALUES (3,'2022-06-11 13:40:33','2022-06-11 16:14:41'),(4,'2022-06-11 13:47:17',NULL),(5,'2022-06-11 13:48:28','2022-06-11 16:15:16'),(6,'2022-06-11 14:51:48','2022-06-11 16:52:51');
/*!40000 ALTER TABLE `moods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurse_patients`
--

DROP TABLE IF EXISTS `nurse_patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nurse_patients` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nurse_id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `nurse_id` (`nurse_id`,`patient_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `nurse_patients_ibfk_1` FOREIGN KEY (`nurse_id`) REFERENCES `nurses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nurse_patients_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse_patients`
--

LOCK TABLES `nurse_patients` WRITE;
/*!40000 ALTER TABLE `nurse_patients` DISABLE KEYS */;
INSERT INTO `nurse_patients` VALUES (1,1,8,'2022-05-29 14:18:36');
/*!40000 ALTER TABLE `nurse_patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurses`
--

DROP TABLE IF EXISTS `nurses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nurses` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `hospital_id` int(10) DEFAULT NULL,
  `daysin` varchar(50) DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `nurses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nurses_ibfk_2` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurses`
--

LOCK TABLES `nurses` WRITE;
/*!40000 ALTER TABLE `nurses` DISABLE KEYS */;
INSERT INTO `nurses` VALUES (1,15,1,NULL,'2022-05-28 18:14:11','2022-06-13 13:48:55'),(7,31,1,'[\"mon\",\"tue\",\"wed\",\"thu\",\"fri\",\"sat\",\"sun\"]','2022-07-29 11:37:43','2022-07-29 13:38:49');
/*!40000 ALTER TABLE `nurses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patients` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `emergency_contact_relationship` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `emergency_contact_name` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `emergency_contact_phone` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `close_monitoring` varchar(1) CHARACTER SET utf8mb4 DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `date_created` (`date_created`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,12,'bgfbfgb','bdfgbfgb','fgbfbfg',NULL,'2022-05-20 20:09:31','2022-06-13 19:06:01'),(2,21,'dad','Thomas Claessens','+321654987','Y','2022-05-20 22:20:53',NULL),(8,8,NULL,NULL,NULL,'N','2022-05-20 22:38:26','2022-06-13 19:06:21'),(9,32,'','','','','2022-07-30 13:35:12',NULL);
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scientists`
--

DROP TABLE IF EXISTS `scientists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scientists` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `laboratory_id` int(10) DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `laboratory_id` (`laboratory_id`),
  CONSTRAINT `scientists_ibfk_1` FOREIGN KEY (`laboratory_id`) REFERENCES `laboratories` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `scientists_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scientists`
--

LOCK TABLES `scientists` WRITE;
/*!40000 ALTER TABLE `scientists` DISABLE KEYS */;
INSERT INTO `scientists` VALUES (1,33,1,'2022-07-31 08:20:09',NULL);
/*!40000 ALTER TABLE `scientists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `side_effect_descriptions`
--

DROP TABLE IF EXISTS `side_effect_descriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `side_effect_descriptions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `side_effect_id` int(10) NOT NULL,
  `lang_id` varchar(2) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `side_effect_id` (`side_effect_id`,`lang_id`),
  KEY `survey_id` (`side_effect_id`),
  CONSTRAINT `side_effect_descriptions_ibfk_1` FOREIGN KEY (`side_effect_id`) REFERENCES `side_effects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `side_effect_descriptions`
--

LOCK TABLES `side_effect_descriptions` WRITE;
/*!40000 ALTER TABLE `side_effect_descriptions` DISABLE KEYS */;
INSERT INTO `side_effect_descriptions` VALUES (1,1,'en','Tiredness','<p>you are tired</p>','2022-06-11 12:07:47','2022-06-11 15:00:30'),(2,1,'fr','Fatigue','<p><strong>vous êtes epuise</strong></p>','2022-06-11 12:51:46','2022-06-11 15:05:22'),(3,1,'nl','Vermoeidheid','<p>u bent mou</p>','2022-06-11 13:05:48',NULL),(4,2,'en','Abdominal Gene','<p>Abdominal Gene</p>','2022-06-11 14:22:00','2022-06-11 16:23:53'),(5,2,'fr','Gene abdomidale','<p>Gene abdomidale</p>','2022-06-11 14:22:20','2022-06-11 16:23:13'),(6,2,'nl','Abdominaal gen','<p>Abdominaal gen</p>','2022-06-11 14:22:53',NULL),(7,3,'en','Night sweats','<p>Night sweats desx</p>','2022-06-11 14:24:25','2022-06-11 16:55:17'),(8,3,'fr','Sueurs nocturnes','<p>Sueurs nocturnes</p>','2022-06-11 14:24:49',NULL),(9,3,'nl','Nachtelijk zweten','<p>Nachtelijk zweten desc</p>','2022-06-11 14:24:57','2022-06-11 16:55:42'),(10,4,'en','Concentration issues','<p>Concentration issues</p>','2022-06-11 14:26:29',NULL),(11,4,'fr','Problemes de concentration','<p>Problemes de concentration</p>','2022-06-11 14:27:03',NULL),(12,4,'nl','Concentratie Problemen','<p>concentratie Problemen</p>','2022-06-11 14:27:23',NULL),(13,5,'fr','Innactivité','<p>Innactivité desc</p>','2022-06-11 14:54:12',NULL),(14,5,'nl','Inactiviteit','<p>Inactiviteit desc</p>','2022-06-11 14:54:28','2022-06-11 16:54:28'),(15,5,'en','Innactivity','<p>Innactivity desc</p>','2022-06-11 14:54:43','2022-06-11 16:54:47');
/*!40000 ALTER TABLE `side_effect_descriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `side_effects`
--

DROP TABLE IF EXISTS `side_effects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `side_effects` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `date_created` (`date_created`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `side_effects`
--

LOCK TABLES `side_effects` WRITE;
/*!40000 ALTER TABLE `side_effects` DISABLE KEYS */;
INSERT INTO `side_effects` VALUES (1,'2022-06-11 12:07:47','2022-06-11 15:05:48'),(2,'2022-06-11 14:22:00','2022-06-11 16:23:53'),(3,'2022-06-11 14:24:25','2022-06-11 16:55:42'),(4,'2022-06-11 14:26:29','2022-06-11 16:27:23'),(5,'2022-06-11 14:54:12','2022-06-11 16:54:47');
/*!40000 ALTER TABLE `side_effects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_effects`
--

DROP TABLE IF EXISTS `survey_effects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survey_effects` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) NOT NULL,
  `side_effect_id` int(10) NOT NULL,
  `score` int(1) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `date_created` (`date_created`),
  KEY `patient_id` (`patient_id`),
  KEY `effect_id` (`side_effect_id`),
  KEY `score` (`score`),
  CONSTRAINT `survey_effects_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `survey_effects_ibfk_2` FOREIGN KEY (`side_effect_id`) REFERENCES `side_effects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_effects`
--

LOCK TABLES `survey_effects` WRITE;
/*!40000 ALTER TABLE `survey_effects` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_effects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_moods`
--

DROP TABLE IF EXISTS `survey_moods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survey_moods` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) NOT NULL,
  `mood_id` int(10) NOT NULL,
  `score` int(1) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `date_created` (`date_created`),
  KEY `patient_id` (`patient_id`),
  KEY `mood_id` (`mood_id`),
  KEY `score` (`score`),
  CONSTRAINT `survey_moods_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `survey_moods_ibfk_2` FOREIGN KEY (`mood_id`) REFERENCES `moods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_moods`
--

LOCK TABLES `survey_moods` WRITE;
/*!40000 ALTER TABLE `survey_moods` DISABLE KEYS */;
INSERT INTO `survey_moods` VALUES (1,1,4,4,'2022-06-11 20:48:33',NULL),(2,1,5,3,'2022-06-11 20:48:33',NULL),(7,1,6,4,'2022-06-11 20:49:38',NULL),(8,2,3,3,'2022-06-11 20:50:28',NULL),(9,2,4,5,'2022-06-11 20:53:38',NULL),(10,2,6,2,'2022-06-11 20:52:00',NULL),(11,2,5,2,'2022-06-11 22:13:00',NULL),(12,1,3,1,'2022-06-11 17:26:00',NULL),(13,2,3,3,'2022-06-12 20:50:28',NULL),(14,2,5,2,'2022-06-12 22:13:00',NULL),(15,2,4,2,'2022-06-12 22:13:00',NULL),(16,2,6,2,'2022-06-12 20:52:00',NULL);
/*!40000 ALTER TABLE `survey_moods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_descriptions`
--

DROP TABLE IF EXISTS `treatment_descriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treatment_descriptions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `treatment_id` int(10) NOT NULL,
  `lang_id` varchar(2) NOT NULL,
  `description` text DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `treatment_id` (`treatment_id`),
  KEY `lang_id` (`lang_id`),
  CONSTRAINT `treatment_descriptions_ibfk_1` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_descriptions`
--

LOCK TABLES `treatment_descriptions` WRITE;
/*!40000 ALTER TABLE `treatment_descriptions` DISABLE KEYS */;
INSERT INTO `treatment_descriptions` VALUES (1,1,'en','<p>1.<strong> Drugs to take</strong></p><p>- Dafalgan</p><p>- Vitamin B and E</p><p>2. <strong>Take 1 dafalgan each 6 hours during 2 days</strong></p>','2022-06-10 12:15:42','2022-06-10 23:17:29');
/*!40000 ALTER TABLE `treatment_descriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_drugs`
--

DROP TABLE IF EXISTS `treatment_drugs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treatment_drugs` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `drug_id` int(10) NOT NULL,
  `treatment_id` int(10) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `drug_id_2` (`drug_id`,`treatment_id`),
  KEY `drug_id` (`drug_id`),
  KEY `treatment_id` (`treatment_id`),
  CONSTRAINT `treatment_drugs_ibfk_1` FOREIGN KEY (`drug_id`) REFERENCES `drugs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `treatment_drugs_ibfk_2` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_drugs`
--

LOCK TABLES `treatment_drugs` WRITE;
/*!40000 ALTER TABLE `treatment_drugs` DISABLE KEYS */;
INSERT INTO `treatment_drugs` VALUES (1,1,1,'2022-06-10 15:40:27'),(2,2,1,'2022-06-10 15:41:03'),(3,4,1,'2022-07-13 09:13:05');
/*!40000 ALTER TABLE `treatment_drugs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_patients`
--

DROP TABLE IF EXISTS `treatment_patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treatment_patients` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `treatment_id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `treatment_id_2` (`treatment_id`,`patient_id`),
  KEY `treatment_id` (`treatment_id`),
  KEY `user_id` (`patient_id`),
  CONSTRAINT `treatment_patients_ibfk_1` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `treatment_patients_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_patients`
--

LOCK TABLES `treatment_patients` WRITE;
/*!40000 ALTER TABLE `treatment_patients` DISABLE KEYS */;
INSERT INTO `treatment_patients` VALUES (1,1,8,'2022-06-29 18:31:00','2022-11-30 12:00:00','2022-06-10 16:42:13'),(2,1,2,'2022-06-25 14:24:00','2022-07-31 14:25:00','2022-06-25 12:25:12');
/*!40000 ALTER TABLE `treatment_patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatments`
--

DROP TABLE IF EXISTS `treatments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treatments` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `laboratory_id` int(10) DEFAULT NULL,
  `code` varchar(10) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `laboratory_id` (`laboratory_id`),
  CONSTRAINT `treatments_ibfk_1` FOREIGN KEY (`laboratory_id`) REFERENCES `laboratories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatments`
--

LOCK TABLES `treatments` WRITE;
/*!40000 ALTER TABLE `treatments` DISABLE KEYS */;
INSERT INTO `treatments` VALUES (1,'Headaches',NULL,'HDK','2022-06-10 12:15:42','2022-06-10 23:17:29');
/*!40000 ALTER TABLE `treatments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `role` varchar(1) DEFAULT 'V',
  `lang` varchar(2) DEFAULT 'en',
  `password` varchar(33) NOT NULL,
  `active` varchar(1) NOT NULL DEFAULT 'N',
  `birthday` datetime DEFAULT NULL,
  `sex` varchar(1) DEFAULT 'M',
  `address` varchar(150) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `zip` int(10) DEFAULT NULL,
  `street_number` varchar(15) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `active` (`active`),
  KEY `role` (`role`),
  KEY `date_created` (`date_created`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Hippo','Snow','tomclassius@gmail.com','00324862685987','A','en','6780f707d8c856bc30702012e4057b3f','Y','1971-01-02 02:01:00','M','rue des Brebis','Boisfort','belgium',1070,'67','avatar-1655288006955.png','2022-06-15 12:19:44','2022-06-15 10:19:44'),(8,'Bruce','tom','tom@itcl.io','00324862685987','V','en','6780f707d8c856bc30702012e4057b3f','Y','1983-03-29 09:00:00','M',NULL,NULL,NULL,NULL,NULL,'avatar-1655143398696.png','2022-06-13 20:03:18','2022-06-13 18:03:18'),(9,'jean','smith','jean@itcl.io','00324862685987','V','en','6780f707d8c856bc30702012e4057b3f','N','1992-04-29 09:00:00','M',NULL,NULL,NULL,NULL,NULL,NULL,'2022-05-20 18:55:27','2022-05-08 21:37:59'),(10,'Louise','Debaere','louise@itcl.io','00324862685987','V','en','6780f707d8c856bc30702012e4057b3f','N','1972-03-29 09:00:00','M',NULL,NULL,NULL,NULL,NULL,NULL,'2022-05-20 18:55:27','2022-05-08 21:37:59'),(11,'David','Finch','david@itcl.io','00324862685987','V','en','6780f707d8c856bc30702012e4057b3f','N','1969-03-29 09:00:00','M',NULL,NULL,NULL,NULL,NULL,'avatar-1659270889718.png','2022-07-31 14:34:49','2022-07-31 12:34:49'),(12,'Angelina','Steward','anna@itcl.io','00324862685987','V','de','6780f707d8c856bc30702012e4057b3f','N','1983-03-29 09:59:00','M',NULL,NULL,NULL,NULL,NULL,'avatar-1655143287398.png','2022-06-13 20:01:27','2022-06-13 18:01:27'),(13,'Elena','vangind','elena@itcl.io','00324862685987','V','en','6780f707d8c856bc30702012e4057b3f','N','1984-05-22 09:00:00','M',NULL,NULL,NULL,NULL,NULL,'avatar-1659270765900.jpg','2022-07-31 14:32:45','2022-07-31 12:32:45'),(14,'Edouard','vangind','ed@itcl.io','00324862685987','A','en','6780f707d8c856bc30702012e4057b3f','Y','1986-09-29 09:00:00','M','rue Cuilits','Uccle','belgium',1080,'5','avatar-1659270716278.png','2022-07-31 14:31:56','2022-07-31 12:31:56'),(15,'Thomas','Claessens','tom2@itcl.io','+32654987654','V','fr','6780f707d8c856bc30702012e4057b3f','Y','1983-03-29 09:00:00','M','rue des allies ','Bruxelles','luxembourg',1190,'201/b','avatar-1655142203776.png','2022-06-13 19:43:23','2022-06-13 17:43:23'),(21,'Mila','Claessens','mila@itcl.io','+321654987','V','fr','7b2e2f81d41aeb97b8c3a32213ca8fcb','N','2016-08-15 23:00:00','F',NULL,NULL,NULL,NULL,NULL,'avatar-1655139838317.png','2022-06-13 19:03:58','2022-06-13 17:03:58'),(31,'Terasa','Mother','info@paradize.be','+32486258756','V','it','7b2e2f81d41aeb97b8c3a32213ca8fcb','Y','1934-07-29 13:36:00','F','rue de la joie ','Roma','italie',6265,'34','avatar-1659094723627.png','2022-07-29 13:38:49','2022-07-29 11:38:49'),(32,'Eliott','Claessens','eliott@itcl.io','+32486268598','V','fr','7b2e2f81d41aeb97b8c3a32213ca8fcb','Y','2020-12-02 23:00:00','M','chaussée de Charleroi','Brussels','belgium',1060,'224','avatar-1659188218860.png','2022-07-30 15:36:58','2022-07-30 13:36:58'),(33,'Albert','Einstein','al@itcl.io','+321654987','V','fr','7b2e2f81d41aeb97b8c3a32213ca8fcb','N','1909-07-31 11:55:00','M','rue de l\'alchimie','Brussels','belgium',1060,'25','avatar-1659261793656.jpeg','2022-07-31 12:03:13','2022-07-31 10:03:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-22 13:08:33
