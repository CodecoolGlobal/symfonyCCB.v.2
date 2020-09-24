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

    /**
     * @Route("/acceptrequest/{requestId}", name="acceptrequest")
     */
    public function acceptRequest($requestId)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $friendRequest = $entityManager->getRepository(FriendsList::class)->findOneBy(['id' => $requestId]);

        $friendRequest->setStatus(1);
        $entityManager->flush();

        return $this->redirect("/requestfriend", 301);
    }

    public function getAllFriends($wallId)
    {
        $friendsIdBySenderId = $this->getDoctrine()->getRepository(FriendsList::class)->selectAllFriendsByReceiverId($wallId, 2);

        $allFriendsProfile = [];

        foreach ($friendsIdBySenderId as $senderId) {
            {

                    $friendRequestId = ($this->getDoctrine()->getRepository(FriendsList::class)->findOneBy(['sender_id'=> $senderId, 'receiver_id'=>110]))->getId();

                    $bla = $this->getDoctrine()
                        ->getRepository(UserProfile::class)
                        ->findOneBy(['id' => $senderId]);
                    $bla->requestId = $friendRequestId;

                    array_push($allFriendsProfile, $bla);


            }
        }

        return $allFriendsProfile;
    }
}
