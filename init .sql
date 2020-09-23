-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 14, 2020 at 01:03 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `codecoolerbook`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `user_profile_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `image_id` int(11) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `friends_list`
--

CREATE TABLE `friends_list` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `status` int(10) NOT NULL DEFAULT 3,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friends_list`
--

INSERT INTO `friends_list` (`id`, `sender_id`, `receiver_id`, `status`, `deleted`) VALUES
(1, 1, 12, 1, 0),
(2, 1, 4, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `friend_status`
--

CREATE TABLE `friend_status` (
  `id` int(11) NOT NULL,
  `status` varchar(63) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friend_status`
--

INSERT INTO `friend_status` (`id`, `status`) VALUES
(1, 'Accepted'),
(2, 'Pending'),
(3, 'None'),
(4, 'Deleted');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(255) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `user_profile_id` int(11) DEFAULT NULL,
  `path` varchar(255) NOT NULL DEFAULT 'no-user.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `post_id`, `comment_id`, `user_profile_id`, `path`) VALUES
(1, NULL, NULL, 1, '1.jpg'),
(2, NULL, NULL, 2, '2.jpg'),
(3, NULL, NULL, 3, '3.jpg'),
(4, NULL, NULL, 4, '4.jpg'),
(5, NULL, NULL, 5, '5.jpg'),
(6, NULL, NULL, 6, '6.jpg'),
(7, NULL, NULL, 7, '7.jpg'),
(8, NULL, NULL, 8, '8.jpg'),
(9, NULL, NULL, 9, '9.jpg'),
(10, NULL, NULL, 10, '10.jpg'),
(11, NULL, NULL, 11, '11.jpg'),
(12, NULL, NULL, 12, '12.jpg'),
(13, NULL, NULL, 13, '13.jpg'),
(14, NULL, NULL, 14, '14.jpg'),
(15, NULL, NULL, 15, '15.jpg'),
(16, NULL, NULL, 16, '16.jpg'),
(17, NULL, NULL, 17, '17.jpg'),
(18, NULL, NULL, 18, '18.jpg'),
(19, NULL, NULL, 19, '19.jpg'),
(20, NULL, NULL, 20, '20.jpg'),
(21, NULL, NULL, 21, '21.jpg'),
(22, NULL, NULL, 22, '22.jpg'),
(23, NULL, NULL, 23, '23.jpg'),
(24, NULL, NULL, 24, '24.jpg'),
(25, NULL, NULL, 25, '25.jpg'),
(26, NULL, NULL, 26, '26.jpg'),
(27, NULL, NULL, 27, '27.jpg'),
(28, NULL, NULL, 28, '28.jpg'),
(29, NULL, NULL, 29, '29.jpg'),
(30, NULL, NULL, 30, '30.jpg'),
(31, NULL, NULL, 31, '31.jpg'),
(32, NULL, NULL, 32, '32.jpg'),
(33, NULL, NULL, 33, '33.jpg'),
(34, NULL, NULL, 34, '34.jpg'),
(35, NULL, NULL, 35, '35.jpg'),
(36, NULL, NULL, 36, '36.jpg'),
(37, NULL, NULL, 37, '37.jpg'),
(38, NULL, NULL, 38, '38.jpg'),
(39, NULL, NULL, 39, '39.jpg'),
(40, NULL, NULL, 40, '40.jpg'),
(41, NULL, NULL, 41, '41.jpg'),
(42, NULL, NULL, 42, '42.jpg'),
(43, NULL, NULL, 43, '43.jpg'),
(44, NULL, NULL, 44, '44.jpg'),
(45, NULL, NULL, 45, '45.jpg'),
(46, NULL, NULL, 46, '46.jpg'),
(47, NULL, NULL, 47, '47.jpg'),
(48, NULL, NULL, 48, '48.jpg'),
(49, NULL, NULL, 49, '49.jpg'),
(50, NULL, NULL, 50, '50.jpg'),
(51, NULL, NULL, 51, '51.jpg'),
(52, NULL, NULL, 52, '52.jpg'),
(53, NULL, NULL, 53, '53.jpg'),
(54, NULL, NULL, 54, '54.jpg'),
(55, NULL, NULL, 55, '55.jpg'),
(56, NULL, NULL, 56, '56.jpg'),
(57, NULL, NULL, 57, '57.jpg'),
(58, NULL, NULL, 58, '58.jpg'),
(59, NULL, NULL, 59, '59.jpg'),
(60, NULL, NULL, 60, '60.jpg'),
(100, NULL, NULL, NULL, 'no-user.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `creator_profile_id` int(11) NOT NULL,
  `target_profile_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `image_id` int(11) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `creator_profile_id`, `target_profile_id`, `message`, `image_id`, `deleted`) VALUES
(1, 109, 109, 'aaa', 6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `email` varchar(127) NOT NULL,
  `password` varchar(255) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `deleted`) VALUES
(1, 'reuben92@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(2, 'gavin.cartwright@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(3, 'anjali.krajcik@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(4, 'kuhn.jerrell@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(5, 'xstreich@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(6, 'owintheiser@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(7, 'owiegand@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(8, 'tcrona@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(9, 'jaren23@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(10, 'qkohler@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(11, 'runolfsson.nicklaus@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(12, 'bruecker@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(13, 'sandrine80@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(14, 'hhermann@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(15, 'rosa40@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(16, 'roxane13@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(17, 'torphy.isadore@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(18, 'johnston.anika@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(19, 'ansley.rohan@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(20, 'collins.destiney@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(21, 'hreynolds@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(22, 'tabitha05@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(23, 'block.jordane@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(24, 'braun.frida@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(25, 'ksatterfield@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(26, 'karelle.conroy@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(27, 'stephen73@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(28, 'gust35@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(29, 'vonrueden.derick@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(30, 'vivienne.gulgowski@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(31, 'elda09@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(32, 'mireya50@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(33, 'alexanne15@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(34, 'sboyer@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(35, 'danika30@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(36, 'yost.johnpaul@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(37, 'monty.ledner@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(38, 'desiree85@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(39, 'crist.haven@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(40, 'hammes.iva@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(41, 'fmoore@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(42, 'smraz@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(43, 'michel.ullrich@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(44, 'gonzalo52@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(45, 'brannon.kautzer@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(46, 'leanna49@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(47, 'liliane.dickens@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(48, 'sipes.elton@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(49, 'reynolds.karlie@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(50, 'frutherford@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(51, 'nathen08@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(52, 'garrison.bradtke@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(53, 'wlarson@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(54, 'llubowitz@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(55, 'shanahan.arlene@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(56, 'schimmel.blaise@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(57, 'nparker@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(58, 'dallin.nienow@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(59, 'alejandrin.wilkinson@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(60, 'nicholaus.harris@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(61, 'haylie.hammes@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(62, 'kimberly.homenick@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(63, 'runolfsson.abdul@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(64, 'paula85@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(65, 'farrell.crawford@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(66, 'johnston.willy@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(67, 'kmccullough@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(68, 'abigail.kassulke@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(69, 'marianna.russel@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(70, 'rylan86@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(71, 'yo\'reilly@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(72, 'rashawn.farrell@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(73, 'mayert.tierra@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(74, 'jose49@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(75, 'elena.skiles@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(76, 'ike.bernhard@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(77, 'akessler@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(78, 'wbruen@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(79, 'treutel.lon@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(80, 'lourdes22@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(81, 'luna78@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(82, 'scarlett.vandervort@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(83, 'percy68@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(84, 'hilda.trantow@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(85, 'mary74@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(86, 'grady41@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(87, 'rmante@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(88, 'jonas57@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(89, 'jadyn10@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(90, 'robbie27@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(91, 'oliver37@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(92, 'upredovic@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(93, 'wquigley@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(94, 'brown.ericka@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(95, 'colby20@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(96, 'penelope.fadel@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(97, 'fahey.elda@example.org', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(98, 'fleffler@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(99, 'jvon@example.net', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0),
(100, 'general.brown@example.com', '$2y$12$4ctENKSpCnBNEpvLb74pbO5UM3p2sSSXhPZTOB3lvOzVpcZvwVv2e', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `image_id` int(255) NOT NULL DEFAULT 100,
  `hobby` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `workplace` varchar(255) DEFAULT NULL,
  `studies` varchar(255) DEFAULT NULL,
  `main_profile` tinyint(1) NOT NULL DEFAULT 1,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`id`, `user_id`, `first_name`, `last_name`, `country`, `city`, `image_id`, `hobby`, `birthdate`, `workplace`, `studies`, `main_profile`, `deleted`) VALUES
(1, 1, 'Meta', 'Pollich', 'Singapore', 'Brennaview', 1, NULL, '1990-01-01', NULL, NULL, 1, 0),
(2, 2, 'Sheridan', 'Becker', 'Senegal', 'Adalinechester', 2, NULL, '1990-01-01', NULL, NULL, 1, 0),
(3, 3, 'Maxie', 'Hermann', 'Senegal', 'Taureanburgh', 3, NULL, '1990-01-01', NULL, NULL, 1, 0),
(4, 4, 'Bill', 'West', 'Jordan', 'New Korbinland', 4, NULL, '1990-01-01', NULL, NULL, 1, 0),
(5, 5, 'Jonas', 'Aufderhar', 'Gabon', 'East Deja', 5, NULL, '1990-01-01', NULL, NULL, 1, 0),
(6, 6, 'Mona', 'Ryan', 'Cuba', 'Lake Raeland', 6, NULL, '1990-01-01', NULL, NULL, 1, 0),
(7, 7, 'Wilfrid', 'Torphy', 'United States of America', 'South Kathleen', 7, NULL, '1990-01-01', NULL, NULL, 1, 0),
(8, 8, 'Virginie', 'Gibson', 'Micronesia', 'Buckridgebury', 8, NULL, '1990-01-01', NULL, NULL, 1, 0),
(9, 9, 'Shaun', 'Raynor', 'Uzbekistan', 'Lake Alfonzobury', 9, NULL, '1990-01-01', NULL, NULL, 1, 0),
(10, 10, 'Verner', 'Will', 'Sri Lanka', 'West Donny', 10, NULL, '1990-01-01', NULL, NULL, 1, 0),
(11, 11, 'Erling', 'Ondricka', 'Somalia', 'Eloisatown', 11, NULL, '1990-01-01', NULL, NULL, 1, 0),
(12, 12, 'Marie', 'Kihn', 'Saint Vincent and the Grenadines', 'Lake Orinmouth', 12, NULL, '1990-01-01', NULL, NULL, 1, 0),
(13, 13, 'America', 'Torphy', 'Finland', 'Port Emiliano', 13, NULL, '1990-01-01', NULL, NULL, 1, 0),
(14, 14, 'Alexanne', 'Smitham', 'Northern Mariana Islands', 'Yundtborough', 14, NULL, '1990-01-01', NULL, NULL, 1, 0),
(15, 15, 'Helmer', 'Watsica', 'Andorra', 'Elainaside', 15, NULL, '1990-01-01', NULL, NULL, 1, 0),
(16, 16, 'Vito', 'Runolfsdottir', 'Vietnam', 'Talonstad', 16, NULL, '1990-01-01', NULL, NULL, 1, 0),
(17, 17, 'Aisha', 'Funk', 'Bolivia', 'Halvorsonside', 17, NULL, '1990-01-01', NULL, NULL, 1, 0),
(18, 18, 'Gerard', 'Altenwerth', 'Vanuatu', 'Damianside', 18, NULL, '1990-01-01', NULL, NULL, 1, 0),
(19, 19, 'Thurman', 'Kozey', 'Greenland', 'East Josie', 19, NULL, '1990-01-01', NULL, NULL, 1, 0),
(20, 20, 'Fernando', 'Feest', 'Trinidad and Tobago', 'New Joaquinside', 20, NULL, '1990-01-01', NULL, NULL, 1, 0),
(21, 21, 'Garnet', 'Stokes', 'Jordan', 'Lilyborough', 21, NULL, '1990-01-01', NULL, NULL, 1, 0),
(22, 22, 'Jamaal', 'Ledner', 'Puerto Rico', 'Port Laurianefurt', 22, NULL, '1990-01-01', NULL, NULL, 1, 0),
(23, 23, 'Zaria', 'Sporer', 'Venezuela', 'Port Bertaville', 23, NULL, '1990-01-01', NULL, NULL, 1, 0),
(24, 24, 'Freeda', 'Tromp', 'Uruguay', 'West Saraitown', 24, NULL, '1990-01-01', NULL, NULL, 1, 0),
(25, 25, 'Donato', 'Witting', 'Georgia', 'Lavernport', 25, NULL, '1990-01-01', NULL, NULL, 1, 0),
(26, 26, 'Clifford', 'Schroeder', 'Morocco', 'Vinnieton', 26, NULL, '1990-01-01', NULL, NULL, 1, 0),
(27, 27, 'General', 'Dach', 'Ecuador', 'Connhaven', 27, NULL, '1990-01-01', NULL, NULL, 1, 0),
(28, 28, 'Andy', 'Torp', 'Iraq', 'Lake Tianna', 28, NULL, '1990-01-01', NULL, NULL, 1, 0),
(29, 29, 'Eunice', 'Weimann', 'Tokelau', 'Port Kacietown', 29, NULL, '1990-01-01', NULL, NULL, 1, 0),
(30, 30, 'Frederic', 'Wehner', 'Eritrea', 'Lake Eviemouth', 30, NULL, '1990-01-01', NULL, NULL, 1, 0),
(31, 31, 'Eden', 'Mraz', 'Namibia', 'North Marta', 31, NULL, '1990-01-01', NULL, NULL, 1, 0),
(32, 32, 'Vickie', 'Kreiger', 'Brunei Darussalam', 'Kuhichaven', 32, NULL, '1990-01-01', NULL, NULL, 1, 0),
(33, 33, 'Christa', 'Moore', 'Slovenia', 'Hegmannstad', 33, NULL, '1990-01-01', NULL, NULL, 1, 0),
(34, 34, 'Maegan', 'Yost', 'Grenada', 'Walkertown', 34, NULL, '1990-01-01', NULL, NULL, 1, 0),
(35, 35, 'Otis', 'Runolfsdottir', 'Greece', 'Alexmouth', 35, NULL, '1990-01-01', NULL, NULL, 1, 0),
(36, 36, 'Krista', 'Lakin', 'Saint Martin', 'Lake Michele', 36, NULL, '1990-01-01', NULL, NULL, 1, 0),
(37, 37, 'Keyshawn', 'Rowe', 'Tunisia', 'New Brown', 37, NULL, '1990-01-01', NULL, NULL, 1, 0),
(38, 38, 'Chester', 'Stanton', 'Yemen', 'Port Everardobury', 38, NULL, '1990-01-01', NULL, NULL, 1, 0),
(39, 39, 'Enid', 'Hagenes', 'Palestinian Territory', 'Dickensfort', 39, NULL, '1990-01-01', NULL, NULL, 1, 0),
(40, 40, 'Christophe', 'Welch', 'Cote d\'Ivoire', 'Port Maziemouth', 40, NULL, '1990-01-01', NULL, NULL, 1, 0),
(41, 41, 'Oleta', 'Emard', 'Belgium', 'Ondrickaport', 41, NULL, '1990-01-01', NULL, NULL, 1, 0),
(42, 42, 'Beth', 'Mohr', 'Indonesia', 'Lake Shirleyfurt', 42, NULL, '1990-01-01', NULL, NULL, 1, 0),
(43, 43, 'Trycia', 'Roberts', 'Qatar', 'North Alexandreaport', 43, NULL, '1990-01-01', NULL, NULL, 1, 0),
(44, 44, 'Tre', 'Beer', 'Japan', 'Dessieshire', 44, NULL, '1990-01-01', NULL, NULL, 1, 0),
(45, 45, 'Leonardo', 'Christiansen', 'Haiti', 'Townefurt', 45, NULL, '1990-01-01', NULL, NULL, 1, 0),
(46, 46, 'Ayden', 'Hayes', 'French Guiana', 'Williamsonfurt', 46, NULL, '1990-01-01', NULL, NULL, 1, 0),
(47, 47, 'Shanelle', 'Smith', 'Guyana', 'Lakinbury', 47, NULL, '1990-01-01', NULL, NULL, 1, 0),
(48, 48, 'Destany', 'Eichmann', 'Cambodia', 'Boyerview', 48, NULL, '1990-01-01', NULL, NULL, 1, 0),
(49, 49, 'Roselyn', 'Kunde', 'Slovenia', 'East Ernieshire', 49, NULL, '1990-01-01', NULL, NULL, 1, 0),
(50, 50, 'Lourdes', 'Kovacek', 'Botswana', 'Balistreriland', 50, NULL, '1990-01-01', NULL, NULL, 1, 0),
(51, 51, 'Winnifred', 'Morissette', 'Timor-Leste', 'Lake Albert', 51, NULL, '1990-01-01', NULL, NULL, 1, 0),
(52, 52, 'Darrel', 'Kreiger', 'Sweden', 'Botsfordton', 52, NULL, '1990-01-01', NULL, NULL, 1, 0),
(53, 53, 'Bernardo', 'Schultz', 'Eritrea', 'North Garettmouth', 53, NULL, '1990-01-01', NULL, NULL, 1, 0),
(54, 54, 'Juwan', 'Carter', 'British Virgin Islands', 'Ferryburgh', 54, NULL, '1990-01-01', NULL, NULL, 1, 0),
(55, 55, 'Herminio', 'Braun', 'Turkmenistan', 'Rubietown', 55, NULL, '1990-01-01', NULL, NULL, 1, 0),
(56, 56, 'Golda', 'Simonis', 'Malta', 'Dickensburgh', 56, NULL, '1990-01-01', NULL, NULL, 1, 0),
(57, 57, 'Ebony', 'Kovacek', 'Holy See (Vatican City State)', 'New Armando', 57, NULL, '1990-01-01', NULL, NULL, 1, 0),
(58, 58, 'Mariah', 'Larkin', 'Burkina Faso', 'Batzberg', 58, NULL, '1990-01-01', NULL, NULL, 1, 0),
(59, 59, 'Yasmeen', 'Hammes', 'Angola', 'West Dameon', 59, NULL, '1990-01-01', NULL, NULL, 1, 0),
(60, 60, 'Lewis', 'Cruickshank', 'Bahrain', 'Port Nicolette', 60, NULL, '1990-01-01', NULL, NULL, 1, 0),
(61, 61, 'Anita', 'Sawayn', 'Congo', 'Herminioview', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(62, 62, 'Raven', 'Nader', 'Libyan Arab Jamahiriya', 'South Kayden', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(63, 63, 'Bernita', 'Jacobi', 'Sao Tome and Principe', 'New Veda', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(64, 64, 'Holden', 'Simonis', 'Finland', 'Adrianatown', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(65, 65, 'Justen', 'Krajcik', 'Norway', 'Alejandrinhaven', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(66, 66, 'London', 'Dach', 'Sri Lanka', 'Gusikowskiville', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(67, 67, 'Lora', 'Kertzmann', 'India', 'North Deondre', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(68, 68, 'Yesenia', 'Breitenberg', 'Macao', 'Ozellachester', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(69, 69, 'Desmond', 'Stoltenberg', 'Spain', 'North Larissa', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(70, 70, 'Niko', 'Considine', 'Marshall Islands', 'East Hesterburgh', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(71, 71, 'Virgil', 'Grady', 'Guernsey', 'Hudsonhaven', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(72, 72, 'Keshawn', 'Breitenberg', 'Fiji', 'Kuvalisfort', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(73, 73, 'Valentina', 'Hermann', 'Tanzania', 'Vincentfort', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(74, 74, 'Kaycee', 'Dicki', 'Mauritius', 'Joelletown', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(75, 75, 'Reese', 'Johns', 'Ireland', 'West Barbara', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(76, 76, 'Gus', 'Rippin', 'Palau', 'Irmaland', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(77, 77, 'Sabina', 'Thompson', 'Gibraltar', 'Savannahview', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(78, 78, 'Elmo', 'Medhurst', 'Italy', 'East Kelsie', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(79, 79, 'Barton', 'Senger', 'Guam', 'North Marquesland', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(80, 80, 'Misty', 'Klein', 'Svalbard & Jan Mayen Islands', 'Port Anjali', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(81, 81, 'Mylene', 'Hirthe', 'Hong Kong', 'Susanmouth', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(82, 82, 'Sabryna', 'Luettgen', 'Vanuatu', 'North Junior', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(83, 83, 'Jon', 'Green', 'Tunisia', 'Jasperberg', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(84, 84, 'Federico', 'Berge', 'Maldives', 'North Davin', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(85, 85, 'Assunta', 'Gutkowski', 'Japan', 'Schinnermouth', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(86, 86, 'Johnnie', 'Veum', 'Uruguay', 'West Cheyanne', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(87, 87, 'Raven', 'Paucek', 'Panama', 'Port Rexfort', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(88, 88, 'Florence', 'Koepp', 'Slovakia (Slovak Republic)', 'West Lukashaven', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(89, 89, 'Nyasia', 'Medhurst', 'Anguilla', 'Paytonbury', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(90, 90, 'Ida', 'Douglas', 'Macao', 'Franzburgh', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(91, 91, 'Florine', 'Zemlak', 'Costa Rica', 'New Jack', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(92, 92, 'Jaycee', 'Wolf', 'Yemen', 'South Gene', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(93, 93, 'Breanna', 'O\'Connell', 'British Indian Ocean Territory (Chagos Archipelago)', 'Donnellymouth', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(94, 94, 'Haylie', 'Wisozk', 'Australia', 'North Nealport', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(95, 95, 'Heber', 'Klocko', 'Trinidad and Tobago', 'New Addisonbury', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(96, 96, 'Anthony', 'Collier', 'Grenada', 'East America', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(97, 97, 'Nyasia', 'Heathcote', 'Cocos (Keeling) Islands', 'South Kirstenstad', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(98, 98, 'Chanelle', 'Walter', 'Holy See (Vatican City State)', 'Port Grayce', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(99, 99, 'Zella', 'Zboncak', 'Panama', 'New Richie', 100, NULL, '1990-01-01', NULL, NULL, 1, 0),
(100, 100, 'Alisa', 'McLaughlin', 'New Zealand', 'Marleneville', 100, NULL, '1990-01-01', NULL, NULL, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friends_list`
--
ALTER TABLE `friends_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_profile_id` (`user_profile_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `friends_list`
--
ALTER TABLE `friends_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1004;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`user_profile_id`) REFERENCES `user_profile` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
