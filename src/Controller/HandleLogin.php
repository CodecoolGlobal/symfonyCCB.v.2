<?php


    namespace App\Controller;


    use App\Entity\UserProfile;
    use phpDocumentor\Reflection\Types\This;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;

    class HandleLogin extends AbstractController
    {
        /**
         * @Route("/handleLogin", name="handle_login")
         */
        public function handleLogin(){
            $userId = $this->getUser()->getId();
            $userProfile = $this->getDoctrine()->getRepository(UserProfile::class)->findOneBy(["user_id"=>$userId]);
            if($userProfile){
                return $this->redirectToRoute("wall",['id'=>$userProfile->getId()]);
            } else {
                return $this->redirectToRoute("edit_profile");
            }
        }
    }