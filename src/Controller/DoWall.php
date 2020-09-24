<?php


namespace App\Controller;


use App\Entity\UserProfile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DoWall extends AbstractController
{
    /**
     * @Route("/do-wall", name="do_wall")
     */
    public function doWall(){

        $userId = $this->getUser()->getId();
        $profileId = ($this->getDoctrine()->getRepository(UserProfile::class)->findOneBy(['user_id' => $userId]))->getId();

        return $this->redirect("/wall/".$profileId, 301);
    }
}