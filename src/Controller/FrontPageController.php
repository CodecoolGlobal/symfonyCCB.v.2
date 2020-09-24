<?php

namespace App\Controller;

use App\Entity\UserProfile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;


class FrontPageController extends AbstractController
{
    /**
     * @Route("/", name="front_page", name="home_page", methods={"GET"})
     */
    public function homePage()
    {
        if($this->isGranted('IS_AUTHENTICATED_FULLY'))
        {
            $userId = $this->getUser()->getId();
            $profileId = $this->getDoctrine()->getRepository(UserProfile::class)->findOneBy(['user_id' => $userId]);



            $this->get('twig')->addGlobal('navProfileId', $profileId);

            return $this->render('front_page/index.html.twig', [
                'controller_name' => 'FrontPageController',
                'profileId' => $profileId ? $profileId->getId(): null
            ]);
        }

        return $this->render('front_page/index.html.twig', [
            'controller_name' => 'FrontPageController',
        ]);
    }

}
