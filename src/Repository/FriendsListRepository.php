<?php

namespace App\Repository;

use App\Entity\FriendsList;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use phpDocumentor\Reflection\Types\This;

/**
 * @method FriendsList|null find($id, $lockMode = null, $lockVersion = null)
 * @method FriendsList|null findOneBy(array $criteria, array $orderBy = null)
 * @method FriendsList[]    findAll()
 * @method FriendsList[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FriendsListRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FriendsList::class);
    }

    // /**
    //  * @return FriendsList[] Returns an array of FriendsList objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?FriendsList
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    public function selectAllFriendsBySenderId($wallId, $statusId) : array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
        SELECT receiver_id FROM friends_list f
        WHERE f.status = :statusId
        AND f.sender_id = :wallId
        ';
        $stmt = $conn->prepare($sql);
        $stmt->execute(['wallId' => $wallId, 'statusId' => $statusId]);
            return $stmt->fetchAll();

    }
    public function selectAllFriendsByReceiverId($wallId, $statusId) : array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
        SELECT sender_id FROM friends_list f
        WHERE f.status = :statusId 
        AND f.receiver_id = :wallId
        ';
        $stmt = $conn->prepare($sql);
        $stmt->execute(['wallId' => $wallId, 'statusId' => $statusId]);
        return $stmt->fetchAll();

    }

}
