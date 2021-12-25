<?php 
      namespace config;
      
      use \Exception;
      class Config extends \ArrayObject {
        static $instance;
        protected function __construct() {}
        protected function __clone() {}
        public function __wakeup() {
            throw new Exception("cannot unserialize singleton");
        }
        
        public static function get() {
            if(!isset(self::$instance)) {
                if(!file_exists('../config/config.ini')) {
                    echo "config file doesnt exist  app stopping\n";
                    die();
                }
                self::$instance = new Config();
                $api = parse_ini_file("../config/config.ini");
                foreach($api as $key => $val) {
                    self::$instance->$key = $val;
                }
            }

            return self::$instance;
        }
      }

?>