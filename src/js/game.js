(function() {
  'use strict';

  function Game() {
    this.celda = null;
    this.background = null;
    this.numberRows = 29;
    this.numberColumn = 39;
    this.floor = null;
    this.snakeSprite = null;
    this.snake = new Array(1);
    this.upKey = null;
    this.downKey = null;
    this.leftKey = null;
    this.rightKey = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;
      
      this.background = this.add.sprite(0, 0, 'background');

      this.initSnake();
      //console.log(firstNode.x);

      //keys asignement 
    this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function () {
      
        if (this.upKey.isDown)
      {
          this.newSnakeNode(this.snake.lenght-1, 0, 1);
      }
         
      if (this.downKey.isDown)
      {
       
      }
      if (this.leftKey.isDown)
      {
       
      }
      if (this.rightKey.isDown)
      {

      }
     
    },

    onInputDown: function () {
      //this.game.state.start('menu');
    },
    /*createFloor: function ()
    {
      this.floor = new Array(this.numberRows);
      for (var i = 0; i < this.numberRows; i++) 
      {
        this.floor[i] = new Array(this.numberColumn);
      }
      
    },*/
    initSnake: function ()
    {
       this.snake [0] = new this.SnakeNode( 9, 9, null, null, this.add.sprite( ((20 * 9) + 10), ((20 * 9) + 10), 'snake_head'));
       this.newSnakeNode(this.snake[0], 1, 0);
    },
    newSnakeNode: function (last, x, y)
    {
       //last.sprite.destroy();
       last.sprite = this.add.sprite( (((last.x )* 20) + 10), (((last.y )* 20) + 10), 'snake_body');
       last.xPrevious += x;
       last.yPrevious += y;
       this.snake.push(new this.SnakeNode( last.x + x, last.y + y , null , null , this.add.sprite( (((last.x + x )* 20) + 10), (((last.y + y)* 20) + 10), 'snake_head')));
    },
    SnakeNode: function (x, y, xPrevious, yPrevious, sprite) 
    { 
      this.x = x; 
      this.y = y;
      this.xPrevious = xPrevious;
      this.yPrevious = yPrevious;
      this.sprite = sprite; 
    },

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Game = Game;

}());
