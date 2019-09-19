import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';

class NewScene extends Phaser.Scene {
  green: any;
  blue: any;
  greenKeys: any;
  blueKeys: any;

  constructor() {
    super({ key: 'new' });
  }

  preload() {
    this.load.setBaseURL('');
    this.load.image('blueBox', 'assets/images/blue.png');
    this.load.image('greenBox', 'assets/images/green.png');
  }

  create() {
    this.blue = this.physics.add.image(100, 100, 'blueBox').setCollideWorldBounds(true);
    this.green = this.physics.add.image(300, 340, 'greenBox').setCollideWorldBounds(true);

    this.greenKeys = this.input.keyboard.createCursorKeys();
    this.blueKeys = this.input.keyboard.addKeys('a,s,d,w');

    this.physics.add.collider(this.green, this.blue, null);
  }

  update() {
    if (this.blueKeys.a.isDown) {
      this.blue.setVelocityX(-200);
    } else if (this.blueKeys.d.isDown) {
      this.blue.setVelocityX(200);
    } else if (this.blueKeys.w.isDown) {
      this.blue.setVelocityY(-200);
    } else if (this.blueKeys.s.isDown) {
      this.blue.setVelocityY(200);
    } else if (!this.blue.triggered) {
      this.blue.setVelocity(0);
    }

    if (this.greenKeys.left.isDown) {
      this.green.setVelocityX(-200);
    } else if (this.greenKeys.right.isDown) {
      this.green.setVelocityX(200);
    } else if (this.greenKeys.up.isDown) {
      this.green.setVelocityY(-200);
    } else if (this.greenKeys.down.isDown) {
      this.green.setVelocityY(200);
    } else if (!this.green.triggered) {
      this.green.setVelocity(0);
    }
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      scene: [ NewScene ],
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'gameContainer',
        height: 600,
        width: 600
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      }
    };
  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }

}
