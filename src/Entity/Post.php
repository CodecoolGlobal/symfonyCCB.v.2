<?php

namespace App\Entity;

use App\Repository\PostRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PostRepository::class)
 */
class Post
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
    private $creator_profile_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $target_profile_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $message;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $image_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $deleted;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatorProfileId(): ?int
    {
        return $this->creator_profile_id;
    }

    public function setCreatorProfileId(int $creator_profile_id): self
    {
        $this->creator_profile_id = $creator_profile_id;

        return $this;
    }

    public function getTargetProfileId(): ?int
    {
        return $this->target_profile_id;
    }

    public function setTargetProfileId(int $target_profile_id): self
    {
        $this->target_profile_id = $target_profile_id;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getImageId(): ?int
    {
        return $this->image_id;
    }

    public function setImageId(?int $image_id): self
    {
        $this->image_id = $image_id;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDeleted()
    {
        return $this->deleted;
    }

    /**
     * @param mixed $deleted
     */
    public function setDeleted($deleted): void
    {
        $this->deleted = $deleted;
    }


}
