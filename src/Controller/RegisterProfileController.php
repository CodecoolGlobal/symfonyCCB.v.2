<?php


    namespace App\Controller;

    use App\Entity\Image;
    use App\Entity\UserProfile;
    use App\Form\UserProfileType;
    use App\Services\FileUploader;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\Routing\Annotation\Route;

    class RegisterProfileController extends AbstractController
    {
        /**
         * @Route("/registerProfile",name="app_register_profile",methods={"GET","POST"})
         * @param Request $request
         * @return \Symfony\Component\HttpFoundation\Response
         */
        public function renderTemplate(Request $request, FileUploader $uploader)
        {
            $userProfile = new UserProfile();
            $form = $this->createForm(UserProfileType::class);
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
                $data = $form->getData();
                dd($data);
                $image = new Image();
                $image->setPath($data['image']);

            }

            return $this->render('registerProfile/registerProfile.html.twig', ['form' => $form->createView()]);
        }


    }
