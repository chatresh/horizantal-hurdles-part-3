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

    runner1 = createSprite(100,200);
    runner1.addImage("runnerImg1",runner1Img);
    runner2 = createSprite(300,200);
    runner2.addImage("runnerImg2",runner2Img);
    runner3 = createSprite(500,200);
    runner3.addImage("runnerImg3",runner3Img);
    runner4 = createSprite(700,200);
    runner4.addImage("runnerImg4",runner4Img);
    runners = [runner1, runner2, runner3, runner4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(groundimg);
      image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);
      
      var hurdleGroup = createGroup(); 

      if(frameCount % 14 === 0){
        var hurdle = createSprite(displayWidth ,random(100,-2500),20,20);
        hurdle.addImage("hurdleimage",hurdleImg);
        hurdle.scale = 1.2;
        hurdle.velocityX  = -6;
        hurdleGroup.add(hurdle);
       
      }
      if (player.x -hurdleGroup.x < hurdleGroup.width/2 + player.width/2
        && hurdleGroup.x - player.x < hurdleGroup.width/2 +player.width/2) {
          player.distance+= -20;
          
         }
         if (player.y - hurdleGroup.y < hurdleGroup.height/2 + player.height/2
           && hurdleGroup.y -player.y < hurdleGroup.height/2 + player.height/2){
            player.distance+= -20;
         }


     
     
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
         ellipse(x,y,120,120);
          runners[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = runners[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>3860){
       gameState=2;
       player.rank = player.rank + 1;
       Player.updateCarsAtEnd(player.rank);

    }
     
    drawSprites();
  }
    end(){
      console.log("GAME ENDED");
      game.update(2);
    }
  }

