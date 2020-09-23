<?php


    namespace App\Controller;

    use App\Entity\Image;
    use App\Entity\UserProfile;
    use App\Form\UserProfileType;
    use App\Services\FileUploader;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;

    class RegisterProfileController extends AbstractController
    {
        /**
         * @Route("/registerProfile",name="app_register_profile",methods={"GET","POST"})
         * @param Request $request
         * @return Response
         */
        public function renderTemplate(Request $request, FileUploader $uploader)
        {
            $form = $this->createForm(UserProfileType::class);
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
                $userProfile = $form->getData();
                $image = new Image();
                $imageFile = $form->get('image')->getData();
                $imagePath = $uploader->upload($imageFile);
                $image->setPath($imagePath);
                $profileManager = $this->getDoctrine()->getManager();
                $profileManager->persist($image);
                $profileManager->flush();
                $userProfile->setImage($image->getId());
                $userProfile->setUserId($this->getUser()->getId());
                $userProfile->setMainProfile(1);
                $userProfile->setDeleted(0);
                $profileManager->persist($userProfile);
                $profileManager->flush();
                $image->setUserProfileId($userProfile->getId());
                $profileManager->flush();
                $this->addFlash('notice',"Profile succesfully created");
                return $this->redirectToRoute('app_login');

            }

            return $this->render('registerProfile/registerProfile.html.twig', ['form' => $form->createView()]);
        }


    }
