(function() {
  'use strict';

  function Game() {
    this.celda = null;
    this.background = null;
    this.numberRows = 29;
    this.numberColumn = 39;
    this.floor = null;
    this.snakeSprite = null;
    this.snake = [];
    this.upKey = null;
    this.downKey = null;
    this.leftKey = null;
    this.rightKey = null;
<<<<<<< HEAD
    this.direction = 1;
=======
    this.food = null;
>>>>>>> 35734e28f1106c92fa35519ecb89eef476557652
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;
      
      this.background = this.add.sprite(0, 0, 'background');


      this.food = this.add.sprite( 10 + (Math.floor((Math.random()*780)+1)), 10 + (Math.floor((Math.random()*600)+1)), 'egg_green');

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
          if(this.direction != 0 && this.direction != 2)
          {
            this.newSnakeNode(this.snake[(this.snake.length)-1], 0, -1);
            this.direction = 0;
          }
          //console.log(this.snake.lenght-1);
      }
         
      if (this.downKey.isDown)
      {
        if(this.direction != 0 && this.direction != 2)
          {
              this.newSnakeNode(this.snake[(this.snake.length)-1], 0, 1);
              this.direction = 2;
          }

      }
      if (this.leftKey.isDown)
      {
        if(this.direction != 3 && this.direction != 1)
          {
           this.newSnakeNode(this.snake[(this.snake.length)-1], -1, 0);
           this.direction = 3;
         }
      }
      if (this.rightKey.isDown)
      {
          if(this.direction != 3 && this.direction != 1)
          {
            this.newSnakeNode(this.snake[(this.snake.length)-1], 1, 0);
            this.direction = 1;
          }
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
       this.size = this.snake.push(new this.SnakeNode( 9, 9, null, this.add.sprite( ((20 * 9) + 10), ((20 * 9) + 10), 'snake_head')));
       this.newSnakeNode(this.snake[0], 1, 0);
    },
    newSnakeNode: function (last, x, y)
    {
       //last.sprite.destroy();
       last.sprite = this.add.sprite( (((last.x )* 20) + 10), (((last.y )* 20) + 10), 'snake_body');
       console.log(last.x);
       this.size = this.snake.push(new this.SnakeNode( last.x + x, last.y + y , null ,  this.add.sprite( (((last.x + x )* 20) + 10), (((last.y + y)* 20) + 10), 'snake_head')));

    },
    SnakeNode: function (x, y, previous, sprite) 
    { 
      this.x = x; 
      this.y = y;
      this.previous = previous;
      this.sprite = sprite; 
    },

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Game = Game;

}());
