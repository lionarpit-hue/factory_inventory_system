CREATE TABLE `comparativeSheetQuotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sheetId` int NOT NULL,
	`itemId` int NOT NULL,
	`partyId` int NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	`rate` decimal(12,2) NOT NULL,
	`total` decimal(12,2) NOT NULL,
	`leadTime` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `comparativeSheetQuotes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comparativeSheets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sheetNo` varchar(50) NOT NULL,
	`indentId` int NOT NULL,
	`status` enum('draft','finalized') NOT NULL DEFAULT 'draft',
	`selectedPartyId` int,
	`remarks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comparativeSheets_id` PRIMARY KEY(`id`),
	CONSTRAINT `comparativeSheets_sheetNo_unique` UNIQUE(`sheetNo`)
);
--> statement-breakpoint
CREATE TABLE `departments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `departments_id` PRIMARY KEY(`id`),
	CONSTRAINT `departments_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `directPurchaseItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dpId` int NOT NULL,
	`itemId` int NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	`rate` decimal(12,2) NOT NULL,
	`total` decimal(12,2) NOT NULL,
	`receivedQuantity` decimal(10,2) DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `directPurchaseItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `directPurchases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dpNo` varchar(50) NOT NULL,
	`partyId` int NOT NULL,
	`dpDate` datetime NOT NULL,
	`totalAmount` decimal(12,2) NOT NULL,
	`status` enum('draft','issued','received','cancelled') NOT NULL DEFAULT 'draft',
	`remarks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `directPurchases_id` PRIMARY KEY(`id`),
	CONSTRAINT `directPurchases_dpNo_unique` UNIQUE(`dpNo`)
);
--> statement-breakpoint
CREATE TABLE `ginItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ginId` int NOT NULL,
	`itemId` int NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	`remarks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ginItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `goodsIssueNotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ginNo` varchar(50) NOT NULL,
	`departmentId` int NOT NULL,
	`ginDate` datetime NOT NULL,
	`issuedBy` int,
	`purpose` text,
	`status` enum('draft','issued','received') NOT NULL DEFAULT 'draft',
	`remarks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `goodsIssueNotes_id` PRIMARY KEY(`id`),
	CONSTRAINT `goodsIssueNotes_ginNo_unique` UNIQUE(`ginNo`)
);
--> statement-breakpoint
CREATE TABLE `goodsReceivedNotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`grnNo` varchar(50) NOT NULL,
	`poId` int NOT NULL,
	`grnDate` datetime NOT NULL,
	`receivedBy` int,
	`status` enum('draft','received','inspected','accepted','rejected') NOT NULL DEFAULT 'draft',
	`remarks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `goodsReceivedNotes_id` PRIMARY KEY(`id`),
	CONSTRAINT `goodsReceivedNotes_grnNo_unique` UNIQUE(`grnNo`)
);
--> statement-breakpoint
CREATE TABLE `grnItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`grnId` int NOT NULL,
	`poItemId` int NOT NULL,
	`itemId` int NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	`condition` enum('good','damaged','partial') NOT NULL DEFAULT 'good',
	`remarks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `grnItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `indentItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`indentId` int NOT NULL,
	`itemId` int NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	`remarks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `indentItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `indents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`indentNo` varchar(50) NOT NULL,
	`departmentId` int NOT NULL,
	`status` enum('draft','submitted','approved','rejected') NOT NULL DEFAULT 'draft',
	`approvedBy` int,
	`approvalDate` datetime,
	`remarks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `indents_id` PRIMARY KEY(`id`),
	CONSTRAINT `indents_indentNo_unique` UNIQUE(`indentNo`)
);
--> statement-breakpoint
CREATE TABLE `itemGroups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `itemGroups_id` PRIMARY KEY(`id`),
	CONSTRAINT `itemGroups_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(50) NOT NULL,
	`name` varchar(150) NOT NULL,
	`description` text,
	`unitId` int NOT NULL,
	`itemGroupId` int NOT NULL,
	`reorderLevel` decimal(10,2) DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `items_id` PRIMARY KEY(`id`),
	CONSTRAINT `items_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `parties` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(150) NOT NULL,
	`type` enum('supplier','vendor','contractor') NOT NULL,
	`contactPerson` varchar(100),
	`email` varchar(100),
	`phone` varchar(20),
	`address` text,
	`city` varchar(50),
	`state` varchar(50),
	`pincode` varchar(10),
	`gstin` varchar(20),
	`bankAccount` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `parties_id` PRIMARY KEY(`id`),
	CONSTRAINT `parties_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `purchaseOrderItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`poId` int NOT NULL,
	`itemId` int NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	`rate` decimal(12,2) NOT NULL,
	`total` decimal(12,2) NOT NULL,
	`receivedQuantity` decimal(10,2) DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `purchaseOrderItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `purchaseOrders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`poNo` varchar(50) NOT NULL,
	`comparativeSheetId` int,
	`partyId` int NOT NULL,
	`poDate` datetime NOT NULL,
	`deliveryDate` datetime,
	`totalAmount` decimal(12,2) NOT NULL,
	`status` enum('draft','issued','partial_received','received','cancelled') NOT NULL DEFAULT 'draft',
	`remarks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `purchaseOrders_id` PRIMARY KEY(`id`),
	CONSTRAINT `purchaseOrders_poNo_unique` UNIQUE(`poNo`)
);
--> statement-breakpoint
CREATE TABLE `stockLevels` (
	`id` int AUTO_INCREMENT NOT NULL,
	`itemId` int NOT NULL,
	`currentStock` decimal(10,2) NOT NULL DEFAULT '0',
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `stockLevels_id` PRIMARY KEY(`id`),
	CONSTRAINT `stockLevels_itemId_unique` UNIQUE(`itemId`)
);
--> statement-breakpoint
CREATE TABLE `stockMovements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`itemId` int NOT NULL,
	`movementType` enum('grn','gin','adjustment') NOT NULL,
	`referenceId` int,
	`referenceType` varchar(50),
	`quantity` decimal(10,2) NOT NULL,
	`remarks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `stockMovements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `units` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `units_id` PRIMARY KEY(`id`),
	CONSTRAINT `units_name_unique` UNIQUE(`name`)
);
