<?php


    namespace App\Controller;


    use App\Entity\FriendsList;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\RedirectResponse;
    use Symfony\Component\Routing\Annotation\Route;

    class ManageRelation extends AbstractController
    {
        /**
         * @Route("/addFriend/{wallId}/{senderId}/{relationId}", name="app_add_friend")
         * @param $wallId
         * @param $senderId
         * @param $relationId
         * @return RedirectResponse
         */
        public function addFriend($wallId,$senderId,$relationId){
            if(!$relationId == null){
                $friendList = $this->getDoctrine()->getRepository(FriendsList::class)->find(['id'=>$relationId]);
                $friendList->setStatus(2);
                $em = $this->getDoctrine()->getManager();
                $em->persist($friendList);
                $em->flush();
            } else {
                $friendList = new FriendsList();
                $friendList->setReceiverId($wallId);
                $friendList->setSenderId($senderId);
                $friendList->setStatus(2);
                $friendList->setDeleted(0);
                $em = $this->getDoctrine()->getManager();
                $em->persist($friendList);
                $em->flush();
            }
            return $this->redirectToRoute('wall',['id'=>$wallId]);
        }

        /**
         * @Route("/deleteFriend/{wallId}/{senderId}/{relationId}", name="app_delete_friend")
         * @return RedirectResponse
         */
        public function deleteFriend($wallId,$senderId,$relationId){
            $friendList = $this->getDoctrine()->getRepository(FriendsList::class)->findOneBy(['id'=>$relationId]);
            $friendList->setStatus(4);
            $em = $this->getDoctrine()->getManager();
            $em->persist($friendList);
            $em->flush();
            return $this->redirectToRoute('wall',['id'=>$wallId]);
        }

        /**
         * @Route("/acceptFriend/{wallId}/{relationId}", name="app_accept_friend")
         * @return RedirectResponse
         */
        public function acceptFriend($wallId,$relationId){
            $friendList = $this->getDoctrine()->getRepository(FriendsList::class)->findOneBy(['id'=>$relationId]);
            $friendList->setStatus(1);
            $em = $this->getDoctrine()->getManager();
            $em->persist($friendList);
            $em->flush();
            return $this->redirectToRoute('wall',['id'=>$wallId]);
        }




    }