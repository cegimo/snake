(function() {
  'use strict';

  function Game() {
    this.celda = null;
    this.score = null;
    this.scoreText = null;
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
    this.direction = 1;
    this.food = null;
    this.time = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;
         this.time = this.game.time.now;
      
      this.background = this.add.sprite(0, 0, 'background');


      this.food = this.add.sprite( 10 + (Math.floor((Math.random()*780)+1)), 10 + (Math.floor((Math.random()*600)+1)), 'egg_green');

      this.scoreText = this.add.text(20, 20, 'SCORE: 0', { font: "20px Arial", fill: "#16DE16", align: "left" });

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

      if(this.time +100 < this.game.time.now)
      {
        if(this.direction === 0)
        {
          this.newSnakeNode(this.snake[(this.snake.length)-1], 0, -1);
          this.deleteNode();
        }
        if(this.direction === 1)
        {
          this.newSnakeNode(this.snake[(this.snake.length)-1], 1, 0);
          this.deleteNode();
        }
        if(this.direction === 2)
        {
          this.newSnakeNode(this.snake[(this.snake.length)-1], 0, 1);
          this.deleteNode();
        }
        if(this.direction === 3)
        {
          this.newSnakeNode(this.snake[(this.snake.length)-1], -1, 0);
          this.deleteNode();
        }
        this.time = this.game.time.now;
        
      }

      
        if (this.upKey.isDown)
      {
            this.direction = 0;
      }
         
      if (this.downKey.isDown)
      {
              this.direction = 2;
      }
      if (this.leftKey.isDown)
      {
           this.direction = 3;
      }
      if (this.rightKey.isDown)
      {
            this.direction = 1;
      }


      this.physics.overlap(this.snake_head, this.food, function (snake_head, food) {  food.kill(); this.score += 10; this.scoreText.content = 'SCORE: ' + this.score;}, null, this);
     
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
       last.sprite.destroy();
       last.sprite = this.add.sprite( (((last.x )* 20) + 10), (((last.y )* 20) + 10), 'snake_body');
       this.size = this.snake.push(new this.SnakeNode( last.x + x, last.y + y , null ,  this.add.sprite( (((last.x + x )* 20) + 10), (((last.y + y)* 20) + 10), 'snake_head')));

    },
    SnakeNode: function (x, y, previous, sprite) 
    { 
      this.x = x; 
      this.y = y;
      this.previous = previous;
      this.sprite = sprite; 
    },
    deleteNode: function ()
    {
      this.snake[0].sprite.destroy();
      this.snake.shift();
    }

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Game = Game;

}());
