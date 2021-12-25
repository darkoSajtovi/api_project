<?php namespace ajax;
require_once __DIR__ . '../../../vendor/autoload.php'; 

use \core\Calculate;
use \config\Config;
class MatchDetails {
    static $config;

    public function __construct() {
        
    }


    public function match($game_id) {
        $api_key                           = Config::get()->api;

       // $api_key                          = self::$config['api'];

        $response                 = file_get_contents("https://europe.api.riotgames.com/lol/match/v5/matches/{$game_id}?api_key={$api_key}");
        $match_data               = JSON_decode($response);

        $game_mode         = $match_data->info->gameMode;
        $igraci            = [];
        $players_puuid     = [];
        $players_champion  = [];
        $neutral           = [];
        $minions           = [];
        $kills             = [];
        $assists           = [];
        $deaths            = [];
        $kripovi           = [];
        $neutralni         = [];
        $items             = [];
        $encr_id           = [];
        $tier              = [];
        $rank              = [];
        $game_start_time   = $match_data->info->gameStartTimestamp;
        $game_duration     = $match_data->info->gameDuration;

        for($j = 0; $j < 10; $j++) {
            $player = $match_data->info->participants[$j];
            $igraci[]                = $player->summonerName;
            $players_puuid[]         = [$player->puuid];
            $players_champion[]      = $player->championName;
            $kills[]                 = $player->kills;
            $assists[]               = $player->assists;
            $deaths[]                = $player->deaths;
            $total_dmg[]             = $player->totalDamageDealtToChampions;
            $kripovi[]               = $player->totalMinionsKilled;
            $neutralni[]             = $player->neutralMinionsKilled;
            $encr_id[]               = $player->summonerId;
            
                $response = file_get_contents("https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/{$encr_id[$j]}?api_key={$api_key}");
                $data     = JSON_decode($response, true);
                $tier[]        = $data[0];
            

            $items[]                 = [
                            "item0" => $player->item0, 
                            "item1" => $player->item1,
                            "item2" => $player->item2, 
                            "item3" => $player->item3, 
                            "item4" => $player->item4, 
                            "item5" => $player->item5, 
                            "item6" => $player->item6            
                        ];
        }   

        $minions                         = Calculate::minions($kripovi);             /// test za singleton instance
        $neutral                         = Calculate::get()->neutral($neutralni);
        $total_cs                        = Calculate::get()->avg_cs($kripovi, $neutralni, $game_duration);
 
       //$avg_score                     = Calculate::avrage_score($kills, $assists, $deaths);
        $data_match[] = [
            "match_id"         => $game_id,
            "game_mode"        => $game_mode,
            "puuid"            => $players_puuid,
            "player_champions" => $players_champion,
            "players_username" => $igraci,
            "kills"            => $kills,
            "assists"          => $assists,
            "deaths"           => $deaths,
            "minions"          => $minions,
            "neutral"          => $neutral,
            "total_dmg"        => $total_dmg,
            "avg_cs"           => $total_cs,
            "items"            => $items,
            "summoner_id"      => $encr_id,
            "tier"             => $tier



        ];
        return $data_match;
    }

}


?>