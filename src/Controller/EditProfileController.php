<?php

namespace App\Controller;

use App\Entity\Image;
use App\Entity\UserProfile;
use App\Form\EditProfileType;
use App\Services\FileUploader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EditProfileController extends AbstractController
{
    /**
     * @Route("/edit-profile", name="edit_profile")
     * @param FileUploader $uploader
     * @param Request $request
     * @return Response
     */
    public function edit(FileUploader $uploader, Request $request)
    {
        $userRepo = $this->getDoctrine()->getRepository(UserProfile::class);
        $imageRepo = $this->getDoctrine()->getRepository(Image::class);
        $em= $this->getDoctrine()->getManager();
        $userProfile = $userRepo->findOneBy(["user_id"=>$this->getUser()->getId()]);
       $form = $this->createForm(EditProfileType::class,$userProfile);
       $form->handleRequest($request);
       if($form->isSubmitted()&& $form->isValid()){
           $imageFile = $form->get('image')->getData();
           $userProfile = $form->getData();
           $image = new Image();
           if($imageFile){
               $imageName = $uploader->upload($imageFile);
               $image->setPath($imageName);
               $em->persist($image);
               $em->flush();
               $imageId = $imageRepo->findOneBy(["path"=>$imageName])->getId();
               $userProfile->setImage($imageId);
           } elseif($userProfile->getImage() == null) {
               $userProfile->setImage(100);
           }
           $userProfile->setUserId($this->getUser()->getId());
           $userProfile->setDeleted(0);
           $userProfile->setMainProfile(1);
           $em->persist($userProfile);
           $em->flush();
           if($imageFile && $userProfile->getImage() != 100){
               $image->setPath($imageName);
               $image->setUserProfileId($userProfile->getId());
               $em->persist($image);
               $em->flush();
           }
       }
       return $this->render('edit_profile/index.html.twig',["form"=>$form->createView()]);
    }
}
