<?php

namespace App\Controller;

use App\Entity\FriendsList;
use App\Entity\UserProfile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class FriendsController extends AbstractController
{
    /**
     * @Route("/friends/{wallId}", name="friends")
     */
    public function index($wallId)
    {

        $allFriends = $this->getAllFriends($wallId);
        return $this->render('friends/index.html.twig', [
            'controller_name' => 'FriendsController', 'friends' => $allFriends,
        ]);
    }

    public function getAllFriends($wallId)
    {
        $friendsIdBySenderId = $this->getDoctrine()->getRepository(FriendsList::class)->selectAllFriendsBySenderId($wallId);
        $friendsIdByReceiverId = $this->getDoctrine()->getRepository(FriendsList::class)->selectAllFriendsByReceiverId($wallId);
        $allFriendsId = array_merge($friendsIdBySenderId, $friendsIdByReceiverId);
        $allFriendsProfile = [];
        foreach (array_merge($allFriendsId) as $arr) {
            {

                foreach ($arr as $id) {

                    $bla = $this->getDoctrine()
                        ->getRepository(UserProfile::class)
                        ->findOneBy(['id' => $id]);
                    array_push($allFriendsProfile, $bla);

                }
            }
        }

        return $allFriendsProfile;
    }
}