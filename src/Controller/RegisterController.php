<?php


    namespace App\Controller;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use App\Entity\User;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\HttpFoundation\Request;


    class RegisterController extends AbstractController
    {
        /**
         * @Route ("/register", name="register", methods={"POST","GET"})
         */
        public function index():Response{

                return $this->render('register/register.html.twig');

        }

    }