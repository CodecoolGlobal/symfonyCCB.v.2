<?php

namespace App\Entity;

use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ImageRepository::class)
 */
class Image
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $post_id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $comment_id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $user_profile_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $path;

    public function getWebPath(){
        return "App/public/static/images".$this->getPath();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPostId(): ?int
    {
        return $this->post_id;
    }

    public function setPostId(?int $post_id): self
    {
        $this->post_id = $post_id;

        return $this;
    }

    public function getCommentId(): ?int
    {
        return $this->comment_id;
    }

    public function setCommentId(?int $comment_id): self
    {
        $this->comment_id = $comment_id;

        return $this;
    }

    public function getUserProfileId(): ?int
    {
        return $this->user_profile_id;
    }

    public function setUserProfileId(?int $user_profile_id): self
    {
        $this->user_profile_id = $user_profile_id;

        return $this;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path): self
    {
        $this->path = $path;

        return $this;
    }
}
