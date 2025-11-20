CREATE TABLE `chatMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`propertyContext` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `deals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`price` int NOT NULL,
	`stage` enum('lead','initial_contact','due_diligence','negotiation','loi_submitted','closing') NOT NULL,
	`score` int,
	`contactName` varchar(255),
	`contactType` varchar(50),
	`lastContact` timestamp,
	`nextAction` varchar(255),
	`revenue` int,
	`cashFlow` int,
	`industry` varchar(100),
	`location` varchar(255),
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `deals_id` PRIMARY KEY(`id`)
);
