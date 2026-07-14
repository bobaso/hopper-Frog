// ======================================
// HTML取得
// ======================================

const world = document.getElementById("world");
const player = document.getElementById("player");
const score = document.getElementById("score");
const message = document.getElementById("message");

// ======================================
// ゲーム設定
// ======================================

const DESIGN_WIDTH = 1080;
const DESIGN_HEIGHT = 1920;

// 背景画像の地面高さ
const GROUND_RATE = 288 / 1920;

// プレイヤーサイズ
const PLAYER_SIZE = 170;

// ======================================
// プレイヤー
// ======================================

const frogImages = [
    "frog1.png",
    "frog2.png"
];

let frame = 0;

const playerData = {

    x: 0,
    y: 0,

    width: PLAYER_SIZE,
    height: PLAYER_SIZE,

    velocityY: 0,

    onGround: true

};

// ======================================
// ゲーム状態
// ======================================

let gameStarted = false;

// ======================================
// リサイズ
// ======================================

function resizeGame(){

    playerData.width = PLAYER_SIZE;
    playerData.height = PLAYER_SIZE;

    playerData.x = 245;

    if(!gameStarted){

        playerData.y = DESIGN_HEIGHT * GROUND_RATE;

    }

    drawPlayer();

}


window.addEventListener("resize", resizeGame);

// ======================================
// プレイヤー描画
// ======================================

function drawPlayer(){

    player.style.width = playerData.width + "px";

    player.style.height = playerData.height + "px";

    player.style.left = playerData.x + "px";

    player.style.bottom = playerData.y + "px";

    player.style.transform = "translateX(-50%)";

}

// ======================================
// アニメーション
// ======================================

setInterval(()=>{

    if(!gameStarted) return;

    frame++;

    if(frame>=frogImages.length){

        frame=0;

    }

    player.src = frogImages[frame];

},180);

// ======================================
// ゲーム開始
// ======================================

function startGame(){

    if(gameStarted) return;

    gameStarted = true;

    

    message.style.display = "none";

}
// ======================================
// ジャンプ設定
// ======================================

const GRAVITY = 1.2;
const JUMP_POWER = 22;
function jump(){

    if(!playerData.onGround){
        return;
    }

    playerData.velocityY = JUMP_POWER;
    playerData.onGround = false;

}

// ======================================
// メインループ
// ======================================
function gameLoop(){

    if(gameStarted){

        moveObstacles();

        playerData.velocityY -= GRAVITY;

        playerData.y += playerData.velocityY;

        const groundY = DESIGN_HEIGHT * GROUND_RATE;

        if(playerData.y <= groundY){

            playerData.y = groundY;

            playerData.velocityY = 0;

            playerData.onGround = true;

        }

    }

    drawPlayer();

    requestAnimationFrame(gameLoop);

}

function moveObstacles(){

    obstacleList.forEach((obstacle)=>{

        obstacle.x -= 8;

        obstacle.style.left = obstacle.x + "px";

        if(obstacle.x < -300){

            obstacle.remove();

        }

    });

}


// ======================================
// タップ
// ======================================

document.addEventListener("pointerdown",()=>{

    if(!gameStarted){

        startGame();

        return;

    }

    jump();

});
// ======================================
// 初期化
// ======================================

resizeGame();

// ==============================
// ゲーム全体を画面サイズに合わせる
// ==============================
function fitGame(){

    const game = document.getElementById("game");

    const scale = Math.min(

        window.innerWidth / DESIGN_WIDTH,

        window.innerHeight / DESIGN_HEIGHT

    );

    game.style.transform = `scale(${scale})`;

}

window.addEventListener("resize", fitGame);

fitGame();
gameLoop();


// ======================================
// 障害物
// ======================================

const obstacles = document.getElementById("obstacles");


let obstacleList = [];


// 障害物作成

function createObstacle(type){

    const obj = document.createElement("div");

    obj.className = "obstacle " + type;

    obj.textContent = type.toUpperCase();

    // ゲーム内座標
    obj.x = DESIGN_WIDTH;

    // 地面位置
    obj.y = DESIGN_HEIGHT * GROUND_RATE;

    obj.style.left = obj.x + "px";

    switch(type){

        case "small":
        case "medium":
        case "large":
            // 地面の上に置く
            obj.style.bottom = obj.y + "px";
            break;

        case "hole":
            // 穴は地面に配置
            obj.style.bottom = "0px";
            break;

    }

    obstacles.appendChild(obj);

    obstacleList.push(obj);

}


// テスト生成

createObstacle("small");

createObstacle("medium");

createObstacle("large");

createObstacle("hole");


// 初期位置
obstacleList[0].x = 800;
obstacleList[1].x = 1200;
obstacleList[2].x = 1700;
obstacleList[3].x = 2300;

obstacleList.forEach(obstacle => {
    obstacle.style.left = obstacle.x + "px";
});
