-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2025 at 07:46 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qna_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer_text` text NOT NULL,
  `admin_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `answer_text`, `admin_id`, `created_at`, `updated_at`) VALUES
(44, 36, 'Apa tuch', 10, '2025-01-08 07:44:56', '2025-01-08 07:44:56'),
(45, 39, 'Warga Jawa Barat', 10, '2025-01-08 14:35:51', '2025-01-08 14:35:51'),
(46, 41, 'Bobotoh', 10, '2025-01-08 14:40:38', '2025-01-08 14:40:38'),
(47, 42, 'Nick Kuipers', 10, '2025-01-08 14:50:14', '2025-01-08 14:50:14'),
(48, 43, 'Dedi', 10, '2025-01-08 15:00:28', '2025-01-08 15:00:28'),
(49, 44, 'ya', 10, '2025-01-08 15:59:16', '2025-01-08 15:59:16'),
(50, 45, 'tyrone', 10, '2025-01-08 16:00:58', '2025-01-08 16:00:58'),
(51, 46, 'ya', 10, '2025-01-08 16:10:02', '2025-01-08 16:10:02'),
(52, 47, 'beckham', 10, '2025-01-08 16:10:36', '2025-01-08 16:10:36'),
(53, 48, 'yes', 10, '2025-01-08 16:13:12', '2025-01-08 16:13:12'),
(54, 49, 'kevin\n', 10, '2025-01-08 16:14:01', '2025-01-08 16:14:01'),
(55, 50, 'ya', 10, '2025-01-08 16:21:05', '2025-01-08 16:21:05'),
(56, 51, 'okaayyyy', 10, '2025-01-08 16:35:54', '2025-01-08 16:35:54'),
(57, 61, 'siyaap', 10, '2025-01-08 21:26:22', '2025-01-08 21:26:22'),
(67, 59, 'hai', 10, '2025-01-09 06:34:43', '2025-01-09 06:34:43'),
(68, 57, 'siap', 10, '2025-01-09 06:39:20', '2025-01-09 06:39:20'),
(69, 68, 'iya', 10, '2025-01-09 06:47:26', '2025-01-09 06:47:26'),
(70, 72, 'PERSIB', 10, '2025-01-09 11:15:58', '2025-01-09 11:15:58'),
(71, 73, 'BANDUNG', 10, '2025-01-09 11:17:09', '2025-01-09 11:17:09'),
(74, 80, 'tos', 10, '2025-01-09 14:06:36', '2025-01-09 14:06:36'),
(75, 83, 'tes', 10, '2025-01-09 15:05:13', '2025-01-09 15:05:13'),
(82, 93, 'ieu di jawab ditatabase', 10, '2025-01-10 14:17:21', '2025-01-10 14:17:21'),
(86, 93, 'test', 10, '2025-01-10 14:39:22', '2025-01-10 14:39:22'),
(87, 92, 'aku jawab deh', 10, '2025-01-10 14:39:39', '2025-01-10 14:39:39'),
(88, 91, 'mantap', 10, '2025-01-10 15:07:25', '2025-01-10 15:07:25'),
(89, 97, 'jawaab untuk lihat apakah ada pertanyaan ', 10, '2025-01-10 15:57:25', '2025-01-10 15:57:25'),
(90, 97, 'jawab untuk lihat apakah ada pertanyaan ', 10, '2025-01-10 15:57:32', '2025-01-10 15:57:32'),
(91, 97, 'test apakah  aada pertanyaan', 10, '2025-01-10 15:58:31', '2025-01-10 15:58:31'),
(92, 96, 'test jawab', 10, '2025-01-10 15:59:45', '2025-01-10 15:59:45'),
(93, 95, 'okaayy notif', 10, '2025-01-10 16:00:55', '2025-01-10 16:00:55'),
(94, 94, 'okayy', 10, '2025-01-10 16:02:22', '2025-01-10 16:02:22'),
(95, 90, 'test', 10, '2025-01-10 16:10:43', '2025-01-10 16:10:43'),
(96, 98, 'SOK WEH', 10, '2025-01-10 16:12:09', '2025-01-10 16:12:09'),
(99, 100, 'siyaap', 10, '2025-01-11 05:45:52', '2025-01-11 05:45:52'),
(101, 99, 'gookks', 10, '2025-01-11 06:03:34', '2025-01-11 06:03:34'),
(102, 101, 'bismillahhh ', 10, '2025-01-11 06:11:18', '2025-01-11 06:11:18'),
(105, 102, 'hghjsjshsjsjsjsjsj', 10, '2025-01-11 06:28:03', '2025-01-11 06:28:03'),
(106, 103, 'okedaaahh', 10, '2025-01-11 06:28:18', '2025-01-11 06:28:18'),
(107, 106, 'okeehhh', 10, '2025-01-11 06:41:46', '2025-01-11 06:41:46'),
(108, 107, 'okwwhh', 10, '2025-01-11 06:42:22', '2025-01-11 06:42:22');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `created_at`, `updated_at`) VALUES
(1, 'Science', '2025-01-01 01:45:18', '2025-01-02 06:17:27'),
(2, 'Bisnis', '2025-01-01 01:45:18', '2025-01-01 01:45:18'),
(11, 'sepak bola', '2025-01-07 13:59:20', '2025-01-07 13:59:20'),
(12, 'takraw', '2025-01-09 06:37:49', '2025-01-09 06:37:49');

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL,
  `sender` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `sender`, `message`, `timestamp`, `is_admin`) VALUES
