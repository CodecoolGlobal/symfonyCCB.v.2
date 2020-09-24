<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200924134643 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE friend_status');
        $this->addSql('ALTER TABLE comment CHANGE message message VARCHAR(255) NOT NULL, CHANGE deleted deleted INT NOT NULL');
        $this->addSql('ALTER TABLE friends_list CHANGE status status INT NOT NULL, CHANGE deleted deleted INT NOT NULL');
        $this->addSql('ALTER TABLE post CHANGE message message VARCHAR(255) NOT NULL, CHANGE deleted deleted INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE friend_status (id INT NOT NULL, status VARCHAR(63) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE comment CHANGE message message TEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`, CHANGE deleted deleted TINYINT(1) DEFAULT \'0\' NOT NULL');
        $this->addSql('ALTER TABLE friends_list CHANGE status status INT DEFAULT 3 NOT NULL, CHANGE deleted deleted TINYINT(1) DEFAULT \'0\' NOT NULL');
        $this->addSql('ALTER TABLE post CHANGE message message TEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`, CHANGE deleted deleted TINYINT(1) DEFAULT \'0\' NOT NULL');
    }
}
