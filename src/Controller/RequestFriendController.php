<?php

namespace App\Controller;

use App\Entity\FriendsList;
use App\Entity\User;
use App\Entity\UserProfile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class RequestFriendController extends AbstractController
{
    /**
     * @Route("/requestfriend", name="request_friend")
     */
    public function index()
    {
        $user = $this->getUser()->getId();
        $userId = ($this->getDoctrine()
            ->getRepository(UserProfile::class)->findOneBy(['user_id' => $user ]))->getId();

        $allFriendsRequest = $this->getAllFriends($userId);

        return $this->render('request_friend/index.html.twig', [
            'controller_name' => 'RequestFriendController', 'allRequest'=> $allFriendsRequest,
        ]);
    }

    public function getAllFriends($wallId)
    {
        $friendsIdBySenderId = $this->getDoctrine()->getRepository(FriendsList::class)->selectAllFriendsBySenderId($wallId, 2);
        $friendsIdByReceiverId = $this->getDoctrine()->getRepository(FriendsList::class)->selectAllFriendsByReceiverId($wallId, 2);
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
