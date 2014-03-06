window.onload = function () {
  'use strict';

  var game
    , ns = window['snake'];

  game = new Phaser.Game(800, 600, Phaser.AUTO, 'snake-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);

  game.state.start('boot');
};
