#zend cli
===
node cli really powerful to work with `file system`

write custom command in javscript (much more easy than bash/shell script)

zend framework need a skeleton to run, such as:
    
    root
        public
        config
        module
            moduleA
                config
                src
                    moduleA
                        XController
                        Form
                        Model
                        Mapper
                view
                    module-a
                    layout
                    error
                        x
                            index.phtml
                            login.phtml
                            join.phtml
                Module.php
really `complicated` skeleton to sketch out zeach time

what if...

    zend create project [name]
then all stuff __DONE__!

any time when we need add a module, type

    zend create module [name]
the same thing happens, module-skeleton __CREATED__, __ACTIVED__ in application.config.php!
                

