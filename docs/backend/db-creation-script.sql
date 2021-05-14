# Schema: fortunes_landing
USE fortunes_landing;

# Table: prize

DROP TABLE IF EXISTS `prize`;

CREATE TABLE IF NOT EXISTS `prize` (
  `prize_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `description` VARCHAR(100) NULL DEFAULT 'No description available',
  `weight` DECIMAL(10,3) NOT NULL,
  `preset` INT NOT NULL,
  PRIMARY KEY (`prize_id`)
);


# Table: history

DROP TABLE IF EXISTS `history`;

CREATE TABLE IF NOT EXISTS `history` (
  `history_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `prize_id` INT NOT NULL,
  PRIMARY KEY (`history_id`),
  CONSTRAINT `fk_history_prize`
    FOREIGN KEY (`prize_id`)
    REFERENCES `prize` (`prize_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
