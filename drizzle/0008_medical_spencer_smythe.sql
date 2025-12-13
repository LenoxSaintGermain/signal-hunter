ALTER TABLE `deals` ADD `visualsContext` text;--> statement-breakpoint
ALTER TABLE `deals` ADD `narrativeTemplate` enum('default','property_value_add','business_cash_flow','development_play') DEFAULT 'default';--> statement-breakpoint
ALTER TABLE `deals` ADD `originalSourceUrl` text;