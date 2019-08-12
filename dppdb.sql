-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 2018-02-26 01:45:47
-- 服务器版本： 5.7.21-0ubuntu0.17.10.1
-- PHP Version: 7.1.11-0ubuntu0.17.10.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dppdb`
--

-- --------------------------------------------------------

--
-- 表的结构 `basic`
--

CREATE TABLE `basic` (
  `userid` int(11) NOT NULL,
  `location` varchar(50) NOT NULL,
  `days` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `basic`
--

INSERT INTO `basic` (`userid`, `location`, `days`) VALUES
(2, 'Pittsburgh', 7);

-- --------------------------------------------------------

--
-- 表的结构 `clothing_bedding`
--

CREATE TABLE `clothing_bedding` (
  `clothingbeddingid` int(11) NOT NULL,
  `clothingbeddingname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `clothing_bedding`
--

INSERT INTO `clothing_bedding` (`clothingbeddingid`, `clothingbeddingname`) VALUES
(1, 'Sweater'),
(2, 'Gloves'),
(3, 'Jacket'),
(4, 'Vest'),
(5, 'Pants'),
(6, 'Blanket'),
(7, 'Quilt'),
(8, 'Sheet'),
(9, 'Mattress'),
(10, 'Duvet');

-- --------------------------------------------------------

--
-- 表的结构 `communications`
--

