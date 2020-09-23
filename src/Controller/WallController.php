<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\User;
use App\Entity\UserProfile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class WallController extends AbstractController
{
    /**
     * @Route("/wall/{id}", name="wall")
     */
    public function index($id)
    {

        $userDetail = $this->getUser()->getId();
        $userId = ($this->getDoctrine()
            ->getRepository(UserProfile::class)->findOneBy(['user_id' => $userDetail ]))->getId();

        $profileDetails = $this->getDoctrine()
            ->getRepository(UserProfile::class)
            ->findOneBy(['id' => $id]);
        $posts = $this->getDoctrine()->getRepository(Post::class)->findBy(['target_profile_id'=> $id]);
        $postDetails = $this->getNecessaryInfoByPosts($posts);


        $listDetails =  $this->getDetailsForShow($profileDetails);

        return $this->render('wall/index.html.twig', [
            'controller_name' => 'WallController', "profileId" => $id, 'userId' =>$userId, 'profileDetails'=> $profileDetails, 'listDetails' => $listDetails,
            'posts' => $postDetails
        ]);
    }

    /**
     * @Route("/doPost/{id}", name="doPost", methods="POST")
     */
    public function doPost($id,Request $request) : Response
    {
        $userDetail = $this->getUser()->getId();

        $creatorProf= $this->getDoctrine()->getRepository(UserProfile::class)->findOneBy(['user_id' => $userDetail]);
//        dd($creatorProf);
        $message = $request->request->get('message');
        $entityManager = $this->getDoctrine()->getManager();

        $post = new Post();
        $post->setCreatorProfileId($creatorProf->getId());
        $post->setTargetProfileId($id);
        $post->setMessage($message);
        $post->setImageId(6);
        $post->setDeleted(0);

        $entityManager->persist($post);
        $entityManager->flush();

        return $this->redirect("/wall/".$id, 301);

    }

    public function getDetailsForShow($profInfo)
    {
        $tempList = [];
        if($profInfo->getBirthdate() != null ){
            $birthDate =$profInfo->getBirthdate();
            $tempList += ["Birthdate" => $birthDate->format('d-m-Y')];
        }
        if($profInfo->getCity() != null ){
            $tempList += ["City" => $profInfo->getCity()];
        }
        if($profInfo->getCountry() != null ){
            $tempList += ["Country" => $profInfo->getCountry()];
        }
        if($profInfo->getHobby() != null ){
            $tempList += ["Hobby" => $profInfo->getHobby()];
        }
        if($profInfo->getWorkplace() != null ){
            $tempList += ["Workplace" => $profInfo->getWorkplace()];
        }
        if($profInfo->getStudies() != null ){
            $tempList += ["Studies" => $profInfo->getStudies()];
        }

        return $tempList;
    }

    public function getNecessaryInfoByPosts($posts)
    {
        $counter =0;
        $finalPostsList =[];
        foreach ($posts as $post){

            $tempList = [];
            $tempList += ['id'=> $post->getId()];
            $tempList += ['message'=> $post->getMessage()];
            $tempList += ['creatorId'=> $post->getCreatorProfileId()];
            $getCreatorInfo = $this->getDoctrine()
                ->getRepository(UserProfile::class)->findOneBy(['id' => $post->getCreatorProfileId() ]);

            $tempList += ['firstName'=> $getCreatorInfo->getFirstName()];
            $tempList += ['lastName'=> $getCreatorInfo->getLastName()];

            $finalPostsList += [$counter => $tempList];
            $counter++;

    }

        return $finalPostsList;
    }
}
