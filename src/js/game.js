(function() {
  'use strict';

  function Game() {
    this.celda = null;
    this.background = null;
    this.numberRows = 29;
    this.numberColumn = 39;
    this.floor = null;
    this.snakeHead = new Array(10,10);//posiciones x, y de la cabeza
    this.snakeTail = new Array(8,10);//posiciones x, y de la cola
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

        this.background = this.add.sprite(0, 0, 'background');


      //creamos el suelo
      this.createFloor();
      this.initSnake();


    },

    update: function () {


     
    },

    onInputDown: function () {
      //this.game.state.start('menu');
    },
    createFloor: function ()
    {
      this.floor = new Array(this.numberRows);
      for (var i = 0; i < this.numberRows; i++) 
      {
        this.floor[i] = new Array(this.numberColumn);
      }
      for (var i = 0; i < this.numberRows; i++)
      {
        for (var j = 0; j < this.numberColumn; j++)
        {
          this.floor[i][j] = -1;
        }
      }
    },
    initSnake: function ()
    {
        for (var i = 8; i <= 10; i++ )
        {
          this.floor[i][10] = this.add.sprite( ((20*i) + 10), (20*10), 'snake_body');
          //console.log("hola");

        }

        this.add.sprite( ((20*10) + 10), (20*10), 'snake_head');

    },

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Game = Game;

}());
