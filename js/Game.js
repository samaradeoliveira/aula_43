class Game {
  constructor() {
    //criar o resetTitle e o resetButton
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");


    this.leadeboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");

  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("carro1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("carro2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    // Criar grupo
    fuels = new Group();
    powerCoins = new Group();

    // chamar/Adicione o sprite de combustível ao jogo
    this.addSprites(fuels, 4, fuelImage, 0.02);

    // chamar/Adicione o sprite de moeda ao jogo
    this.addSprites(powerCoins, 18, powerCoinImage, 0.09);

  }

  // função de adicionar sprites na tela (moeda e combustível)
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);

      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(100, 2);
    form.titleImg.class("gameTitle");

    //características do resetTitle e do resetButton
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 300);


    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 350);


    this.leadeboardTitle.html("Placar");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);



}

  play() {
    this.handleElements();

    //chamar a handleResetButton
    this.handleResetButton();


    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        // bolinha para marcar o carro
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);



          //chamar os métodos
          this.handleFuel(index);
          this.handlePowerCoins(index);

        }



        //chamar a função handlePlayerControls
        this.handlerPlayerControls();

      }



      drawSprites();
    }
  }

  //criar a função handleResetButton
  handleResetButton(){
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
        
      });
      window.location.reload();
    });
  }

  //método para exibição dos players(placar)
  showLeaderboard(){
    var leader1, leader2;
    var players = Object.values(allPlayers)
    if(players[0].rank === 0 && players[1].rank === 0 || 
       players[0].rank === 1){

       leader1 =
       players[0].rank +
       "&emsp;" +
       players[0].name +
       "&emsp;" +
       players[0].score;

       leader2 =
       players[1].rank +
       "&emsp;" +
       players[1].name +
       "&emsp;" +
       players[1].score;
    }
    
    





  }








  //criar handlerPlayerControls
  handlerPlayerControls() {
    // manipulação dos eventos do teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 400) {
      player.positionX += 5;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX -= 5;
      player.update();
    }

  }








  handleFuel(index) {
    // Adicione o combustível
    cars[index - 1].overlap(fuels, function (collector, collected) {
      player.fuel = 185;
      //collected (coletado) é o sprite no grupo de colecionáveis que desencadeia
      //o evento
      collected.remove();
    });
  }

  handlePowerCoins(index) {
    // Adicione a moeda
    cars[index - 1].overlap(powerCoins, function (collector, collected) {
      player.score += 21;
      player.update();
      //collected (coletado) é o sprite no grupo de colecionáveis que desencadeia
      //o evento
      collected.remove();
    });


  }
}