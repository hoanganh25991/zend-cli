<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'FrontEnd\Controller\Index' => 'FrontEnd\Controller\IndexController',
        ),
    ),
    'router' => array(
        'routes' => array(
            'home' => array(
                'type' => 'segment', 'options' => array(
                    'route' => '/',
                    'defaults' => array(
                        'controller' => 'FrontEnd\Controller\Index',
                        'action' => 'index',
                    ),
                ),
            ),
            'action' => array(
                'type' => 'segment', 'options' => array(
                    'route' => '[/:action]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                    ),
                    'defaults' => array(
                        'controller' => 'FrontEnd\Controller\Index',
                        'action' => 'index',
                    ),
                ),
            ),
        ),
    ),
    // ViewManager configuration
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions' => true,
        'not_found_template' => 'error/404',
        'exception_template' => 'error/index',
        // Doctype with which to seed the Doctype helper
        'doctype' => 'HTML5', // e.g. HTML5, XHTML1

        // Layout template name
        'layout' => 'InspiredByBoostrap', // e.g. 'layout/layout'

        // TemplateMapResolver configuration
        // template/path pairs
        'template_map' => array(
            'InspiredByBoostrap' => __DIR__ . '/../view/layout/layout.phtml',
            'error/404' => __DIR__ . '/../view/error/404.phtml',
            'error/index' => __DIR__ . '/../view/error/index.phtml',
        ),

        // TemplatePathStack configuration
        // module/view script path pairs
        'template_path_stack' => array(
            'FrontEnd\view' => __DIR__ . '/../view',
        ),
        // Additional strategies to attach
        // These should be class names or service names of View strategy classes
        // that act as ListenerAggregates. They will be attached at priority 100,
        // in the order registered.
        'strategies' => array(
            'ViewJsonStrategy', // register JSON renderer strategy
            'ViewFeedStrategy', // register Feed renderer strategy
        ),
    ),
);
