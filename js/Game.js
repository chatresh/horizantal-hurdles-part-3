class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

       runner1 = createSprite(100,150,40,70);
        runner2 = createSprite(100,300,40,70);
        runner3 = createSprite(100,450,40,70);
        runner4 = createSprite(100,600,40,70);
        runners = [runner1,runner2,runner3,runner4];

        line1 = createSprite(1000,310,10010,2);
        line1.shapeColor = "white";
        line2 = createSprite(1000,460,10010,2);
        line2.shapeColor = "white";
        line3 = createSprite(1000,610,10010,2);
        line3.shapeColor = "white";
        line4 = createSprite(1000,760,10010,2);
        line4.shapeColor = "white";

        runner1.collide(line1);
  }

  play(){
  
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(186,250,155);
     
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y = 125;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the runners a little away from each other in y direction
        y+=150
        //use data form the database to display the cars in y direction
        x = displayWidth - allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;

        if (index === player.index){
          
          runners[index-1].shapeColor = "blue";
          camera.position.x = runners[index-1].x;
          camera.position.y = displayHeight/2+100;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
     if(keyIsDown("space") && player.index !== null){
            player.velocityY = -1;
            player.update();
        };
    if(player.distance===600){
       gameState=2;
       player.rank = player.rank + 1;
       Player.updateCarsAtEnd(player.rank);
       var element = createElement("h1","reached");
       element.position(650,300);
       player.distance+=0;
       end();
    }
     
    drawSprites();
  }
    end(){
      console.log("GAME ENDED");
      game.update(2);
    }
  }

