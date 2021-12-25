<?php namespace ajax;
require_once __DIR__ . '../../../vendor/autoload.php'; 

use \core\Calculate;
use \config\Config;
class SummonerName {
        static $config;


        public function __construct()  {

        }
      
        public static function get_api_data() {

           $api_key                          = Config::get()->api;
           if(isset($_POST['username'])) {
               $username                    = $_POST['username'];  
                $region = $_POST['region'];

                $response                   = file_get_contents("https://{$region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{$username}?api_key=$api_key");
                $data                       = json_decode($response);
            
                $player_uid                 = $data->puuid; 
            
                return  $player_uid;
            }
       
        }

        public function match_details($matchId) {
            $api_key                       = Config::get()->api;
            $response                      = file_get_contents("https://europe.api.riotgames.com/lol/match/v5/matches/{$matchId}?api_key={$api_key}");
            $data                          = json_decode($response);

            $game_mode = $data->info->gameMode;
       
            echo $game_mode;            
        }
        public function get_puuid_data($user_puuid) {
            $api_key                       = Config::get()->api;
            $response                      = file_get_contents("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/{$user_puuid}/ids?start=0&count=10&api_key={$api_key}");
            $data                          = json_decode($response);
            
            $data_match = []; 
            
            for($k = 0; $k < count($data); $k++) {
                $matches_api                 = file_get_contents("https://europe.api.riotgames.com/lol/match/v5/matches/{$data[$k]}?api_key={$api_key}");
                $old_matches                 = json_decode($matches_api);

                $game_mode = $old_matches->info->gameMode;
                $igraci = [];
                $players_puuid               = [];
                $players_champion  = [];

                $game_start_time = $old_matches->info->gameStartTimestamp;
                for($j = 0; $j < 10; $j++) {
                    $igraci[]                = [$old_matches->info->participants[$j]->summonerName];
                    $players_puuid[]         = [$old_matches->info->participants[$j]->puuid];
                    $players_champion[]      = $old_matches->info->participants[$j]->championName;

                }


                for($i = 0; $i < count($old_matches->info->participants);$i++) {

                    if($old_matches->info->participants[$i]->puuid == $user_puuid)  {  
                        $player            = $old_matches->info->participants[$i];
                        $team_kills        = [];
                        $team_rank         = [];
                        $teamId            = $player->teamId;
                        $items             = [];

                    for($z = 0; $z < count($old_matches->info->participants); $z++) {   // sve za ostale igrace ovde 
                        if($old_matches->info->participants[$z]->teamId == $teamId) {
                        $team_kills[]      =  $old_matches->info->participants[$z]->kills;
                        $team_rank[]       = $old_matches->info->participants[$z]->kills;
                        $old_matches->info->participants[$z]->summonerId;


                    }
                    } 

                        // ovo je za trazenog igraca
                        $minions           = $player->totalMinionsKilled;
                        $neutral           = $player->neutralMinionsKilled;
                        $result            = $player->win;
                        $champion          = $player->championName;
                        $kills             = $player->kills;
                        $assists           = $player->assists;
                        $deaths            = $player->deaths;
                        $level             = $player->champLevel;
                        $summoner_spell_1  = $player->summoner1Id;
                        $summoner_spell_2  = $player->summoner2Id;
                        $summoner_cast_1   = $player->summoner1Casts;
                        $summoner_cast_2   = $player->summoner2Casts;
                        $wards             = $player->visionWardsBoughtInGame;
                        $game_start        = $old_matches->info->gameStartTimestamp;
                        
                        $items             = [
                                "item0" => $player->item0, 
                                "item1" => $player->item1,
                                "item2" => $player->item2, 
                                "item3" => $player->item3, 
                                "item4" => $player->item4, 
                                "item5" => $player->item5, 
                                "item6" => $player->item6 
                            ];

                        
                        $total_cs          = Calculate::total_cs($minions, $neutral);
                        $played_ago        = Calculate::played_ago($game_start_time);
                        $game_length       = Calculate::game_lenght($old_matches->info->gameDuration, $game_start);
                        $avg_cs            = Calculate::average_cs($old_matches->info->gameDuration, $total_cs);
                        $avg_score         = Calculate::avrage_score($kills, $assists, $deaths);
                        $kp                = Calculate::kill_participation($kills, $assists, $team_kills);


                       $data_match[] = [
                        "match_id"         => $data[$k],
                        "game_mode"        => $game_mode,
                        "rezultat"         => $result,
                        "champion"         => $champion,
                        "players"          => $igraci,
                        "played_ago"       => $played_ago,
                        "game_duration"    => $game_length,
                        "avg_cs"           => $avg_cs,
                        "avg_score"        => $avg_score,
                        "level"            => $level,
                        "kills"            => $kills,
                        "assists"          => $assists,
                        "deaths"           => $deaths,
                        "summoner_spell1"  => $summoner_spell_1,
                        "summoner_spell2"  => $summoner_spell_2,
                        "summoner_cast_1"  => $summoner_cast_1,
                        "summoner_cast_2"  => $summoner_cast_2,
                        "cs"               => $total_cs ,
                        "kp"               => $kp,
                        "items"            => $items,
                        "wards"            => $wards,
                        "puuid"            => $players_puuid,
                        "player_champions" => $players_champion
 
                    ];
                    
                    }
                    
                }

                
            }

            echo JSON_encode($data_match);

        }

   
  
    }

   


?>