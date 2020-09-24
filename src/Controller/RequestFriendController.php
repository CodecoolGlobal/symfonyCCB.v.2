<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class RequestFriendController extends AbstractController
{
    /**
     * @Route("/requestfriend", name="request_friend")
     */
    public function index()
    {
        $user = $this->getUser();


        return $this->render('request_friend/index.html.twig', [
            'controller_name' => 'RequestFriendController',
        ]);
    }
}
