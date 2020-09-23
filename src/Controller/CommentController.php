<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\UserProfile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class CommentController extends AbstractController
{
    /**
     * @Route("/comment/{targetId}/{postId}", name="comment")
     */
    public function index($targetId, $postId)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $creatorProfile = $entityManager->getRepository(UserProfile::class)->find($targetId);
        $creatorLastName = $creatorProfile->getLastName();
        $creatorFirstName = $creatorProfile->getFirstName();
        $comments = $this->getAllComments($postId);

        $post = $this->getDoctrine()->getRepository(Post::class)->findOneBy(['id' => $postId]);


        return $this->render('comment/index.html.twig', [
            'controller_name' => 'CommentController', 'id'=> $postId, 'comments' => $comments, 'creatorFirstName'=> $creatorFirstName,
            'creatorLastName' => $creatorLastName, 'postMessage' => $post->getMessage(),
        ]);
    }

    public function getAllComments($postId)
    {
        $repository = $this->getDoctrine()->getRepository(Comment::class);
        $comments = $repository->findBy(['post_id' => $postId]);
        $counter = 0;
        $finalPostsList = [];
        foreach ($comments as $comment) {

            $tempList = [];
            $tempList += ['message' => $comment->getMessage()];
            $getCreatorInfo = $this->getDoctrine()
                ->getRepository(UserProfile::class)->findOneBy(['id' => $comment->getUserProfileId()]);

            $tempList += ['firstName' => $getCreatorInfo->getFirstName()];
            $tempList += ['lastName' => $getCreatorInfo->getLastName()];

            $finalPostsList += [$counter => $tempList];
            $counter++;

        }
     return $finalPostsList;
    }
}
