<?php 
namespace ajax;

        require_once('SummonerName.php');
        require_once('MatchDetails.php');

        if(isset($_GET['history'])) {
                $data = $_GET['history'];


        if(isset($_POST['username'])) {
                if($data == "name") {
                        $data = new SummonerName();
                        $result  = $data->get_api_data();  // user_puuid
                
        
                        echo $result;
                }
             

        }


                if($data == "true") {
                        $puuid = $_POST['data'];
                        $data = new SummonerName();
                        $result = $data->get_puuid_data($puuid);

                       // echo JSON_encode($result);
        
                }
            
              

             
        }
  

        if(isset($_GET['game_details'])) {
                $match_id = $_POST['gameId'];

                $data     = new MatchDetails();
                $result   = $data->match($match_id);
                echo JSON_encode($result);
        }
      
     
    

?>