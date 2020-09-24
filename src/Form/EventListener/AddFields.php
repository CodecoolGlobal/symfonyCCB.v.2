<?php


    namespace App\Form\EventListener;


    use Symfony\Component\Form\Extension\Core\Type\DateType;
    use Symfony\Component\EventDispatcher\EventSubscriberInterface;
    use Symfony\Component\Form\Extension\Core\Type\FileType;
    use Symfony\Component\Form\Extension\Core\Type\SubmitType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormEvent;
    use Symfony\Component\Form\FormEvents;
    use Symfony\Component\Validator\Constraints\Date;

    class AddFields implements EventSubscriberInterface
    {
        public static function getSubscribedEvents()
        {
            // Tells the dispatcher that you want to listen on the form.pre_set_data
            // event and that the preSetData method should be called.
            return [FormEvents::PRE_SET_DATA => 'preSetData'];
        }

        public function preSetData(FormEvent $event)
        {
            $userProfile = $event->getData();
            $form = $event->getForm();

            if (!$userProfile || null === $userProfile->getId()) {
                $form->add('first_name', TextType::class);
                $form->add('last_name', TextType::class);
                $form->add('last_name', TextType::class);
                $form->add('birthdate',DateType::class, ['years' => range(1920, (int) date('Y'))]);
                $form->add('save',SubmitType::class,['label'=>"Save"]);
            } else {
                $form->add('first_name', TextType::class,["disabled"=>true]);
                $form->add('last_name', TextType::class,["disabled"=>true]);
                $form->add('last_name', TextType::class,["disabled"=>true]);
                $form->add('birthdate',DateType::class,["disabled"=>true]);
                $form->add('save',SubmitType::class,['label'=>"Save"]);
            }
        }
    }