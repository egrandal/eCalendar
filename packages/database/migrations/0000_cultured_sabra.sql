CREATE TABLE `booking_pages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(120) NOT NULL,
	`title` varchar(200) NOT NULL,
	`duration_minutes` int NOT NULL DEFAULT 30,
	`timezone` varchar(64) NOT NULL DEFAULT 'Europe/Madrid',
	`active` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `booking_pages_id` PRIMARY KEY(`id`),
	CONSTRAINT `booking_pages_slug_unique` UNIQUE(`slug`)
);
