// Cria a classe MenuScene
class MenuScene extends Phaser.Scene {
    // Coloca a chave do construtor como MenuScene
    constructor() {
        super("MenuScene");
    }
    // Carrega os assets
    preload() {
        this.load.image('startButton', 'assets/start.png');
        this.load.image('backgroundMenu', 'assets/background_menu.png');
    }
    // Coloca as imagens e texto na tela
    create() {
        this.add.image(400, 300, 'backgroundMenu');
        this.add.text(250, 100, "Jogo do Labirinto", { fontSize: "48px", fill: "#fff" });
        // Cria o botão start
        let startButton = this.add.image(400, 400, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}
// Cria a classe GameScene
class GameScene extends Phaser.Scene {
    // Cria o construtor da classe e inicializa seus atributos
    constructor() {
        super("GameScene");
        this.score = 0;
        this.hasKey = false;
    }
    // Carrega os assets da cena
    preload() {
        // tá aqui
        this.load.image('player', 'assets/player.png');
        // tá aqui
        this.load.image('key', 'assets/key.png');
        // tá aqui
        this.load.image('enemy', 'assets/enemy.png');
        // tá aqui
        this.load.image('door', 'assets/door.png');
        // tá aqui
        // this.load.tilemapTiledJSON('map', 'assets/map.json');
        // tá aqui
        // this.load.image('tileset', 'assets/tileset.png');
        // tá aqui
        this.load.image('backgroundGame', 'assets/background_game.png');
    }
    // Coloca as propriedades
    create() {
        this.add.image(400, 300, 'backgroundGame');
        // const map = this.make.tilemap({ key: "map" });
        // const tileset = map.addTilesetImage("tileset", "tileset");
        // map.createLayer("Ground", tileset, 0, 0);
        // Inicializa o player
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        // Chama o método spawnKey
        this.spawnKey();
        // Adiciona a física à porta
        this.door = this.physics.add.sprite(500, 200, 'door');
        this.physics.add.overlap(this.player, this.door, this.enterDoor, null, this);
        // Inicializa o inimigo
        this.enemy = this.physics.add.sprite(400, 200, 'enemy');
        this.enemy.setVelocity(100, 100);
        this.enemy.setBounce(1, 1);
        this.enemy.setCollideWorldBounds(true);
        // Coloca o score
        this.scoreText = this.add.text(16, 16, 'Placar: 0', { fontSize: '32px', fill: '#fff' });
        // Adiciona fisica ao jogador, à chave e ao inimigo, além de como interagem
        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.physics.add.overlap(this.player, this.enemy, () => {
            this.scene.start('GameOverScene');
        });
        // Adiciona os comandos do teclado como jogáveis
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    // Método update que é atualizado sempre
    update() {
        this.player.setVelocity(0);
        // Cria a movimentação do personagem e como ele se move com base nas teclas
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        }
    }
    // Cria o método que coloca a chave
    spawnKey() {
        if (this.keyItem) {
            this.keyItem.destroy();
        }
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        this.keyItem = this.physics.add.sprite(x, y, 'key');
        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.hasKey = false;
    }
    // Cria o método que cria a propriedade de coletar a chave
    collectKey(player, key) {
        this.score += 10;
        this.scoreText.setText('Placar: ' + this.score);
        key.destroy();
        this.hasKey = true;
    }
    // Cria o métood que faz o jogador entrar na porta e mudar para GameScene2
    enterDoor(player, door) {
        if (this.hasKey) {
            this.scene.start('GameScene2');
        }
    }
}
// Cria a cena GameScene 2
class GameScene2 extends Phaser.Scene {
    // Coloca a chave da cena para ser chamada
    constructor() {
        super("GameScene2");
        this.score = 0;
        this.hasKey = false;
    }
    // Carrega os assets
    preload() {
        // tá aqui
        this.load.tilemapTiledJSON('map2', 'assets/map2.json');
        // tá aqui
        this.load.image('backgroundGame2', 'assets/background_game2.png');
        // tá aqui
        // this.load.image('tileset', 'assets/tileset.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('door', 'assets/door.png');
    }
    // Cria as propriedades
    create() {
        this.add.image(400, 300, 'backgroundGame2').setDepth(0);
  
        // const map = this.make.tilemap({ key: "map2" });
        // const tileset = map.addTilesetImage("tileset", "tileset");
        // map.createLayer("Ground", tileset, 0, 0);
        // this.add.text(100, 100, "Fase 2 - Novo Desafio", { fontSize: "32px", fill: "#fff" });
        this.enemy = this.physics.add.sprite(600, 200, 'enemy').setDepth(1);
        this.player = this.physics.add.sprite(200,200, 'player').setDepth(1);
        this.e
        this.door = this.physics.add.sprite(500, 200, 'door');
        this.spawnKey();
        this.enemy.setCollideWorldBounds(true);
        this.player.setCollideWorldBounds(true);
        this.physics.add.overlap(this.player, this.door, this.enterDoor, null, this);
        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.scoreText = this.add.text(16, 16, 'Placar: 0', { fontSize: '32px', fill: '#fff' });
        this.physics.add.overlap(this.player, this.enemy, () => {
            this.scene.start('GameOverScene');
        });
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    spawnKey() {
        if (this.keyItem) {
            this.keyItem.destroy();
        }
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        this.keyItem = this.physics.add.sprite(x, y, 'key');
        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.hasKey = false;
    }
    // Cria o método que cria a propriedade de coletar a chave
    collectKey(player, key) {
        this.score += 10;
        this.scoreText.setText('Placar: ' + this.score);
        key.destroy();
        this.hasKey = true;
    }
    // Cria o métood que faz o jogador entrar na porta e mudar para GameScene2
    enterDoor(player, door) {
        if (this.hasKey) {
            this.scene.start('WinScene');
        }
    }
    enemyMovement() {
        // Calcula a diferença entre as posições
        const dx = this.player.x - this.enemy.x;
        const dy = this.player.y - this.enemy.y;
        
        // Calcula o comprimento (magnitude) do vetor
        const length = Math.sqrt(dx * dx + dy * dy);
        
        // Evita divisão por zero
        if (length === 0) {
            return;
        }
        
        // Normaliza o vetor (obtém a direção unitária)
        const normalizedX = dx / length;
        const normalizedY = dy / length;
        
        // Define a velocidade desejada
        const speed = 120; // ajuste conforme necessário
        
        // Define a velocidade do inimigo usando o vetor normalizado
        this.enemy.setVelocityX(normalizedX * speed);
        this.enemy.setVelocityY(normalizedY * speed);
    }
    
    update() {
        this.enemyMovement();
        this.player.setVelocity(0);
        // Cria a movimentação do personagem e como ele se move com base nas teclas
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        }
    }
}
// Cria a classe GameOverScene
class GameOverScene extends Phaser.Scene {
    // Coloca a chave GameOverScene como chave da classe
    constructor() {
        super("GameOverScene");
    }
    // Carrega os assets
    preload() {
        this.load.image('backgroundGameOver', 'assets/background_gameover.png');
    }
    // Coloca as propriedades da classe
    create() {
        this.add.image(400, 300, 'backgroundGameOver');
        this.add.text(300, 100, "Game Over", { fontSize: "48px", fill: "#f00" });
        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}
// Cria a classe WinScene
class WinScene extends Phaser.Scene {
    // Coloca a chave da classe como WinScene
    constructor() {
        super("WinScene");
    }
    // Carrega os assets
    preload() {
        this.load.image('backgroundWin', 'assets/background_win.png');
    }
    // Cria as propriedades
    create() {
        this.add.image(400, 300, 'backgroundWin');
        this.add.text(300, 100, "Você Ganhou!", { fontSize: "48px", fill: "#0f0" });
        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}
// Cria a config do jogo
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: [MenuScene, GameScene, GameScene2, GameOverScene, WinScene]
};
// Coloca o jogo para rodar
const game = new Phaser.Game(config);