(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
    
    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif');
    },

    create: function () {
      this.game.input.maxPointers = 1;
      // this.game.stage.disableVisibilityChange = true;
       window['snake'].myGlobal = { maxScore : 0  };
      if (this.game.device.desktop) {
        this.game.stage.scale.pageAlignHorizontally = true;
      } else {
        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.game.stage.scale.minWidth =  480;
        this.game.stage.scale.minHeight = 260;
        this.game.stage.scale.maxWidth = 800;
        this.game.stage.scale.maxHeight = 600;
        this.game.stage.scale.forceLandscape = true;
        this.game.stage.scale.pageAlignHorizontally = true;
        this.game.stage.scale.setScreenSize(true);
      }
      this.game.state.start('preloader');
    }
  };

  window['snake'] = window['snake'] || {};
  window['snake'].Boot = Boot;
  window['snake'].myGlobal= {};
}());

