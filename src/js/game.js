(function() {
  'use strict';

  function Game() {
    this.score = null;
    this.scoreText = null;
    this.background = null;
    this.floor = null;
    this.snakeSprite = null;
    this.snake = [];
    this.upKey = null;
    this.downKey = null;
    this.leftKey = null;
    this.rightKey = null;
    this.direction = 1;
    this.food = null;
    this.velocity = null;
    this.time = null;
  }

  Game.prototype = {

    create: function () {

      this.velocity = 100;
      this.time = this.game.time.now;

      //si hay alguna serpiente creada por un juego anterior reseteamos la serpiente, score y dirección
      var size= this.snake.length;
      if(size != 0)
      {
        for (var i = 0; i < size; i++)
        {
          this.deleteNode();
        }
        this.score = 0;
        this.direction = 1;
      }
      //creamos el fondo
      this.background = this.add.sprite(0, 0, 'background');
      this.food = this.add.sprite(  (Math.floor((Math.random()*37)+1)) *20 , (Math.floor((Math.random()*27)+1)) * 20, 'egg_green');
      this.scoreText = this.add.text(20, 20, 'SCORE: 0', { font: "20px Arial", fill: "#16DE16", align: "left" });
      //iniciamos la serpiente con los dos primeros nodos
      this.initSnake();

      //asignación de teclas
    this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function () {
      //se van creando nuevos nodos según la velocidad que queramos darle
      if(this.time + this.velocity < this.game.time.now)
      {
        this.createNewNode();
        this.deleteNode();
        this.time = this.game.time.now;
        
      }
      //las teclas cambian la dirección.
      if (this.upKey.isDown && (this.direction != 2))
      {
            this.direction = 0;
      }
      if (this.downKey.isDown && (this.direction != 0))
      {
              this.direction = 2;
      }
      if (this.leftKey.isDown && (this.direction != 1))
      {
           this.direction = 3;
      }
      if (this.rightKey.isDown && (this.direction != 3))
      {
            this.direction = 1;
      }

      //comer
      this.physics.overlap(this.snake[(this.snake.length)-1].sprite, this.food, function (snake_head, food) 
      {  
        food.kill(); 
        this.velocity--;
        this.score += 10;
        this.scoreText.content = 'SCORE: ' + this.score;
        this.createNewNode();
        this.food = this.add.sprite(  (Math.floor((Math.random()*37)+1)) *20 , (Math.floor((Math.random()*27)+1)) * 20, 'egg_green');
        //comprobamos que no caiga en ninguna casilla 

      }, null, this);

      //perder partida por chocar con el cuerpo de la serpiente
      for (var i = this.snake.length -3; i > 0; i--)
      {
        this.physics.overlap(this.snake[(this.snake.length)-1].sprite, this.snake[i].sprite, function (snake_head, snake) 
        { 
          this.endGame();
          this.game.state.start('menu');
        }, null, this);
      }

      //perder partida por salirte del borde.
      if ((this.snake[(this.snake.length)-1].x < 0) || (this.snake[(this.snake.length)-1].x > 38) ||
         (this.snake[(this.snake.length)-1].y < 0) || (this.snake[(this.snake.length)-1].y >  28) )
      {
          this.endGame();
          this.game.state.start('menu');
      }
    },
    createNewNode: function ()
    {
        if(this.direction === 0)
        {
          this.newSnakeNode(this.snake[(this.snake.length)-1], 0, -1);
        }
        if(this.direction === 1)
        {
          this.newSnakeNode(this.snake[(this.snake.length)-1], 1, 0);
        }
        if(this.direction === 2)
        {
          this.newSnakeNode(this.snake[(this.snake.length)-1], 0, 1);
        }
        if(this.direction === 3)
        {
          this.newSnakeNode(this.snake[(this.snake.length)-1], -1, 0);
        }
    },
    //función que se activa cuando se pierde la partida, en este caso solo aumentará el maxScore si es necesario
    endGame: function ()
    {
          if(window['snake'].myGlobal.maxScore < this.score) 
          {
            window['snake'].myGlobal.maxScore = this.score;
          }

    },
    //función para inicializar la serpiente
    initSnake: function ()
    {
        this.snake.push(new this.SnakeNode( 9, 9, null, this.add.sprite( ((20 * 9) + 10), ((20 * 9) + 10), 'snake_head')));
       this.newSnakeNode(this.snake[0], 1, 0);
    },
    //crea un nuevo nodo
    newSnakeNode: function (last, x, y)
    {
       last.sprite.destroy();
       last.sprite = this.add.sprite( (((last.x )* 20) + 10), (((last.y )* 20) + 10), 'snake_body');
       this.snake.push(new this.SnakeNode( last.x + x, last.y + y , null ,  this.add.sprite( (((last.x + x )* 20) + 10), (((last.y + y)* 20) + 10), 'snake_head')));

    },
    //contenido del nodo
    SnakeNode: function (x, y, previous, sprite) 
    { 
      this.x = x; 
      this.y = y;
      this.previous = previous;
      this.sprite = sprite; 
    },
    //eliminar último nodo
    deleteNode: function ()
    {
      this.snake[0].sprite.destroy();
      this.snake.shift();
    },

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Game = Game;

}());