(1, '6281281701539@c.us', 'Halo', '2025-01-07 14:47:40', 0),
(2, 'bot', 'Halo! Ada yang bisa dibantu?', '2025-01-07 14:47:40', 1),
(3, '6281281701539@c.us', 'Apakah anda bisa membantu saya?', '2025-01-07 14:48:02', 0),
(4, '6281281701539@c.us', '!ping', '2025-01-07 16:03:17', 0),
(5, 'bot', 'hay guys', '2025-01-07 16:03:17', 1);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `question_text` text NOT NULL,
  `status` enum('pending','answered') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `user_id`, `category_id`, `question_text`, `status`, `created_at`, `updated_at`) VALUES
(36, 14, 2, 'Aku pengen nanya dong?', 'answered', '2025-01-08 07:43:57', '2025-01-08 07:44:56'),
(37, 14, 2, 'Bisnis Rekomendasi 2025?', 'pending', '2025-01-08 07:44:16', '2025-01-08 07:44:16'),
(39, 14, 2, 'Siapakah pemiliki club Persib FC?', 'answered', '2025-01-08 14:34:44', '2025-01-08 14:35:51'),
(41, 4, 2, 'Siapakah pecinta club Persib FC?', 'answered', '2025-01-08 14:40:16', '2025-01-08 14:40:38'),
(42, 4, 2, 'Siapakah no 2 di club Persib FC?', 'answered', '2025-01-08 14:49:46', '2025-01-08 14:50:14'),
(43, 4, 2, 'Siapakah no 11 di club Persib FC?', 'answered', '2025-01-08 15:00:04', '2025-01-08 15:00:28'),
(44, 4, 2, 'test?', 'answered', '2025-01-08 15:57:47', '2025-01-08 15:59:16'),
(45, 4, 2, 'Siapakah no 10 di club Persib FC?', 'answered', '2025-01-08 16:00:40', '2025-01-08 16:00:58'),
(46, 4, 2, 'test?', 'answered', '2025-01-08 16:09:22', '2025-01-08 16:10:02'),
(47, 4, 2, 'Siapakah no 7 di club Persib FC?', 'answered', '2025-01-08 16:10:21', '2025-01-08 16:10:36'),
(48, 4, 2, 'test?', 'answered', '2025-01-08 16:12:19', '2025-01-08 16:13:12'),
(49, 4, 2, 'Siapakah no 1 di club Persib FC?', 'answered', '2025-01-08 16:12:52', '2025-01-08 16:14:01'),
(50, 4, 2, 'test?', 'answered', '2025-01-08 16:20:07', '2025-01-08 16:21:05'),
(51, 4, 2, 'test?', 'answered', '2025-01-08 16:35:07', '2025-01-08 16:35:54'),
(57, 4, 1, 'Test', 'answered', '2025-01-08 20:02:06', '2025-01-09 06:39:20'),
(58, 4, 2, 'Siapakah no 13 di club Persib FC?', 'pending', '2025-01-08 20:02:59', '2025-01-08 20:02:59'),
(59, 4, 0, 'hallo', 'answered', '2025-01-08 20:14:01', '2025-01-09 06:34:43'),
(60, 4, 0, 'Siapakah no 1 di club HADE FC?', 'pending', '2025-01-08 20:35:34', '2025-01-08 20:35:34'),
(61, 4, 1, 'halloo tian?', 'pending', '2025-01-08 21:25:14', '2025-01-08 21:25:14'),
(62, 4, 0, 'hallo\n', 'pending', '2025-01-08 21:47:21', '2025-01-08 21:47:21'),
(63, 4, 0, '2 test?', 'pending', '2025-01-08 21:50:28', '2025-01-08 21:50:28'),
(64, 4, 2, 'test buser malam?', 'pending', '2025-01-08 22:01:09', '2025-01-08 22:01:09'),
(65, 4, 2, 'Siapakah no 14 di club Persib FC?', 'pending', '2025-01-09 06:40:39', '2025-01-09 06:40:39'),
(66, 4, 2, 'Siapakah no 33 di club Persib FC?', 'pending', '2025-01-09 06:41:40', '2025-01-09 06:41:40'),
(67, 4, 2, 'test?', 'pending', '2025-01-09 06:41:57', '2025-01-09 06:41:57'),
(68, 4, 1, 'test backup ', 'answered', '2025-01-09 06:46:24', '2025-01-09 06:47:26'),
(69, 10, 1, 'test lagi', 'pending', '2025-01-09 10:12:36', '2025-01-09 10:12:36'),
(70, 1, NULL, 'Test pertanyaan baru', 'pending', '2025-01-09 10:34:46', '2025-01-09 10:34:46'),
(71, 10, 1, 'cek deui wae', 'pending', '2025-01-09 11:07:39', '2025-01-09 11:07:39'),
(72, 4, 2, 'Siapakah pemenang antara PSBS vs PERSIB?', 'answered', '2025-01-09 11:15:29', '2025-01-09 11:15:58'),
(73, 4, 2, 'test lokasi?', 'answered', '2025-01-09 11:16:42', '2025-01-09 11:17:09'),
(74, 10, 1, 'TEST', 'pending', '2025-01-09 12:14:21', '2025-01-09 12:14:21'),
(75, 4, 2, 'buser buser test', 'pending', '2025-01-09 12:16:52', '2025-01-09 12:16:52'),
(76, 4, 2, 'Berapa bulan dari masehi', 'pending', '2025-01-09 12:27:29', '2025-01-09 12:27:29'),
(78, 4, NULL, 'testNull', 'pending', '2025-01-09 12:46:04', '2025-01-09 12:46:04'),
(79, 4, 2, 'Berapa bulan dari hijriah?', 'pending', '2025-01-09 12:51:35', '2025-01-09 12:51:35'),
(80, 4, 2, 'tes', 'answered', '2025-01-09 14:04:48', '2025-01-09 14:06:36'),
(81, 4, NULL, 'Berapa bulan dari hijriahh?', 'pending', '2025-01-09 14:53:41', '2025-01-09 14:53:41'),
(82, 4, NULL, 'Berapa bulan dari hijriahh?', 'pending', '2025-01-09 14:54:17', '2025-01-09 14:54:17'),
(83, 4, NULL, 'test tanpa kategori', 'answered', '2025-01-09 14:57:04', '2025-01-09 15:05:13'),
(84, 4, NULL, 'test tanpa nama', 'pending', '2025-01-09 14:59:15', '2025-01-09 14:59:15'),
(85, 4, 1, 'test nama dan ketegori', 'pending', '2025-01-09 14:59:27', '2025-01-09 14:59:27'),
(86, 4, NULL, 'test update ask', 'pending', '2025-01-09 18:35:42', '2025-01-09 18:35:42'),
(87, 4, 2, 'test deui deuiii', 'pending', '2025-01-09 19:12:56', '2025-01-09 20:45:53'),
(88, 4, NULL, 'anyar deui mang', 'pending', '2025-01-09 20:23:09', '2025-01-09 20:23:09'),
(89, 4, NULL, 'tesdt shubuh', 'pending', '2025-01-09 21:37:59', '2025-01-09 21:37:59'),
(90, 4, 11, 'test?', 'answered', '2025-01-09 21:38:39', '2025-01-10 16:10:43'),
(91, 4, 1, 'aing bisa?', 'answered', '2025-01-09 21:39:15', '2025-01-10 15:07:25'),
(92, 10, NULL, 'ini belum dijawab', 'answered', '2025-01-10 08:10:14', '2025-01-10 14:39:39'),
(93, 4, NULL, 'aha kuanoan iyeu eth?', 'answered', '2025-01-10 14:10:43', '2025-01-10 14:39:22'),
(94, 10, NULL, 'test tanpa kategori yeuhh', 'answered', '2025-01-10 15:12:17', '2025-01-10 16:02:22'),
(95, 4, NULL, 'test percobaan tanpa kategori?', 'answered', '2025-01-10 15:21:13', '2025-01-10 16:00:55'),
(96, 4, 11, 'tes group pesan langsung', 'answered', '2025-01-10 15:24:33', '2025-01-10 15:59:45'),
(97, 4, 2, 'test group mentioned admin?', 'answered', '2025-01-10 15:24:56', '2025-01-10 15:58:31'),
(98, 4, NULL, 'SARE AH?', 'answered', '2025-01-10 16:11:51', '2025-01-10 16:12:09'),
(99, 4, 2, 'cek untuk mengirim pertanyaan kepada user\n', 'answered', '2025-01-11 05:39:11', '2025-01-11 06:03:34'),
(100, 4, 12, 'oke komeback nih', 'answered', '2025-01-11 05:44:29', '2025-01-11 05:45:52'),
(101, 10, 1, 'oke bismillah finall', 'answered', '2025-01-11 06:10:54', '2025-01-11 06:11:18'),
(102, 10, NULL, 'hayolaahhh bismillah', 'answered', '2025-01-11 06:25:16', '2025-01-11 06:28:03'),
(103, 4, NULL, 'hayollaahh bismillah', 'answered', '2025-01-11 06:26:23', '2025-01-11 06:28:18'),
(104, 4, NULL, 'test?', 'pending', '2025-01-11 06:29:04', '2025-01-11 06:29:04'),
(105, 4, NULL, 'test?', 'pending', '2025-01-11 06:29:30', '2025-01-11 06:29:30'),
(106, 4, NULL, 'test pertanyaan group?', 'answered', '2025-01-11 06:41:23', '2025-01-11 06:41:46'),
(107, 4, NULL, 'group?', 'answered', '2025-01-11 06:42:09', '2025-01-11 06:42:22');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `language` enum('id','en') DEFAULT 'id',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `whatsapp_number` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `whatsapp_number`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin Kece', '85245685525', '321123', 'admin', '2025-01-01 01:45:18', '2025-01-02 03:11:07'),
(4, 'Buser Siang', '6281281701539', '$2b$10$feV..K4.TCxmXOSYUiOeQOW6/aMqsM8IMIhIYZ2zO64TpmwEoHnW6', 'user', '2025-01-02 05:50:22', '2025-01-09 06:29:58'),
(10, 'Rusmana', '628552136988', '$2b$10$CKTQCwY0vaOMaJYCQN5hB.tagl6pCJRALmi6bAU4WansbF8OXonvG', 'admin', '2025-01-04 17:50:09', '2025-01-07 09:47:07'),
(12, 'Rusmana', '62852365875', '$2b$10$BfmnaI63375D2M66Y4UnEuNgS7GK3i8zQqJtmmxxyvDw3sNkCL8ki', 'user', '2025-01-05 11:23:40', '2025-01-07 09:47:07'),
(13, 'Uing Tea', '62521365654989', '$2b$10$YVznfFoViW9zG9s4tAR9COqGWXMRbHEPNtU3telEavSHaxnHMZFvS', 'user', '2025-01-06 03:27:49', '2025-01-07 09:47:07'),
(14, 'testing 2', '08542698565234', '$2b$10$cX2YuBeyieh.EXAaZdsPHe1Zp56bMVXk3n7WioqdNnNBbiVCEP0um', 'user', '2025-01-07 13:52:14', '2025-01-07 13:56:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `whatsapp_number` (`whatsapp_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
