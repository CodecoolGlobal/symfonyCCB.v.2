<?php

namespace App\Repository;

use App\Entity\UserProfile;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserProfile|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserProfile|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserProfile[]    findAll()
 * @method UserProfile[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserProfileRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserProfile::class);
    }

    // /**
    //  * @return UserProfile[] Returns an array of UserProfile objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    public function searchFriends($searchValue)
    {
        $conn = $this->getEntityManager()->getConnection();

//        $sql = "SELECT * FROM user_profile up
//                LEFT JOIN image i
//                ON up.image = i.user_profile_id
//                WHERE first_name LIKE :var OR last_name LIKE :var";

        $sql = "SELECT * FROM user_profile up
                WHERE first_name LIKE :var OR last_name LIKE :var";

        $stmt = $conn->prepare($sql);
        $stmt->execute(array('var' => '%'.$searchValue.'%'));
        return $stmt->fetchAllAssociative();
    }

    /*
    public function findOneBySomeField($value): ?UserProfile
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
