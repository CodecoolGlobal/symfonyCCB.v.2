<?php

namespace App\Controller;

use App\Entity\FriendsList;
use App\Entity\Image;
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
        $this->denyAccessUnlessGranted("IS_AUTHENTICATED_FULLY");
        $userDetail = $this->getUser()->getId();
        $user = ($this->getDoctrine()
            ->getRepository(UserProfile::class)->findOneBy(['user_id' => $userDetail ]));


        $profileDetails = $this->getDoctrine()
            ->getRepository(UserProfile::class)
            ->findOneBy(['id' => $id]);

        $dbRelation = $this->getDoctrine()->getRepository(FriendsList::class)->selectRelation($user->getId(),$id);
        $relation = 3;
        $relationId = ' ';
        if($profileDetails->getId() != $user->getId()){
            if($dbRelation){
                $relation = $dbRelation['status'];
                $relationId = $dbRelation['id'];
            }
        }

        $posts = $this->getDoctrine()->getRepository(Post::class)->findBy(['target_profile_id'=> $id]);
        $postDetails = $this->getNecessaryInfoByPosts($posts);


        $listDetails =  $this->getDetailsForShow($profileDetails);

        if($user->getId() === $id){
            $image = $this->getDoctrine()->getRepository(Image::class)->findOneBy(["id"=>$user->getImage()])->getWebPath();
        } else {
//            dd($profileDetails);
            $image = $this->getDoctrine()->getRepository(Image::class)->findOneBy(["id"=>$profileDetails->getImage()])->getWebPath();
        }

        return $this->render('wall/index.html.twig', [
            'controller_name' => 'WallController', "profileId" => $id, 'userId' =>$user->getId(), 'profileDetails'=> $profileDetails, 'listDetails' => $listDetails,
            'posts' => $postDetails,
            'image'=>$image,
            'relation'=>$relation,
            'relationId'=>$relationId
        ]);
    }

    /**
     * @Route("/doPost/{id}", name="doPost", methods="POST")
     */
    public function doPost($id,Request $request) : Response
    {
        $this->denyAccessUnlessGranted("IS_AUTHENTICATED_FULLY");
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
