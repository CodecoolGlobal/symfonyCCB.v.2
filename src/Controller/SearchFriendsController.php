<?php

namespace App\Controller;

use App\Entity\Image;
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
        for($i=0;$i<count($friends);$i++){
            $imagePath = $this->getDoctrine()->getRepository(Image::class)->findOneBy(['id'=>$friends[$i]['image']])->getPath();
           $friends[$i]['path'] = $imagePath;
        }



        return $this->render('search_friends/index.html.twig', [
            'controller_name' => 'SearchFriendsController',
            'friends' => $friends
        ]);
    }

}
