<?php

namespace App\Form;

use App\Entity\UserProfile;
use App\Form\EventListener\AddFields;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EditProfileType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
//            ->add('first_name')
//            ->add('last_name')
            ->add('country')
            ->add('city')
//            ->add('image',FileType::class,["label"=>"Profile image","mapped"=>false,"required"=>false])
            ->add('hobby')
//            ->add('birthdate')
            ->add('workplace')
            ->add('studies')
            ->add('image',FileType::class,["label"=>"Profile image","mapped"=>false,"required"=>false]);

        ;
        $builder->addEventSubscriber(new AddFields());
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => UserProfile::class,
        ]);
    }
}
