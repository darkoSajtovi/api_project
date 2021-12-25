$(() => {

  
    $('body').on('click', "#search_btn", (e) => {
        e.preventDefault();

        function team1 (champions, player_profile, players) {
          let str = "";
          str += "<div class='team_1'>";
          for(let i = 0; i < 5; i++) {
              str += "<p><img src='http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+champions[i]+"_0.jpg' alt='"+i+"' /><a href='index.php?query="+player_profile[i]+"'>"+players[i]+"'</a></p></p>"
          }
          str += "</div>";
          return str;
      }
      

      function team2 (champions, player_profile, players) {
        let str = "";
        str += "<div class='team_2'>";
        for(let i = 5; i < 10; i++) {
            str += "<p><img src='http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+champions[i]+"_0.jpg' alt='"+i+"' /><a href='index.php?query="+player_profile[i]+"'>"+players[i]+"'</a></p></p>"
        }
        str += "</div>";
        return str;
    }
    
  


    
        let username =  $('#username').val();
        region = $('#search_region').val();
        $.ajax({
            type: "POST",
            data: {
              username:username,
              region:region
            },
                beforeSend: () => {
                $("#loaderDiv").show();
            },
            url: "../ajax/getSummonerName.php?history=name",
            dataType: "html",
            success: (data) =>  {
              if(data) {
                $.ajax({
                  type: "POST",
                  data: {
                    data: data
                  },
                  url: "../ajax/getSummonerName.php?history=true",
                  success: (response) => {
                    let obj = JSON.parse(response);
                    let str ="";
                    let result = "";
                    let player_profile = "";
                    obj.map(key => {
                        player_profile = key.puuid;
                        (key.game_mode === "CLASSIC") ? key.game_mode = "RANKED SOLO" :  key.game_mode; 
                        key.rezultat ? key.rezultat = "WIN" : key.rezultat = "LOSE";
                        key.rezultat == "WIN" ? result = "pobeda" : result = "poraz";
                       str += "<div><div class='matches_  matchId_"+key.match_id+" "+result+"'><div class='box1'><p>"+key.game_mode+"</p><p>igrano pre"+key.played_ago+"</p><p>------</p><p>"+key.rezultat+"</p><p>"+key.game_duration+"</p> </div><div class='game_champ_stats'><img class='champion_img' src='http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+key.champion+"_0.jpg' /></div><div><p>"+key.summoner_spell1+" "+key.summoner_cast_1+"</p><p>"+key.summoner_spell2+" "+key.summoner_cast_2+"</p><p>"+key.champion+"</p></div><div class='game_score'><p>"+key.kills+" / "+key.deaths+" / "+key.assists+"</p><p>"+key.avg_score+":1 KDA</p></div><div><p>Level "+key.level+"</p><p>"+key.cs+" ("+key.avg_cs+") CS</p><p>"+key.kp+"%</p><p>Tier Average</p><p>plat</p></div><div class='items'><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item0+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item1+".png?image=q_auto:best&v=1637122822'/><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item2+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item3+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item4+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item5+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item6+".png?image=q_auto:best&v=1637122822' /><p>kupljenih pink wardova "+key.wards+"</p></div><div class='grid_players'>"+team1(key.player_champions, player_profile, key.players)+team2(key.player_champions, player_profile, key.players)+"</div><button game_id='"+key.match_id+"' class='match_details' state='true'>Match details</button></div><div class='game_details show_more_"+key.match_id+"'></div></div>"; 
            
                    })
                    $("#loaderDiv").hide();
                    $('#match_history').empty().append(str);
                  
                  }
                  
                })
              }
            }
    
          }); 
      
       
    })
    $('body').on('click', '.match_details', function() {
      function players_champs_1(player, champion) {
        let str = "";
        str += " <div class='more_team_1'><h3>Player/Champion</h3>";
        for(let i = 0;  i < 5; i++) {
          str += "<p>"+player[i]+" "+champion[i]+"</p>";
        }
        str += "</div>";
        return str;
      }
  
      function players_champs_2(player, champion ) {
        let str = "";
        str += " <div class='more_team_2'><h3>Player/Champion</h3>";
        for(let i = 5;  i < 10; i++) {
          str += "<p>"+player[i]+" "+champion[i]+"</p>";
        }
        str += "</div>";

        return str;
      }

      function player_damage_to_champions_1(total_damage) {
        let str = "";
        str += " <div class='more_damage_1'><p>Damage</p>";
        for(let i = 0;  i < 5; i++) {
          str += "<p>"+total_damage[i]+"</p>";
        }
        str += "</div>";

        return str;
      }

      function player_damage_to_champions_2(total_damage) {
        let str = "";
        str += " <div class='more_damage_2'><p>Damage</p>";
        for(let i = 5;  i < 10; i++) {
          str += "<p>"+total_damage[i]+"</p>";
        }
        str += "</div>";

        return str;
      }
      function player_cs_1(minions, neutral, avg_cs) {
        str = "";
        str += " <div class='more_cs_1'><p>CS</p>";
        for(let i = 0;  i < 5; i++) {
          let cs = parseInt(minions[i]) + parseInt(neutral[i]);

          str += "<p>"+cs+" ("+avg_cs[i]+")</p>";
        }
        str += "</div>";
        return str;
      }

      function player_cs_2(minions, neutral, avg_cs) {
        str = "";
        str += " <div class='more_cs_2'><p>CS</p>";
        for(let i = 5;  i < 10; i++) {
          let cs = parseInt(minions[i]) + parseInt(neutral[i]);

          str += "<p>"+cs+" ("+avg_cs[i]+")</p>";
        }
        str += "</div>";

        return str;
      }

      function items_1(items) {
        str = "";
        str += " <div class='more_items_1'><p>ITEMS</p>";
        for(let i = 0;  i < 5; i++) {
          str += "<div class='more_image_div'>";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item0+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item1+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item2+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item3+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item4+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item5+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item6+".png?image=q_auto:best&v=1637122822' />";  
          str += "</div>"; 
      }
        str += "</div>";

        return str;
      }
      function items_2(items) {
        str = "";
        str += " <div class='more_items_2'><p>ITEMS</p>";
        for(let i = 5;  i < 10; i++) {
          str += "<div class='more_image_div'>";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item0+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item1+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item2+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item3+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item4+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item5+".png?image=q_auto:best&v=1637122822' />";
          str += "<img src='https://opgg-static.akamaized.net/images/lol/item/"+items[i].item6+".png?image=q_auto:best&v=1637122822' />";  
          str += "</div>";  
        }


        str += "</div>";

        return str;
      }

      function kda_team_1(kills, assists, deaths) {
        str = "";
        str += " <div class='more_kda_1'><p>KDA</p>";
        for(let i = 0;  i < 5; i++) {
          str += "<p>"+kills[i]+"/"+deaths[i]+"/"+assists[i]+"("+avg_kda(kills[i], assists[i], deaths[i])+")";
        }
        str += "</div>";
        return str;
      }

      
      function kda_team_2(kills, assists, deaths) {
        str = "";
        str += " <div class='more_kda_2'><p>KDA</p>";
        for(let i = 5;  i < 10; i++) {
          str += "<p>"+kills[i]+"/"+deaths[i]+"/"+assists[i]+"("+avg_kda(kills[i], assists[i], deaths[i])+")";
        }
        str += "</div>";
        return str;
      }

      function avg_kda(kills, assists, deaths) {
        let avg = 0;
          if(deaths == 0) {
            avg =  (kills + assists);
          }
          avg = (parseInt(kills) + parseInt(assists)) / parseInt(deaths);
          return avg.toFixed(2);
      }
      

      let gameId = $(this).attr('game_id');
      let klasa = ".show_more_"+gameId;
      if($(this).attr('state') == 'true') {
        $(klasa).css('display', 'flex');

        $.ajax({
          type: "POST",
          data: {
            gameId:gameId,
          },
          url: "../ajax/getSummonerName.php?game_details=true",
          dataType: "html",
          success: (response) =>  {
            let obj = JSON.parse(response);
            let player_profile = ""
            let str = "";
            obj.map(key => {
              str += "<div class='more_match_details_1'>"+players_champs_1(key.players_username, key.player_champions, key.minions, key.neutral)+"<div class='more_match_cs_1'>"+player_cs_1(key.minions, key.neutral, key.avg_cs)+"</div>"+kda_team_1(key.kills, key.assists, key.deaths)+player_damage_to_champions_1(key.total_dmg)+"<div>"+items_1(key.items)+"</div></div><div class='more_match_details_2'><div>"+items_2(key.items)+"</div>"+player_damage_to_champions_2(key.total_dmg)+kda_team_2(key.kills, key.assists, key.deaths)+player_cs_2(key.minions,key.neutral, key.avg_cs)+"<div class='more_match_cs_2'>"+players_champs_2(key.players_username, key.player_champions, key.minions, key.neutral)+"</div></div>";
            })
            $(klasa).empty().append(str);

          }
        
        }); 
        $(this).attr("state", "false");
      }
      else if ($(this).attr("state") == "false") {
        $(klasa).css('display', 'none');
        $(this).attr("state", "true");
      }
    })
    
    
let searchParams  = (new URL(document.location)).searchParams;
let data = searchParams.get('query');
if(data === null)  {
  return
}
else {
  function team1 (champions, player_profile, players) {
    let str = "";
    str += "<div class='team_1'>";
    for(let i = 0; i < 5; i++) {
        str += "<p><img src='http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+champions[i]+"_0.jpg' alt='"+i+"' /><a href='index.php?query="+player_profile[i]+"'>"+players[i]+"'</a></p></p>"
    }
    str += "</div>";
    return str;
}

function team2 (champions, player_profile, players) {
  let str = "";
  str += "<div class='team_2'>";
  for(let i = 5; i < 10; i++) {
      str += "<p><img src='http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+champions[i]+"_0.jpg' alt='"+i+"' /><a href='index.php?query="+player_profile[i]+"'>"+players[i]+"'</a></p></p>"
  }
  str += "</div>";
  return str;
}

  $.ajax({
    type: "POST",
    data: {
      data: data
    },
    url: "../ajax/getSummonerName.php?history=true",
    beforeSend: () => {
      $("#loaderDiv").show();
  },
    success: (response) => {
      let obj = JSON.parse(response);
      let str ="";
      let result = "";
      let player_profile = "";
      obj.map(key => {
        player_profile = key.puuid;
        (key.game_mode === "CLASSIC") ? key.game_mode = "RANKED SOLO" :  key.game_mode; 
        key.rezultat ? key.rezultat = "WIN" : key.rezultat = "LOSE";
        key.rezultat == "WIN" ? result = "pobeda" : result = "poraz";
       str += "<div class='matches_  matchId_"+key.match_id+" "+result+"'><div class='box1'><p>"+key.game_mode+"</p><p>igrano pre"+key.played_ago+"</p><p>------</p><p>"+key.rezultat+"</p><p>"+key.game_duration+"</p> </div><div class='game_champ_stats'><img class='champion_img' src='http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+key.champion+"_0.jpg' /></div><div><p>"+key.summoner_spell1+" "+key.summoner_cast_1+"</p><p>"+key.summoner_spell2+" "+key.summoner_cast_2+"</p><p>"+key.champion+"</p></div><div class='game_score'><p>"+key.kills+" / "+key.deaths+" / "+key.assists+"</p><p>"+key.avg_score+":1 KDA</p></div><div><p>Level "+key.level+"</p><p>"+key.cs+" ("+key.avg_cs+") CS</p><p>"+key.kp+"%</p><p>Tier Average</p><p>plat</p></div><div class='items'><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item0+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item1+".png?image=q_auto:best&v=1637122822'/><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item2+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item3+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item4+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item5+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item6+".png?image=q_auto:best&v=1637122822' /><p>kupljenih pink wardova "+key.wards+"</p></div><div class='grid_players'>"+team1(key.player_champions, player_profile, key.players)+team2(key.player_champions, player_profile, key.players)+"</div></div>"; 


    })
      $("#loaderDiv").hide();
      $('#match_history').empty().append(str);

    }
    
  })
}
     


  
  
      }); 


