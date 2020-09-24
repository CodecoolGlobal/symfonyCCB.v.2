<?php


    namespace App\Form\Extensions;
    use Symfony\Component\Form\AbstractTypeExtension;
    use Symfony\Component\Form\Extension\Core\Type\FileType;
    use Symfony\Component\Form\FormInterface;
    use Symfony\Component\Form\FormView;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Symfony\Component\PropertyAccess\PropertyAccess;

    class ImageTypeExtension extends AbstractTypeExtension
    {
        /**
         * Returns the name of the type being extended.
         *
         * @return iterable The name of the type being extended
         */
        public static function getExtendedTypes(): iterable
        {
            return [FileType::class];
        }

        /**
         * Add the image_path option
         *
         * @param OptionsResolver $resolver
         */
        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefined(array('image_path'));
        }

        /**
         * Pass the image URL to the view
         *
         * @param FormView $view
         * @param FormInterface $form
         * @param array $options
         */
        public function buildView(FormView $view, FormInterface $form, array $options)
        {
            if (isset($options['image_path'])) {
                $parentData = $form->getParent()->getData();

                $imageUrl = null;
                if (null !== $parentData) {
                    $accessor = PropertyAccess::createPropertyAccessor();
                    $imageUrl = $accessor->getValue($parentData, $options['image_path']);
                }

                // set an "image_url" variable that will be available when rendering this field
                $view->vars['image_url'] = $imageUrl;
            }
        }


    }