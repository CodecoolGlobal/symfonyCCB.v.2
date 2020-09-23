<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\UserProfile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
            'creatorLastName' => $creatorLastName, 'postMessage' => $post->getMessage(), 'targetId' => $targetId, 'wallId' => $post->getTargetProfileId(),
        ]);
    }

    /**
     * @Route("/doComment/{targetId}/{postId}", name="doComment", methods="POST")
     */
    public function doComment($targetId, $postId,Request $request) : Response
    {
        $userDetail = $this->getUser()->getId();
        $creatorProf= $this->getDoctrine()->getRepository(UserProfile::class)->findOneBy(['user_id' => $userDetail]);

        $message = $request->request->get('message');

        $entityManager = $this->getDoctrine()->getManager();

        $comment = new Comment();

        $comment->setUserProfileId($creatorProf->getId());
        $comment->setPostId($postId);
        $comment->setMessage($message);
        $comment->setImageId(6);
        $comment->setDeleted(0);

        $entityManager->persist($comment);
        $entityManager->flush();

        return $this->redirect("/comment/".$targetId."/".$postId, 301);

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
            $tempList += ['creatorId' => $getCreatorInfo->getId()];
            $finalPostsList += [$counter => $tempList];
            $counter++;

        }

     return $finalPostsList;
    }
}
