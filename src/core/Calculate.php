<?php  declare(strict_types=1);

    namespace core;
    use \Exception;

    final class Calculate {
        private static $instance;
        protected function __construct() {}
        protected function __clone() {}
        public function __wakeup() {
            throw new Exception("cannot unserialize singleton");
        }
        public static function get() {
            if(!isset(self::$instance)) {
                self::$instance = new self();
            }
            return self::$instance;
        }
        
    ///
    /// call methods
    ///
        static  function minions(array $minions) {
            return self::get()->Iminions($minions);
        }

        static function avg_cs (array $minions, array $neutral, int $game_duration) {
            return self::get()->Iavg_cs($minions,  $neutral, $game_duration);
        }

  


    ///
    /// Create methods
    ///


        public static function played_ago($time) {
            $poruka = "";
            $trenutno = time();
            $razlika =  $trenutno - $time / 1000; // razlika sa konvertovanjem u sekunde

            $minut = 60;
            $sat = 60 * 60;
            $dan = 60 * 60 * 24;
            $mesec = $dan * 30;
            if($razlika < 60) {
                $poruka = $razlika . " Sekunda";
            }
            else if($razlika < $sat) {
                $poruka = round($razlika / $minut). " minuta";
            }
            else if($razlika < $dan) {
                $poruka = round($razlika / $sat) . " sata";
            }
            else if($razlika <$mesec) {
                $poruka = round($razlika / $dan) . " dana";
            }
            else  {
                $poruka = round($razlika / $mesec) . " meseci";
            }
            return $poruka;
          
        }
        /*
        public static function old_game_length($game_start) {
                $game_start_seconds = $game_start / 1000;
                $minut = 60;
         
                $sekunda = explode('.', $game_start_seconds);
                $seconds = substr($sekunda[1], 0, 2);

                if($seconds > 60) {
                    $seconds = $seconds - 60;
                    $minuti = floor(round($game_start_seconds) / $minut) + 1;
                }
                else {
                    $minuti = floor(round($game_start_seconds) / $minut);

                }
                return $minuti."m ".$seconds. "s";
            
        }
        */
        public static function game_lenght(int $game_duration) {
            
            $duration =  (string)round($game_duration / 60, 2);
            $split = explode(".", $duration);
            $min = $split[0]. "m ";
            $sec = $split[1]. "s";
            if(strlen($split[0]) > 2) {
          //  return Calculate::old_game_length($game_start);
                return "vreme iz starog apija";
            }
            else {
                return $min. $sec;

            }

        }


        public static function average_cs(int $game_duration,int $cs) {
            $duration =  round($game_duration / 60, 2);
            return round($cs / $duration, 1);
        }
        public static function total_cs($minions,$neutral) {
                return $minions + $neutral;
        }

        public  function Iminions(array $minions) {
            
            for($i = 0; $i < 10; $i++) {
                $c[] = $minions[$i];
            }
                return $c;
       }
       public static function game_total_cs(array $minions,array $neutral) {
    
        $total_hours = $minions;
        $hourly_rate = $neutral;

        $total_pay = array_map(function($minon, $neutralMinion) {
            return $minon + $neutralMinion;
        }, $total_hours, $hourly_rate);


            return $total_pay;
       }
       public  function Iavg_cs(array $minions, array $neutral, int $game_duration) {
            $total_cs = self::game_total_cs($minions, $neutral);
            $duration =  round($game_duration / 60, 2);

            $avg_cs = array_map(function($cs) use($duration){
                return round($cs / $duration, 1);
        }, $total_cs);        

        return $avg_cs;
       }
       
       public  function neutral(array $neutral) {
   
        for($i = 0; $i < 10; $i++) {
            $c[] = $neutral[$i];
        }
            return $c;
   }

   

        public static function avrage_score(int $kills, int $assists,int $deaths) {
            if($deaths === 0)  {
                return round(($kills + $assists), 2); 
            }
            return round(($kills + $assists) / $deaths, 2); 

        }

        public static function kill_participation(int $kills, int $assists, array $team_kills) {

            if(array_sum($team_kills) === 0) {
                return  round(($kills + $assists) * 100); 
            }
           return  round(($kills + $assists) / array_sum($team_kills) * 100); 

        }

        public static function average_tier() {
                
        }
        
        
    }
?>