/**
      obj.map(key => {
                        player_profile = key.puuid;
                        (key.game_mode === "CLASSIC") ? key.game_mode = "RANKED SOLO" :  key.game_mode; 
                        key.rezultat ? key.rezultat = "WIN" : key.rezultat = "LOSE";
                        key.rezultat == "WIN" ? result = "pobeda" : result = "poraz";
                        str += "<div class='matches_  matchId_"+key.match_id+" "+result+"'><div class='box1'><p>"+key.game_mode+"</p><p>igrano pre"+key.played_ago+"</p><p>------</p><p>"+key.rezultat+"</p><p>"+key.game_duration+"</p> </div><div class='game_champ_stats'><img class='champion_img' src='http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+key.champion+"_0.jpg' /></div><div><p>"+key.summoner_spell1+" "+key.summoner_cast_1+"</p><p>"+key.summoner_spell2+" "+key.summoner_cast_2+"</p><p>"+key.champion+"</p></div><div class='game_score'><p>"+key.kills+" / "+key.deaths+" / "+key.assists+"</p><p>"+key.avg_score+":1 KDA</p></div><div><p>Level "+key.level+"</p><p>"+key.cs+" ("+key.avg_cs+") CS</p><p>"+key.kp+"%</p><p>Tier Average</p><p>plat</p></div><div class='items'><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item0+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item1+".png?image=q_auto:best&v=1637122822'/><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item2+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item3+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item4+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item5+".png?image=q_auto:best&v=1637122822' /><img src='https://opgg-static.akamaized.net/images/lol/item/"+key.items.item6+".png?image=q_auto:best&v=1637122822' /><p>kupljenih pink wardova "+key.wards+"</p></div><div class='grid_players'><div class='team_1'><p><img src='http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+key.player_champions[0]+"_0.jpg' /><a href='index.php?query="+player_profile[0]+"'>"+key.players[0]+"'</a></p><p><img /><a href='index.php?query="+player_profile[1]+"'>"+key.players[1]+"</a><a href='index.php?query="+player_profile[2]+"'>"+key.players[2]+"</a><a href='index.php?query="+player_profile[3]+"'>"+key.players[3]+"</a><a href='index.php?query="+player_profile[4]+"'>"+key.players[4]+"</a></div><div class='team_2'><a href='index.php?query="+player_profile[5]+"'>"+key.players[5]+"</a><a href='index.php?query="+player_profile[6]+"'>"+key.players[6]+"</a><a href='index.php?query="+player_profile[7]+"'>"+key.players[7]+"</a><a href='index.php?query="+player_profile[8]+"'>"+key.players[8]+"</a><a href='index.php?query="+player_profile[9]+"'>"+key.players[9]+"</a></div></div><button class='match_details' state="false">Match details</button></div>"; 

            
                      }) 

 */