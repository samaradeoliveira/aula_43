class Form {
  constructor() {
    //caixa vazia com o texto fornecido no atributo placeHolder
    this.input = createInput("").attribute("placeholder", "Digite seu nome");
    //botão com o texto "jogar"
    this.playButton = createButton("Jogar");
    //criando um createImg que leva um caminho e um rótulo como parâmetro
    this.titleImg = createImg("./assets/TITULO.png", "nome do jogo");
    //mensagem de texto simples, para dar boas-vindas
    this.greeting = createElement("h2");
  }

  //diferentes posições de exibição aos elementos 
  setElementsPosition() {
    //titulo
    this.titleImg.position(120, 50);
    //caixa de entrada
    this.input.position(width / 2 - 110, height / 2 - 80);

    //botão
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    //texto
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  //as características visual estão no style
  setElementsStyle() {
    //título
    this.titleImg.class("gameTitle");
    //caixa de entrada
    this.input.class("customInput");
    //botão
    this.playButton.class("customButton");
    //texto
    this.greeting.class("greeting");
  }

  //usada para ocultar/remover o elemento da tela
  hide() {
    //texto
    this.greeting.hide();
    //botão
    this.playButton.hide();
    //caixa de entrada
    this.input.hide();
  }

  //ativar e criar um método para quando clicar ter vários acontecimentos
  //nome do método: handleMousePressed
  handleMousePressed(){
    this.playButton.mousePressed(() => {
      this.input.hide();
      this.playButton.hide();
      var message = `
      Olá ${this.input.value()}
      </br>espere o outro jogador entrar...`;
      this.greeting.html(message);

      playerCount += 1;
      player.name = this.input.value();
      player.index = playerCount;
      //chamar o addPlayer
      player.addPlayer();
      player.updateCount(playerCount);
      //chamar o getDistance
      player.getDistance();
    });
  }

 display() {
    //POSIÇÕES
    this.setElementsPosition();
    //ESTILOS
    this.setElementsStyle();
    //chamar o método criado aqui
    this.handleMousePressed();
  }
}
