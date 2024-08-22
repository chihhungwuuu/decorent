-- -----------------------------------------------------
-- Schema full-stack-ecommerce
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `decorent_furniture`;

CREATE SCHEMA `decorent_furniture`;
USE `decorent_furniture`;

-- -----------------------------------------------------
-- Table `furniture_ecommerce`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `decorent_furniture`.`product_category` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE=InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table `furniture_ecommerce`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `decorent_furniture`.`product` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `unit_price` INT(8) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `active` BIT DEFAULT 1,
  `units_in_stock` INT(11) DEFAULT NULL,
  `date_created` DATETIME(6) DEFAULT NULL,
  `last_updated` DATETIME(6) DEFAULT NULL,
  `category_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Categories
-- -----------------------------------------------------
INSERT INTO product_category(category_name) VALUES ('沙發');
INSERT INTO product_category(category_name) VALUES ('櫃子');
INSERT INTO product_category(category_name) VALUES ('桌子');
INSERT INTO product_category(category_name) VALUES ('椅子');

-- -----------------------------------------------------
-- 沙發
-- -----------------------------------------------------
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('SOFA-1001', 'L型布沙發','優質天然棉麻布，溫和舒適、親膚透氣，耐磨不起毛球。符合人體工學，適當的倚靠角度，貼合腰部曲線，舒緩脊椎壓力。', 'assets/images/products/sofa-1001.png', 1, 100, 15000, 1, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('SOFA-1002', '雙人沙發', '熱銷推薦款', 'assets/images/products/sofa-1002.png', 1, 100, 3000, 1, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('SOFA-1003', '北歐風雙人沙發', '雙色科技布', 'assets/images/products/sofa-1003.png', 1, 100, 5000, 1, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('SOFA-1004', '三人沙發', '台灣製作', 'assets/images/products/sofa-1004.png', 1, 100, 6000, 1, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('SOFA-1005', '單人電動可躺式沙發', '舒適高質感皮革', 'assets/images/products/sofa-1005.png', 1, 100, 25000, 1, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('SOFA-1006', '雙人沙發', '舒適高質感皮革', 'assets/images/products/sofa-1006.png', 1, 100, 15000, 1, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('SOFA-1007', '雙人座沙發', '日系簡約', 'assets/images/products/sofa-1007.png', 1, 100, 18000, 1, NOW());

-- -----------------------------------------------------
-- 櫃子
-- -----------------------------------------------------
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('CABINET-1001', '木質收納櫃', '五層收納斗櫃', 'assets/images/products/cabinet-1001.png', 1, 100, 3500, 2, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('CABINET-1002', '床頭櫃', '床頭櫃', 'assets/images/products/cabinet-1002.png', 1, 100, 2800, 2, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('CABINET-1003', '衣櫃', '100% 台灣製', 'assets/images/products/cabinet-1003.png', 1, 100, 1999, 2, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('CABINET-1004', '鞋櫃', '四門收納櫃', 'assets/images/products/cabinet-1004.png', 1, 100, 3000, 2, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('CABINET-1005', '書櫃', '木製書櫃', 'assets/images/products/cabinet-1005.png', 1, 100, 4500, 2, NOW());

-- -----------------------------------------------------
-- 桌子
-- -----------------------------------------------------

INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('TABLE-1001', '實木餐桌', '100% 台灣製造', 'assets/images/products/table-1001.png', 1, 100, 9450, 3, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('TABLE-1002', '電腦桌', '現代簡約風格設計', 'assets/images/products/table-1002.png', 1, 100, 19900, 3, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('TABLE-1003', 'L型辦公桌', 'L型辦公桌', 'assets/images/products/table-1003.png', 1, 100, 5000, 3, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('TABLE-1004', '金屬邊桌', '節省空間', 'assets/images/products/table-1004.png', 1, 100, 1800, 3, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('TABLE-1005', '小圓邊桌', '優雅設計', 'assets/images/products/table-1005.png', 1, 100, 17990, 3, NOW());

-- -----------------------------------------------------
-- 椅子
-- -----------------------------------------------------
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('CHAIR-1001', '實木椅', '符合人體工學', 'assets/images/products/chair-1001.png', 1, 100, 12990, 4, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('CHAIR-1002', '餐椅', '現代時尚設計', 'assets/images/products/chair-1002.png', 1, 100, 1120, 4, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('CHAIR-1003', '餐椅', '餐桌椅', 'assets/images/products/chair-1003.png', 1, 100, 19900, 4, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('CHAIR-1004', '辦公室椅', '皮革辦公椅', 'assets/images/products/chair-1004.png', 1, 100, 5000, 4, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('CHAIR-1005', '電腦椅', '人體工學辦公椅', 'assets/images/products/chair-1005.png', 1, 100, 9450, 4, NOW());

