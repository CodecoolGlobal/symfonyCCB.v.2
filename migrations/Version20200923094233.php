<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200923094233 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE friend_status');
        $this->addSql('DROP TABLE friends_list');
        $this->addSql('DROP TABLE post');
        $this->addSql('ALTER TABLE image CHANGE id id INT AUTO_INCREMENT NOT NULL, CHANGE path path VARCHAR(255) NOT NULL, ADD PRIMARY KEY (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE comment (id INT NOT NULL, user_profile_id INT NOT NULL, post_id INT NOT NULL, message TEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`, image_id INT DEFAULT NULL, deleted TINYINT(1) DEFAULT \'0\' NOT NULL) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE friend_status (id INT NOT NULL, status VARCHAR(63) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE friends_list (id INT NOT NULL, sender_id INT NOT NULL, receiver_id INT NOT NULL, status INT DEFAULT 3 NOT NULL, deleted TINYINT(1) DEFAULT \'0\' NOT NULL) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE post (id INT NOT NULL, creator_profile_id INT NOT NULL, target_profile_id INT NOT NULL, message TEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`, image_id INT DEFAULT NULL, deleted TINYINT(1) DEFAULT \'0\' NOT NULL) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE image MODIFY id INT NOT NULL');
        $this->addSql('ALTER TABLE image DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE image CHANGE id id INT NOT NULL, CHANGE path path VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'no-user.jpg\' NOT NULL COLLATE `utf8mb4_0900_ai_ci`');
    }
}
