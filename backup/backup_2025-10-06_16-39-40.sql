-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: tjzenn-mysql
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Blog`
--

DROP TABLE IF EXISTS `Blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortDescription` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Blog_url_key` (`url`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Blog`
--

LOCK TABLES `Blog` WRITE;
/*!40000 ALTER TABLE `Blog` DISABLE KEYS */;
INSERT INTO `Blog` VALUES (6,'Khám phá thế giới đồ công nghệ laptop hiện đại','kham-pha-the-gioi-do-cong-nghe-laptop-hien-dai','Cùng tìm hiểu sự phát triển của laptop qua từng giai đoạn','<h2 class=\"font-bold my-4 text-2xl\">Laptop – Người bạn đồng hành của thời đại số</h2><p>Trong kỷ nguyên công nghệ, laptop không chỉ còn là một thiết bị phục vụ cho công việc văn phòng. Nó đã trở thành cánh cửa kết nối chúng ta với thế giới bên ngoài: học tập online, làm việc từ xa, sáng tạo nội dung và cả giải trí. Mỗi người đều có một “câu chuyện riêng” với chiếc laptop của mình, từ những đêm học bài chuẩn bị thi, cho đến những dự án quan trọng được hoàn thành ngay trên quán cà phê nhỏ. Laptop giờ đây giống như một người bạn đồng hành không thể thiếu trong cuộc sống hiện đại.</p><h2 class=\"font-bold my-4 text-2xl\">Hiệu năng và cấu hình – Trái tim của laptop</h2><p>Điều đầu tiên người dùng quan tâm khi chọn laptop chính là hiệu năng. Bộ vi xử lý (CPU) mạnh mẽ giúp mở ứng dụng nhanh chóng, card đồ họa (GPU) tối ưu cho những ai cần thiết kế, dựng phim hay chơi game. Dung lượng RAM càng cao thì khả năng đa nhiệm càng mượt, còn ổ cứng SSD không chỉ giúp khởi động hệ điều hành nhanh mà còn giảm thời gian truy xuất dữ liệu. Một chiếc laptop có cấu hình tốt sẽ mang đến sự an tâm, cho dù bạn chỉ lướt web, học tập cơ bản hay cần làm việc chuyên nghiệp.</p><h2 class=\"font-bold my-4 text-2xl\">Thiết kế – Sự cân bằng giữa thời trang và tiện ích</h2><p>Ngoài hiệu năng, thiết kế của laptop ngày nay được nâng tầm để trở thành “tuyên ngôn cá nhân” cho người dùng. Các mẫu laptop hiện đại thường có thân máy mỏng nhẹ, chất liệu kim loại hoặc hợp kim sang trọng, đường viền tinh tế. Nhiều hãng còn đầu tư vào màn hình tràn viền, độ phân giải cao và màu sắc chân thực, mang lại trải nghiệm hình ảnh sống động. Không chỉ là công cụ làm việc, laptop còn góp phần khẳng định phong cách và cá tính của chủ sở hữu.</p><h2 class=\"font-bold my-4 text-2xl\">Pin và khả năng di động – Yếu tố không thể bỏ qua</h2><p>Một chiếc laptop mạnh mẽ nhưng thời lượng pin kém thì khó có thể đáp ứng nhu cầu làm việc cả ngày. Vì vậy, công nghệ pin luôn được các hãng chú trọng phát triển. Laptop hiện nay thường có thể hoạt động từ 8 – 12 tiếng, thậm chí lâu hơn đối với các dòng ultrabook. Bên cạnh đó, tính năng sạc nhanh giúp người dùng tiết kiệm thời gian, chỉ cần 30 phút sạc đã có thể dùng thêm vài giờ. Điều này đặc biệt quan trọng với những ai thường xuyên đi công tác, học tập hoặc làm việc ngoài văn phòng.</p><img class=\"my-4\" src=\"https://res.cloudinary.com/dbpo286fy/image/upload/v1756525581/products/gaming2-1756525578754.webp\" alt=\"gaming2-1756525578754\"><h2 class=\"font-bold my-4 text-2xl\">Phụ kiện công nghệ đi kèm</h2><p>Để trải nghiệm laptop được hoàn thiện, phụ kiện đi kèm đóng vai trò quan trọng. Chuột không dây tiện lợi cho thao tác nhanh gọn, bàn phím cơ mini mang lại cảm giác gõ phím thoải mái, tai nghe chống ồn hỗ trợ tập trung hơn khi làm việc hoặc học tập. Ngoài ra, balo chống sốc hay túi đựng laptop cũng là món đồ cần thiết để bảo vệ thiết bị khi di chuyển. Tất cả tạo nên một hệ sinh thái nhỏ xoay quanh chiếc laptop, biến nó thành “trạm công nghệ di động” phục vụ cho mọi nhu cầu.</p><h2 class=\"font-bold my-4 text-2xl\">Xu hướng laptop trong tương lai</h2><p>Công nghệ laptop vẫn không ngừng thay đổi để đáp ứng cuộc sống ngày càng hiện đại. Trong tương lai, chúng ta sẽ thấy nhiều mẫu laptop tích hợp trí tuệ nhân tạo (AI) giúp tối ưu hiệu năng, màn hình cảm ứng gập lại như tablet, kết nối 5G tốc độ cao, thậm chí là những công nghệ tản nhiệt thông minh giúp máy luôn mát mẻ dù làm việc nặng. Laptop không còn chỉ là công cụ, mà sẽ trở thành một phần trong hệ sinh thái thông minh, đồng bộ với điện thoại, đồng hồ thông minh và các thiết bị khác.</p><h2 class=\"font-bold my-4 text-2xl\">Kết luận</h2><p>Laptop đã vượt xa khỏi khái niệm một chiếc máy tính xách tay thông thường. Nó là nơi lưu giữ kiến thức, công cụ kiếm sống, phương tiện sáng tạo và đôi khi còn là “người bạn” đồng hành qua nhiều giai đoạn cuộc đời. Với tốc độ phát triển của công nghệ, chắc chắn laptop sẽ tiếp tục thay đổi để đáp ứng nhu cầu ngày càng đa dạng của con người. Và với mỗi người, lựa chọn chiếc laptop phù hợp chính là cách đầu tư cho tương lai học tập, công việc và cả niềm vui hàng ngày.</p>','2025-08-30 04:09:00.317','2025-08-30 04:10:51.845','https://res.cloudinary.com/dbpo286fy/image/upload/v1756526650/blogs/blog1-1756526649523.webp'),(7,'GPU – Bộ não đồ họa của kỷ nguyên công nghệ','gpu-bo-nao-do-hoa-cua-ky-nguyen-cong-nghe','GPU – Bộ não đồ họa của kỷ nguyên công nghệ','<p>Đây là nội dung chính</p>','2025-08-30 04:11:59.294','2025-08-30 04:13:38.774','https://res.cloudinary.com/dbpo286fy/image/upload/v1756527214/blogs/blog2-1756527212819.webp');
/*!40000 ALTER TABLE `Blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (2,'GPU','2025-08-05 08:36:12.412','2025-08-28 09:36:37.717'),(4,'Gear','2025-08-07 07:41:29.112','2025-08-28 09:36:33.214'),(5,'Laptop','2025-08-07 07:47:35.398','2025-08-28 09:36:28.215');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Image`
--

DROP TABLE IF EXISTS `Image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Image_url_key` (`url`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Image`
--

LOCK TABLES `Image` WRITE;
/*!40000 ALTER TABLE `Image` DISABLE KEYS */;
INSERT INTO `Image` VALUES (10,'laptop-1','https://res.cloudinary.com/dbpo286fy/image/upload/v1756373900/products/laptop-1-1756373899044.webp','products','2025-08-28 09:38:22.416'),(11,'laptoptjz1-back','https://res.cloudinary.com/dbpo286fy/image/upload/v1756374136/products/laptoptjz1-back-1756374135609.webp','products','2025-08-28 09:42:18.258'),(12,'gear1','https://res.cloudinary.com/dbpo286fy/image/upload/v1756374499/products/gear1-1756374495457.webp','products','2025-08-28 09:48:21.019'),(14,'gpu1','https://res.cloudinary.com/dbpo286fy/image/upload/v1756374606/products/gpu1-1756374603417.webp','products','2025-08-28 09:50:07.785'),(15,'gaming1','https://res.cloudinary.com/dbpo286fy/image/upload/v1756525415/products/gaming1-1756525413373.webp','products','2025-08-30 03:43:37.317'),(16,'gaming2','https://res.cloudinary.com/dbpo286fy/image/upload/v1756525581/products/gaming2-1756525578754.webp','products','2025-08-30 03:46:22.989'),(17,'gpu2','https://res.cloudinary.com/dbpo286fy/image/upload/v1756525645/products/gpu2-1756525643476.webp','products','2025-08-30 03:47:26.970'),(18,'gpu-3','https://res.cloudinary.com/dbpo286fy/image/upload/v1756525800/products/gpu-3-1756525796434.webp','products','2025-08-30 03:50:03.808'),(19,'gear-2','https://res.cloudinary.com/dbpo286fy/image/upload/v1756525918/products/gear-2-1756525916563.webp','products','2025-08-30 03:51:59.434'),(20,'gear-3','https://res.cloudinary.com/dbpo286fy/image/upload/v1756526107/products/gear-3-1756526105747.webp','products','2025-08-30 03:55:08.498'),(21,'blog1','https://res.cloudinary.com/dbpo286fy/image/upload/v1756526650/blogs/blog1-1756526649523.webp','blogs','2025-08-30 04:04:11.601'),(22,'laptop-gaming-tjz002','https://res.cloudinary.com/dbpo286fy/image/upload/v1756527102/blogs/laptop-gaming-tjz002-1756527101251.webp','blogs','2025-08-30 04:11:43.086'),(23,'blog2','https://res.cloudinary.com/dbpo286fy/image/upload/v1756527214/blogs/blog2-1756527212819.webp','blogs','2025-08-30 04:13:36.436');
/*!40000 ALTER TABLE `Image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customerName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerPhone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerEmail` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` int NOT NULL,
  `note` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Order_userId_fkey` (`userId`),
  CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
INSERT INTO `Order` VALUES (13,'Nhật Thanh','0911622262','vuutruongnhatthanh@gmail.com','451/15 Tam Hiệp, Biên Hòa, Đồng Nai',14300000,'Giao gấp','pending','2025-08-28 06:27:39.710','2025-08-28 08:16:27.838',34),(15,'Nhật Thanh','0911622262','vuutruongnhatthanh@gmail.com','451/15 Tam Hiệp, Biên Hòa, Đồng Nai',42300000,NULL,'pending','2025-08-28 08:17:16.795','2025-08-28 08:17:16.795',34),(16,'Nhật Thanh','0911622262','vuutruongnhatthanh@gmail.com','451/15 Tam Hiệp, Biên Hòa, Đồng Nai',600000,NULL,'shipping','2025-08-28 08:51:31.699','2025-08-28 09:18:42.147',34),(17,'Nhật Thanh ADMIN','0911622262','vuutruongnhatthanh@gmail.com','aâ',14300000,'asadsa','confirmed','2025-08-28 08:52:37.645','2025-08-28 09:18:34.218',1),(18,'Nhật Thanh123','0911622262','vuutruongnhatthanh@gmail.com','451/15 Tam Hiệp, Biên Hòa, Đồng Nai',42300000,'asdsad','pending','2025-08-28 09:18:13.480','2025-08-28 09:18:13.480',34);
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderItem`
--

DROP TABLE IF EXISTS `OrderItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderItem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `productId` int DEFAULT NULL,
  `productName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productImage` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderItem_orderId_fkey` (`orderId`),
  KEY `OrderItem_productId_fkey` (`productId`),
  CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderItem`
--

LOCK TABLES `OrderItem` WRITE;
/*!40000 ALTER TABLE `OrderItem` DISABLE KEYS */;
INSERT INTO `OrderItem` VALUES (25,13,NULL,'Sản phẩm 1','https://res.cloudinary.com/dbpo286fy/image/upload/v1754560793/products/logo-1754560790258.webp',1,300000),(26,13,NULL,'LAPTOP MSI 2','https://res.cloudinary.com/dbpo286fy/image/upload/v1754560805/products/catalog_bug3-1754560803012.webp',1,14000000),(31,15,NULL,'Sản phẩm 1','https://res.cloudinary.com/dbpo286fy/image/upload/v1754560793/products/logo-1754560790258.webp',1,300000),(32,15,NULL,'LAPTOP MSI 2','https://res.cloudinary.com/dbpo286fy/image/upload/v1754560805/products/catalog_bug3-1754560803012.webp',3,14000000),(33,16,NULL,'Sản phẩm 1','https://res.cloudinary.com/dbpo286fy/image/upload/v1754560793/products/logo-1754560790258.webp',1,300000),(34,16,NULL,'Logitech 1231','https://res.cloudinary.com/dbpo286fy/image/upload/v1754560793/products/logo-1754560790258.webp',1,300000),(35,17,NULL,'Sản phẩm 1','https://res.cloudinary.com/dbpo286fy/image/upload/v1754560793/products/logo-1754560790258.webp',1,300000),(36,17,NULL,'LAPTOP MSI 2','https://res.cloudinary.com/dbpo286fy/image/upload/v1754560805/products/catalog_bug3-1754560803012.webp',1,14000000),(37,18,NULL,'Sản phẩm 1','https://res.cloudinary.com/dbpo286fy/image/upload/v1754560793/products/logo-1754560790258.webp',1,300000),(38,18,NULL,'LAPTOP MSI 2','https://res.cloudinary.com/dbpo286fy/image/upload/v1754560805/products/catalog_bug3-1754560803012.webp',3,14000000);
/*!40000 ALTER TABLE `OrderItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortDescription` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `categoryId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_url_key` (`url`),
  KEY `Product_categoryId_fkey` (`categoryId`),
  CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (34,'Laptop gaming TJZ1','laptop-gaming-tjz1','Sản phẩm tối ưu hiệu năng và công suất giúp bạn có trải nghiệm mượt mà khi làm việc và chơi game','<h2 class=\"font-bold my-4 text-2xl\"><span style=\"color: rgb(0, 128, 0);\">Laptop gaming TJZ1 - sự lựa chọn hoàn hảo</span></h2><img class=\"my-4\" src=\"https://res.cloudinary.com/dbpo286fy/image/upload/v1756373900/products/laptop-1-1756373899044.webp\" alt=\"laptop-1-1756373899044\"><p><span style=\"color: rgb(0, 128, 0);\"><strong>Laptop gaming TJZ1</strong></span> được thiết kế dành riêng cho những game thủ và người dùng đòi hỏi hiệu năng cao. Máy được trang bị cấu hình mạnh mẽ với bộ vi xử lý thế hệ mới, kết hợp cùng card đồ họa rời tối ưu cho việc chiến các tựa game nặng và xử lý đồ họa chuyên nghiệp. Màn hình có độ phân giải cao, tần số quét mượt mà giúp từng khung hình trở nên sống động, mang lại trải nghiệm thị giác ấn tượng.</p><p>Không chỉ mạnh về hiệu năng, <strong>TJZ1</strong> còn sở hữu thiết kế hiện đại, chắc chắn, cùng hệ thống tản nhiệt thông minh giúp duy trì hiệu suất ổn định trong suốt thời gian dài sử dụng. Bàn phím được thiết kế chuyên dụng cho game thủ, độ nhạy cao và cảm giác gõ thoải mái, hỗ trợ tốt cả trong công việc lẫn giải trí.</p><p><span style=\"color: rgb(0, 0, 0);\"><strong>Laptop gaming TJZ1</strong></span> là sự kết hợp giữa sức mạnh, sự bền bỉ và tính thẩm mỹ, trở thành lựa chọn hoàn hảo cho những ai muốn vừa học tập, làm việc hiệu quả, vừa tận hưởng thế giới game với chất lượng tốt nhất.</p><p></p><img class=\"my-4\" src=\"https://res.cloudinary.com/dbpo286fy/image/upload/v1756374136/products/laptoptjz1-back-1756374135609.webp\" alt=\"laptoptjz1-back-1756374135609\"><p></p><p>Để biết thêm chi tiết và được tư vấn trực tiếp, vui lòng liên hệ <strong>TJZenn – đơn vị cung cấp sản phẩm công nghệ uy tín</strong>.</p><p><a href=\"http://localhost:5173/san-pham\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 no-underline hover:underline cursor-pointer\">Xem ngay các sản phẩm khác tại TJZenn</a></p>',30000000,5,'2025-08-28 09:40:11.806','2025-08-28 09:45:21.733','https://res.cloudinary.com/dbpo286fy/image/upload/v1756373900/products/laptop-1-1756373899044.webp'),(35,'Bộ bàn phím chuột TJZ3000','bo-ban-phim-chuot-tjz3000','Sản phẩm độc quyền tại TJZenn','<p>Sản phẩm độc quyền tại TJZenn</p>',400000,4,'2025-08-28 09:48:52.666','2025-08-28 09:48:52.666','https://res.cloudinary.com/dbpo286fy/image/upload/v1756374499/products/gear1-1756374495457.webp'),(36,'GPU siêu mượt TJZ9000','gpu-sieu-muot-tjz9000','Sản phẩm hiệu năng cao của nhà TJZenn','<p>Sản phẩm hiệu năng cao của nhà TJZenn</p>',3000000,2,'2025-08-28 09:50:39.195','2025-08-28 09:50:39.195','https://res.cloudinary.com/dbpo286fy/image/upload/v1756374606/products/gpu1-1756374603417.webp'),(37,'Laptop gaming TJZ2','laptop-gaming-tjz2','Dòng máy hiệu suất cao phù hợp cho người đi làm văn phòng','<p>Đây là nội dung chính</p>',32000000,5,'2025-08-30 03:44:12.305','2025-08-30 03:44:12.305','https://res.cloudinary.com/dbpo286fy/image/upload/v1756525415/products/gaming1-1756525413373.webp'),(38,'Laptop gaming TJZ3','laptop-gaming-tjz3','Dòng máy hiệu suất cao phù hợp cho người đi làm văn phòng','<p>Đây là nội dung chính</p>',40000000,5,'2025-08-30 03:46:39.686','2025-08-30 03:46:39.686','https://res.cloudinary.com/dbpo286fy/image/upload/v1756525581/products/gaming2-1756525578754.webp'),(39,'GPU TJZ9090','gpu-tjz9090','GPU cực mạnh cho các tác vụ gaming và văn phòng','<p>Đây là nội dung chính</p>',2000000,2,'2025-08-30 03:48:03.774','2025-08-30 03:48:03.774','https://res.cloudinary.com/dbpo286fy/image/upload/v1756525645/products/gpu2-1756525643476.webp'),(40,'GPU TJZ9999','gpu-tjz9999','GPU cực mạnh cho các tác vụ gaming và văn phòng','<p>Đây là nội dung chính</p>',4000000,2,'2025-08-30 03:50:24.264','2025-08-30 03:50:24.264','https://res.cloudinary.com/dbpo286fy/image/upload/v1756525800/products/gpu-3-1756525796434.webp'),(41,'Gear TJZ6193','gear-tjz6193','Gear cực mượt, tiếng gõ cực êm','<p>Đây là nội dung chính</p>',300000,4,'2025-08-30 03:52:26.902','2025-08-30 03:52:26.902','https://res.cloudinary.com/dbpo286fy/image/upload/v1756525918/products/gear-2-1756525916563.webp'),(42,'Gear TJZ6012','gear-tjz6012','Dòng máy hiệu suất cao phù hợp cho người, \"Test file CSV\" đi làm văn phòng','<p>Đây là nội dung chính</p>',250000,4,'2025-08-30 03:56:02.510','2025-09-05 08:45:15.469','https://res.cloudinary.com/dbpo286fy/image/upload/v1756526107/products/gear-3-1756526105747.webp');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'nhatthanh21','$2b$10$W5daBw95ewW5M2Fg6dnVYeulM.rT03ZVMGMwfBlpIYQknM1NAxboO','Nhật Thanh ADMIN','ADMIN','2025-08-05 07:17:34.624','2025-08-07 07:07:47.245',NULL,NULL,NULL),(5,'nguyenvana','$2b$10$yZ1tLOztjxmsfAC6bldyVuwSxYdNRe2ezlLjk3ahAAPaZby6NTIE6','Thiên Phúc','USER','2025-08-05 08:17:40.031','2025-08-05 08:17:40.031',NULL,NULL,NULL),(7,'vuutruongnhatthanh','$2b$10$bsmH2Ls448s3jEw2tVNpK.CioptawzIuD9vpQR3aoUDjSZ9uDcew.','Vưu Trường Nhật Thanh','USER','2025-08-07 04:11:49.952','2025-08-07 04:11:49.952',NULL,NULL,NULL),(9,'thanhvuu@gmail.com','$2b$10$eBsuk4jJnwxjM5VsJAybk.Py07dj5caj.Z2ua84TcGpK3N7o.ygU6','Thanh Vưu','USER','2025-08-07 04:17:40.628','2025-08-07 04:17:40.628',NULL,NULL,NULL),(10,'kaanthienphuc','$2b$10$.5MrTL9T4V5n0i5bSIwT8OE0kzM3RoZICa6KJhrpxPxPi0xceGh/i','Ka Ân Thiên Phúc','USER','2025-08-07 06:43:58.971','2025-08-07 06:43:58.971',NULL,NULL,NULL),(28,'vuutruongnhatthanh123','$2b$10$BOxBuayR4qVsA8A5Xdhgd.89Lfn8f32oRBjQsHcPCVV3XRjL.cWtK','Nhật Thanh','USER','2025-08-07 06:47:33.164','2025-08-07 06:47:33.164',NULL,NULL,NULL),(30,'nguyenvana123','$2b$10$2cOOC0bwEkcsrcGfHAUKLeXw74QbQgvCJ75PzaaeTBHn08MkhSkRu','Nguyễn Văn A','USER','2025-08-07 06:58:52.130','2025-08-07 06:58:52.130',NULL,NULL,NULL),(34,'nhatthanhtest','$2b$10$xNUk4AQkAb0D/8fn2l4FiOvUqc86ChYc2kwa/W.HYMsW1.829C7eu','Nhật Thanh123','USER','2025-08-21 09:42:44.867','2025-08-28 09:06:28.379','451/15 Tam Hiệp, Biên Hòa, Đồng Nai','vuutruongnhatthanh@gmail.com','0911622262');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-06  9:39:40