CREATE TABLE `communications` (
  `communicationid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `communications`
--

INSERT INTO `communications` (`communicationid`, `userid`, `firstname`, `lastname`, `phone`, `email`) VALUES
(1, 2, 'Yusi', 'Liu', '123123123', 'YUL@123.com');

-- --------------------------------------------------------

--
-- 表的结构 `food`
--

CREATE TABLE `food` (
  `foodid` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `servings` varchar(50) NOT NULL,
  `calories` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `food`
--

INSERT INTO `food` (`foodid`, `type`, `servings`, `calories`) VALUES
(1, 'Egg', 'Per (raw)', 72),
(2, 'Protein bar', 'Per piece', 150),
(3, 'Toast', 'Per piece', 50),
(4, 'Whole Milk', 'Per cup (240ml)', 149),
(5, 'Canned Bean', 'Per 8 oz.', 220),
(6, 'Canned Chicken', 'Per 8 oz.', 200),
(7, 'Canned Beef', 'Per 8 oz.', 320),
(8, 'Canned Tuna', 'Per 8 oz.', 180),
(9, 'Apple', 'Per medium one', 80),
(10, 'Yogurt', 'Per 100g', 94),
(11, 'Chocolate', 'Per 100g', 534),
(12, 'Banana', 'Per medium one', 105),
(13, 'Tomato', 'Per medium one', 25),
(14, 'MRE', 'Per bag', 2900);

-- --------------------------------------------------------

--
-- 表的结构 `humans`
--

CREATE TABLE `humans` (
  `humanid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `birthdate` date NOT NULL,
  `phone` varchar(15) NOT NULL,
  `health` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `humans`
--

INSERT INTO `humans` (`humanid`, `userid`, `firstname`, `lastname`, `gender`, `birthdate`, `phone`, `health`) VALUES
(1, 2, 'Alvin', 'Guo', 'male', '1994-04-08', '4125877777', 'Healthy');

-- --------------------------------------------------------

--
-- 表的结构 `memos`
--

CREATE TABLE `memos` (
  `memoid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `memos`
--

INSERT INTO `memos` (`memoid`, `userid`, `title`, `content`) VALUES
(2, 2, 'storage', 'Store the supplies near an exit to facilitate loading into vehicles if forced to leave quickly.\nStorage place depends on the risks prone to the area: \nWind storms : keep the supplies in the basement \nFlooding : store items on upper floors \nSmaller homes and apartments : concern about the store space');

-- --------------------------------------------------------

--
-- 表的结构 `pets`
--

CREATE TABLE `pets` (
  `petid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `petname` varchar(50) NOT NULL,
  `pettype` varchar(50) NOT NULL,
  `weight` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `pets`
--

INSERT INTO `pets` (`petid`, `userid`, `petname`, `pettype`, `weight`) VALUES
(2, 2, 'Andy', 'dog', 10);

-- --------------------------------------------------------

--
-- 表的结构 `traveltips`
--

CREATE TABLE `traveltips` (
  `traveltipid` int(11) NOT NULL,
  `traveltip` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `traveltips`
--

INSERT INTO `traveltips` (`traveltipid`, `traveltip`) VALUES
(1, '1 gallon of water'),
(2, '5-8 high-calorie energy bars'),
(3, 'Emergency blanket'),
(4, 'Plastic poncho with hood'),
(5, 'Headlamp'),
(6, 'Hand-crank radio/ flashlight/ USB charger'),
(7, '2 glow sticks'),
(8, 'Contact card: Phone number of out-of-state relatives & friends'),
(9, 'Basic first-aid kit'),
(10, 'Safety whistle'),
(11, 'Dust mask'),
(12, 'Pocket knife');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`userid`, `username`, `password`) VALUES
(2, 'Alvin', '1'),
(4, 'test1', '1');

-- --------------------------------------------------------

--
-- 表的结构 `user_clothing_bedding`
--

CREATE TABLE `user_clothing_bedding` (
  `userid` int(11) NOT NULL,
  `clothingbeddingid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user_clothing_bedding`
--

INSERT INTO `user_clothing_bedding` (`userid`, `clothingbeddingid`, `quantity`) VALUES
(2, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `user_food`
--

CREATE TABLE `user_food` (
  `userid` int(11) NOT NULL,
  `foodid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user_food`
--

INSERT INTO `user_food` (`userid`, `foodid`, `quantity`) VALUES
(2, 1, 3),
(2, 2, 1),
(2, 3, 5),
(2, 5, 2);

-- --------------------------------------------------------

--
-- 表的结构 `user_traveltips`
--

CREATE TABLE `user_traveltips` (
  `userid` int(11) NOT NULL,
  `traveltipid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user_traveltips`
--

INSERT INTO `user_traveltips` (`userid`, `traveltipid`) VALUES
(2, 1),
(2, 2),
(2, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `basic`
--
ALTER TABLE `basic`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `clothing_bedding`
--
ALTER TABLE `clothing_bedding`
  ADD PRIMARY KEY (`clothingbeddingid`);

--
-- Indexes for table `communications`
--
ALTER TABLE `communications`
  ADD PRIMARY KEY (`communicationid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`foodid`);

--
-- Indexes for table `humans`
--
ALTER TABLE `humans`
  ADD PRIMARY KEY (`humanid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `memos`
--
ALTER TABLE `memos`
  ADD PRIMARY KEY (`memoid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`petid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `traveltips`
--
ALTER TABLE `traveltips`
  ADD PRIMARY KEY (`traveltipid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `user_clothing_bedding`
--
ALTER TABLE `user_clothing_bedding`
  ADD PRIMARY KEY (`userid`,`clothingbeddingid`),
  ADD KEY `clothingbeddingid` (`clothingbeddingid`);

--
-- Indexes for table `user_food`
--
ALTER TABLE `user_food`
  ADD PRIMARY KEY (`userid`,`foodid`),
  ADD KEY `foodid` (`foodid`);

--
-- Indexes for table `user_traveltips`
--
ALTER TABLE `user_traveltips`
  ADD PRIMARY KEY (`userid`,`traveltipid`),
  ADD KEY `traveltipid` (`traveltipid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `clothing_bedding`
--
ALTER TABLE `clothing_bedding`
  MODIFY `clothingbeddingid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- 使用表AUTO_INCREMENT `communications`
--
ALTER TABLE `communications`
  MODIFY `communicationid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `food`
--
ALTER TABLE `food`
  MODIFY `foodid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- 使用表AUTO_INCREMENT `humans`
--
ALTER TABLE `humans`
  MODIFY `humanid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `memos`
--
ALTER TABLE `memos`
  MODIFY `memoid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `pets`
--
ALTER TABLE `pets`
  MODIFY `petid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `traveltips`
--
ALTER TABLE `traveltips`
  MODIFY `traveltipid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 限制导出的表
--

--
-- 限制表 `communications`
--
ALTER TABLE `communications`
  ADD CONSTRAINT `communications_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`);

--
-- 限制表 `humans`
--
ALTER TABLE `humans`
  ADD CONSTRAINT `humans_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`);

--
-- 限制表 `memos`
--
ALTER TABLE `memos`
  ADD CONSTRAINT `memos_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`);

--
-- 限制表 `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`);

--
-- 限制表 `user_clothing_bedding`
--
ALTER TABLE `user_clothing_bedding`
  ADD CONSTRAINT `user_clothing_bedding_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  ADD CONSTRAINT `user_clothing_bedding_ibfk_2` FOREIGN KEY (`clothingbeddingid`) REFERENCES `clothing_bedding` (`clothingbeddingid`);

--
-- 限制表 `user_food`
--
ALTER TABLE `user_food`
  ADD CONSTRAINT `user_food_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  ADD CONSTRAINT `user_food_ibfk_2` FOREIGN KEY (`foodid`) REFERENCES `food` (`foodid`);

--
-- 限制表 `user_traveltips`
--
ALTER TABLE `user_traveltips`
  ADD CONSTRAINT `user_traveltips_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  ADD CONSTRAINT `user_traveltips_ibfk_2` FOREIGN KEY (`traveltipid`) REFERENCES `traveltips` (`traveltipid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
