<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class SearchFriendsController extends AbstractController
{
    /**
     * @Route("/search/friends/", name="search_friends")
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {

        $searchName = $request->query->get('searchValue');

        $categoryRepository = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:UserProfile');

        $friends = $categoryRepository->searchFriends($searchName);


        return $this->render('search_friends/index.html.twig', [
            'controller_name' => 'SearchFriendsController',
            'friends' => $friends
        ]);
    }

}
