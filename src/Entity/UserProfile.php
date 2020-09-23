<?php

    namespace App\Entity;

    use App\Repository\UserProfileRepository;
    use Doctrine\ORM\Mapping as ORM;

    /**
     * @ORM\Entity(repositoryClass=UserProfileRepository::class)
     */
    class UserProfile
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
        private $user_id;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $first_name;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $last_name;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $country;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $city;

        /**
         * @ORM\Column(type="integer",nullable=true)
         */
        private $image;
        /**
         * @ORM\Column(type="string", length=255, nullable=true)
         */
        private $hobby;

        /**
         * @ORM\Column(type="date")
         */
        private $birthdate;

        /**
         * @ORM\Column(type="string", length=255, nullable=true)
         */
        private $workplace;

        /**
         * @ORM\Column(type="string", length=255, nullable=true)
         */
        private $studies;

        /**
         * @ORM\Column(type="smallint")
         */
        private $main_profile;

        /**
         * @ORM\Column(type="smallint")
         */
        private $deleted;

        public function getId(): ?int
        {
            return $this->id;
        }

        public function getUserId(): ?int
        {
            return $this->user_id;
        }

        public function setUserId(int $user_id): self
        {
            $this->user_id = $user_id;

            return $this;
        }

        public function getFirstName(): ?string
        {
            return $this->first_name;
        }

        public function setFirstName(?string $first_name): self
        {
            $this->first_name = $first_name;

            return $this;
        }

        public function getLastName(): ?string
        {
            return $this->last_name;
        }

        public function setLastName(?string $last_name): self
        {
            $this->last_name = $last_name;

            return $this;
        }

        public function getCountry(): ?string
        {
            return $this->country;
        }

        public function setCountry(?string $country): self
        {
            $this->country = $country;

            return $this;
        }

        public function getCity(): ?string
        {
            return $this->city;
        }

        public function setCity(?string $city): self
        {
            $this->city = $city;

            return $this;
        }

        public function getImage(): ?int
        {
            return $this->image;
        }

        public function setImage(int $image_id): self
        {
            $this->image= $image_id;

            return $this;
        }

        public function getHobby(): ?string
        {
            return $this->hobby;
        }

        public function setHobby(?string $hobby): self
        {
            $this->hobby = $hobby;

            return $this;
        }

        public function getBirthdate(): ?\DateTimeInterface
        {
            return $this->birthdate;
        }

        public function setBirthdate(?\DateTimeInterface $birthdate): self
        {
            $this->birthdate = $birthdate;

            return $this;
        }

        public function getWorkplace(): ?string
        {
            return $this->workplace;
        }

        public function setWorkplace(?string $workplace): self
        {
            $this->workplace = $workplace;

            return $this;
        }

        public function getStudies(): ?string
        {
            return $this->studies;
        }

        public function setStudies(?string $studies): self
        {
            $this->studies = $studies;

            return $this;
        }

        public function getMainProfile(): ?int
        {
            return $this->main_profile;
        }

        public function setMainProfile(int $main_profile): self
        {
            $this->main_profile = $main_profile;

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
