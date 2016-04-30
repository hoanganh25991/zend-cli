#zend cli

node cli really powerful to work with `file system`

write custom command in javscript (much more easy than bash/shell script)

zend framework need a skeleton to run, such as:
    
    web-app-with-zend-framework-folder
        public
        config
        module
            ModuleA
                config
                src
                    ModuleA
                        Controller
                        Form
                        Model
                        Mapper
                view
                    module-a
                    lawet
                    error
                Module.php
really `complicated` skeleton to sketch out each time start to write new project

what if...

    zend skeleton [name]
then all stuff __DONE__!

run app through command line, open browser at localhost:8080

    php -S 0.0.0.0:8080 -t public public/index.php

any time when we need add new module, `in app folder`, type

    zend module [name]
module-[name] __CREATED__, __ACTIVED__ in application.config.php

[review on YouTube](https://wetu.be/xUnH0qgbiZ4)

    note: zend skeleton has copied "vendor", but we still need to run "composer install" to update package




                

