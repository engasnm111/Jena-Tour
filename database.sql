-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2022 at 04:25 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `utcc`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `tel` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `tel`) VALUES
(1, 'admin', '123456', 'admin@test.com', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `map`
--

CREATE TABLE `map` (
  `id` int(11) NOT NULL,
  `map_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `map`
--

INSERT INTO `map` (`id`, `map_id`, `name`, `description`, `image`) VALUES
(1, 1, 'utcc', 'utcc', 'utcc.jpeg'),
(2, 2, 'test', 'test', 'test.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `mapgrid`
--

CREATE TABLE `mapgrid` (
  `id` int(11) NOT NULL,
  `map_id` int(11) UNSIGNED NOT NULL,
  `mapgrid_id` int(11) NOT NULL,
  `image_3d` varchar(255) NOT NULL,
  `image_cover` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mapgrid`
--

INSERT INTO `mapgrid` (`id`, `map_id`, `mapgrid_id`, `image_3d`, `image_cover`, `name`, `description`) VALUES
(1, 1, 1, '', '1.png', '', ''),
(2, 1, 2, '', '2.png', '', ''),
(3, 1, 3, '', '3.png', '', ''),
(4, 2, 4, '', '4.png', '', ''),
(8, 2, 1, '', '1.png', '', ''),
(9, 2, 9, '', '9.png', '', ''),
(10, 1, 4, '', '4.png', '', ''),
(11, 2, 3, '', '3.png', '', ''),
(12, 2, 2, '', '2.png', '', ''),
(13, 1, 5, '', '5.png', '', ''),
(14, 1, 6, '', '6.png', '', ''),
(15, 1, 7, '7_3d.jpeg', '7.png', 'อาคาร 24', 'อาคาร 24'),
(16, 1, 8, '', '8.png', '', ''),
(17, 1, 9, '', '9.png', '', ''),
(18, 1, 10, '', '10.png', '', ''),
(19, 1, 11, '', '11.png', '', ''),
(20, 1, 12, '', '12.png', '', ''),
(21, 1, 13, '', '13.png', '', ''),
(22, 1, 14, '', '14.png', '', ''),
(23, 1, 15, '', '15.png', '', ''),
(24, 1, 16, '16_3d.jpeg', '16.png', 'อาคาร 24', 'อาคาร 24'),
(25, 1, 17, '17_3d.jpeg', '17.png', 'อาคาร 24', 'อาคาร 24'),
(26, 1, 18, '18_3d.jpeg', '18.png', 'อาคาร 24', 'อาคาร 24'),
(27, 1, 19, '', '19.png', '', ''),
(28, 1, 20, '', '20.png', '', ''),
(29, 1, 21, '', '21.png', '', ''),
(30, 1, 22, '', '22.png', '', ''),
(31, 1, 23, '', '23.png', '', ''),
(32, 1, 24, '', '24.png', '', ''),
(33, 1, 25, '25_3d.jpeg', '25.png', 'อาคาร 8', 'อาคาร 8'),
(34, 1, 26, '26_3d.jpeg', '26.png', 'อาคาร 25', 'อาคาร 25'),
(36, 1, 28, '28_3d.jpeg', '28.png', 'อาคาร 24', 'อาคาร 24'),
(37, 1, 29, '29_3d.jpeg', '29.png', 'อาคาร 5', 'อาคาร 5'),
(38, 1, 30, '30_3d.jpeg', '30.png', 'อาคาร 16', 'อาคาร 16'),
(39, 1, 31, '', '31.png', '', ''),
(40, 1, 32, '', '32.png', '', ''),
(41, 1, 33, '', '33.png', '', ''),
(44, 1, 34, '', '34.png', '', ''),
(45, 1, 35, '35_3d.jpeg', '35.png', 'อาคาร 15', 'อาคาร 15'),
(46, 1, 36, '36_3d.jpeg', '36.png', 'อาคาร 25', 'อาคาร 25'),
(47, 1, 37, '37_3d.jpeg', '37.png', 'อาคาร 24', 'อาคาร 24'),
(48, 1, 38, '38_3d.jpeg', '38.png', 'อาคาร 24', 'อาคาร 24'),
(49, 1, 39, '39_3d.jpeg', '39.png', 'อาคาร 5', 'อาคาร 5'),
(50, 1, 40, '40_3d.jpeg', '40.png', 'อาคาร 17', 'อาคาร 17'),
(51, 1, 41, '41_3d.jpeg', '41.png', 'อาคาร 14', 'อาคาร 14'),
(52, 1, 42, '42_3d.jpeg', '42.png', 'อาคาร 14', 'อาคาร 14'),
(53, 1, 43, '43_3d.jpeg', '43.png', 'อาคาร 1', 'อาคาร 1'),
(54, 1, 44, '44_3d.jpeg', '44.png', 'อาคาร 1', 'อาคาร 1'),
(55, 1, 45, '45_3d.jpeg', '45.png', 'อาคาร 15', 'อาคาร 15'),
(56, 1, 46, '46_3d.jpeg', '46.png', 'กลางมหาวิทยาลัย', 'กลางมหาวิทยาลัย'),
(57, 1, 47, '', '47.png', '', ''),
(58, 1, 48, '48_3d.jpeg', '48.png', 'อาคาร 21', 'อาคาร 21'),
(59, 1, 49, '49_3d.jpeg', '49.png', 'อาคาร 21', 'อาคาร 21'),
(60, 1, 50, '', '50.png', '', ''),
(61, 1, 51, '51_3d.jpeg', '51.png', 'อาคาร 14', 'อาคาร 14'),
(62, 1, 52, '', '52.png', '', ''),
(63, 1, 53, '53_3d.jpeg', '53.png', 'อาคาร 1', 'อาคาร 1'),
(64, 1, 54, '54_3d.jpeg', '54.png', 'อาคาร 10', 'อาคาร 10'),
(65, 1, 55, '55_3d.jpeg', '55.png', 'กลางมหาวิทยาลัย', 'กลางมหาวิทยาลัย'),
(66, 1, 56, '56_3d.jpeg', '56.png', 'อาคาร 3', 'อาคาร 3'),
(67, 1, 57, '57_3d.jpeg', '57.png', 'อาคาร 9', 'อาคาร 9'),
(68, 1, 58, '58_3d.jpeg', '58.png', 'อาคาร 23', 'อาคาร 23'),
(69, 1, 59, '59_3d.jpeg', '59.png', 'อาคาร 22', 'อาคาร 22'),
(70, 1, 60, '', '60.png', '', ''),
(71, 1, 61, '', '61.png', '', ''),
(72, 1, 62, '', '62.png', 'อาคาร 20', 'อาคาร 20'),
(73, 1, 63, '63_3d.jpeg', '63.png', 'อาคาร 20', 'อาคาร 20'),
(74, 1, 64, '64_3d.jpeg', '64.png', 'อาคาร 10', 'อาคาร 10'),
(75, 1, 65, '65_3d.jpeg', '65.png', 'อาคาร 3', 'อาคาร 3'),
(76, 1, 66, '66_3d.jpeg', '66.png', 'สนามกีฬา', 'สนามกีฬา'),
(77, 1, 67, '67_3d.jpeg', '67.png', 'อาคาร 7', 'อาคาร 7'),
(78, 1, 68, '', '68.png', '', ''),
(79, 1, 69, '', '69.png', '', ''),
(80, 1, 70, '', '70.png', '', ''),
(81, 1, 71, '', '71.png', '', ''),
(82, 1, 72, '72_3d.jpeg', '72.png', 'อาคาร 20', 'อาคาร 20'),
(84, 1, 74, '', '74.png', '', ''),
(85, 1, 75, '75_3d.jpeg', '75.png', 'สนามกีฬา', 'สนามกีฬา'),
(86, 1, 76, '76_3d.jpeg', '76.png', 'สนามกีฬา', 'สนามกีฬา'),
(87, 1, 77, '77_3d.jpeg', '77.png', 'อาคาร 19', 'อาคาร 19'),
(88, 1, 78, '', '78.png', '', ''),
(89, 1, 79, '', '79.png', '', ''),
(90, 1, 80, '', '80.png', '', ''),
(91, 1, 81, '', '81.png', '', ''),
(92, 1, 82, '', '82.png', '', ''),
(93, 1, 83, '', '83.png', '', ''),
(94, 1, 84, '', '84.png', '', ''),
(95, 1, 85, '', '85.png', '', ''),
(96, 1, 86, '', '86.png', '', ''),
(97, 1, 87, '', '87.png', '', ''),
(98, 1, 88, '', '88.png', '', ''),
(99, 1, 89, '', '89.png', '', ''),
(101, 1, 90, '', '90.png', '', ''),
(102, 1, 73, '73_3d.jpeg', '73.png', 'อาคาร 20', 'อาคาร 20'),
(105, 1, 27, '27_3d.jpeg', '27.png', 'อาคาร 24', 'อาคาร 24');

-- --------------------------------------------------------

--
-- Table structure for table `poi`
--

CREATE TABLE `poi` (
  `poi_id` int(11) NOT NULL,
  `map_id` int(11) UNSIGNED NOT NULL,
  `mapgrid_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `poi`
--

INSERT INTO `poi` (`poi_id`, `map_id`, `mapgrid_id`, `image`, `title`, `description`) VALUES
(33, 1, 63, '63_POI.jpeg', 'อาคาร 20 ชั้น 3 ฟิตเนส', 'อาคาร 20 ชั้น 3 ฟิตเนส'),
(34, 1, 62, '62_POI.jpeg', 'อาคาร 20 ชั้น 3 ฟิตเนส', 'อาคาร 20 ชั้น 3 ฟิตเนส'),
(35, 1, 72, '72_POI.jpeg', 'อาคาร 20 ชั้น 3 ฟิตเนส', 'อาคาร 20 ชั้น 3 ฟิตเนส'),
(36, 1, 7, '7_POI.jpeg', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม'),
(37, 1, 56, '56_POI.jpeg', 'อาคาร 3 จุดซ้อมเต้น', 'อาคาร 3 จุดซ้อมเต้น'),
(41, 1, 46, 'สะพานแดง_POI.jpeg', 'สะพานแดง', 'สะพานแดง'),
(42, 1, 16, 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม_POI.jpeg', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม'),
(44, 1, 18, 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม_POI.jpeg', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม'),
(45, 1, 28, 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม_POI.jpeg', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม'),
(46, 1, 38, 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม_POI.jpeg', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม'),
(47, 1, 37, 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม_POI.jpeg', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม'),
(53, 1, 43, 'อาคาร 1 ห้อง IDE_POI.jpeg', 'อาคาร 1 ห้อง IDE', 'อาคาร 1 ห้อง IDE'),
(54, 1, 44, 'อาคาร 1 ห้อง IDE_POI.jpeg', 'อาคาร 1 ห้อง IDE', 'อาคาร 1 ห้อง IDE'),
(56, 1, 17, 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม_POI.jpeg', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม'),
(57, 1, 17, 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน_POI.jpeg', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน'),
(58, 1, 18, 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน_POI.jpeg', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน'),
(60, 1, 28, 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน_POI.jpeg', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน'),
(61, 1, 38, 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน_POI.jpeg', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน'),
(62, 1, 37, 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน_POI.jpeg', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน'),
(63, 1, 29, 'อาคาร 5 U-Store_POI.jpeg', 'อาคาร 5 U-Store', 'อาคาร 5 U-Store'),
(65, 1, 65, 'อาคาร 3 ชั้น 2 พื้นที่นั่งทำงาน_POI.jpeg', 'อาคาร 3 ชั้น 2 พื้นที่นั่งทำงาน', 'อาคาร 3 ชั้น 2 พื้นที่นั่งทำงาน'),
(66, 1, 53, 'อาคาร 1 ห้อง IDE_POI.jpeg', 'อาคาร 1 ห้อง IDE', 'อาคาร 1 ห้อง IDE'),
(67, 1, 55, 'สะพานแดง_POI.jpeg', 'สะพานแดง', 'สะพานแดง'),
(69, 1, 73, 'อาคาร 20 ชั้น 3 ฟิตเนส_POI.jpeg', 'อาคาร 20 ชั้น 3 ฟิตเนส', 'อาคาร 20 ชั้น 3 ฟิตเนส'),
(72, 1, 16, 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน_POI.jpeg', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน'),
(73, 1, 27, 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม_POI.jpeg', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม', 'อาคาร 24 ชั้น 5 โซนเช่าบอร์ดเกม'),
(74, 1, 27, 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน_POI.jpeg', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน'),
(75, 1, 7, 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน_POI.jpeg', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน', 'อาคาร 24 ชั้น 6  พื้นที่พักผ่อน'),
(76, 1, 56, 'อาคาร 3 ชั้น 2 พื้นที่นั่งทำงาน_POI.jpeg', 'อาคาร 3 ชั้น 2 พื้นที่นั่งทำงาน', 'อาคาร 3 ชั้น 2 พื้นที่นั่งทำงาน'),
(77, 1, 65, 'อาคาร 3 จุดซ้อมเต้น_POI.jpeg', 'อาคาร 3 จุดซ้อมเต้น', 'อาคาร 3 จุดซ้อมเต้น'),
(78, 1, 39, 'อาคาร 5 U-Store_POI.jpeg', 'อาคาร 5 U-Store', 'อาคาร 5 U-Store');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `map_id` (`map_id`);

--
-- Indexes for table `mapgrid`
--
ALTER TABLE `mapgrid`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mapgrid_id` (`mapgrid_id`),
  ADD KEY `fk_mapid` (`map_id`);

--
-- Indexes for table `poi`
--
ALTER TABLE `poi`
  ADD PRIMARY KEY (`poi_id`),
  ADD KEY `fk_mapgridid` (`mapgrid_id`),
  ADD KEY `fkz_mapgid` (`map_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `map`
--
ALTER TABLE `map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mapgrid`
--
ALTER TABLE `mapgrid`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `poi`
--
ALTER TABLE `poi`
  MODIFY `poi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mapgrid`
--
ALTER TABLE `mapgrid`
  ADD CONSTRAINT `fk_mapid` FOREIGN KEY (`map_id`) REFERENCES `map` (`map_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `poi`
--
ALTER TABLE `poi`
  ADD CONSTRAINT `fk_mapgrid` FOREIGN KEY (`mapgrid_id`) REFERENCES `mapgrid` (`mapgrid_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkz_mapgid` FOREIGN KEY (`map_id`) REFERENCES `map` (`map_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
