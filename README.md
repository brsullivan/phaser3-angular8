# Phaser 3 & Angular 8

## Steps to Setup
1. Create a new angular project with Angular CLI. Add routing (if you want) and your choice of stylesheet format
```
  ng new phaser-angular
```

2. CD into new angular project folder and install Phaser
```
  npm i --save phaser
```

3. Copy `phaser.d.ts` from `/node_modules/phaser/types/` and place it in your project's `src/` folder.  
4. Copy `phaser.min.js` from `/node_modules/phaser/dist/` and place it in your project's `src/assets/` folder.
5. Add reference to the `phaser.min.js` file in your `index.html`.
```
  <head>
    ...
    <script src="assets/phaser.min.js"></script>
  </head>
```

6. Also, add a fallback script to catch an undefined `global` that Phaser requires.
```
  <script>
    if (global === undefined) {
    var global = window;
  }
  </script>
```

7. In your component.ts file, add import for Phaser.
```
  import Phaser from 'phaser';
```
* TypeScript will throw an error: This module is declared with using 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag
* In `tsconfig.json`, add 'allowSyntehticDefaultImports': true
* Also in `tsconfig.json`, update your `libs` arry to include `scripthost`
```
  "lib": [
    "es2018",
    "dom",
    "scripthost"
  ]
```

8. Define your game configuration and initialize
```
class NewScene extends Phaser.Scene {

  constructor() {
    super({ key: 'new' });
  }

  preload() {
    console.log('enter preload');
  }

  create() {
    console.log('enter create');
  }
}


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      scene: [ NewScene ],
      physics: {
        default: 'arcade',
      },
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'gameContainer',
        width: 800,
        height: 600
      }
    };
  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }

}

```