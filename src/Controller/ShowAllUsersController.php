<?php

namespace App\Controller;

use App\Entity\UserProfile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ShowAllUsersController extends AbstractController
{
    /**
     * @Route("/show/all/users", name="show_all_users")
     */
    public function index()
    {
        $users = $this->getDoctrine()->getRepository(UserProfile::class)->findAll();
        return $this->render('show_all_users/index.html.twig', [
            'controller_name' => 'ShowAllUsersController',
            'users' => $users
        ]);
    }
}
