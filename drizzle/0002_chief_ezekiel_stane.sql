ALTER TABLE `deals` MODIFY COLUMN `stage` enum('lead','initial_review','due_diligence','negotiation','offer_submitted','closing') NOT NULL;--> statement-breakpoint
ALTER TABLE `deals` ADD `sdeMargin` float;--> statement-breakpoint
ALTER TABLE `deals` ADD `aiPotential` int;--> statement-breakpoint
ALTER TABLE `deals` ADD `certAdvantage` int;--> statement-breakpoint
ALTER TABLE `deals` ADD `opportunityZone` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `deals` ADD `notes` text;