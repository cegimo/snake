(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
    this.scoreTxt = null;
  }

  Menu.prototype = {
    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 3;


      this.titleTxt = this.add.bitmapText(x, y, 'SNAKE', {font: '36px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'MAX SCORE: ' + window['snake'].myGlobal.maxScore, {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);
      

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'START', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['snake'] = window['snake'] || {};
  window['snake'].Menu = Menu;

}());
