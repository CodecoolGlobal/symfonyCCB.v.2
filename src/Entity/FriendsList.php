<?php

namespace App\Entity;

use App\Repository\FriendsListRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=FriendsListRepository::class)
 */
class FriendsList
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $sneder_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $reciver_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $status;

    /**
     * @ORM\Column(type="integer")
     */
    private $deleted;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSnederId(): ?int
    {
        return $this->sneder_id;
    }

    public function setSnederId(int $sneder_id): self
    {
        $this->sneder_id = $sneder_id;

        return $this;
    }

    public function getReciverId(): ?int
    {
        return $this->reciver_id;
    }

    public function setReciverId(int $reciver_id): self
    {
        $this->reciver_id = $reciver_id;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getDeleted(): ?int
    {
        return $this->deleted;
    }

    public function setDeleted(int $deleted): self
    {
        $this->deleted = $deleted;

        return $this;
    }
}
