// ======================================
// HTML取得
// ======================================

const world = document.getElementById("world");
const player = document.getElementById("player");
const score = document.getElementById("score");
const message = document.getElementById("message");
const retryButton =
    document.getElementById("retryButton");
retryButton.addEventListener("click", retryGame);
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
    
onGround: true,

jumpCount: 0

};

// ======================================
// ゲーム状態
// ======================================

let gameStarted = false;
let scrollSpeed = 8;


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

    // ジャンプ中
    if(!playerData.onGround){

        player.src = "frog3.png";
        return;

    }

    // 地上では歩行アニメーション
    frame++;

    if(frame >= frogImages.length){

        frame = 0;

    }

    player.src = frogImages[frame];

},180);

// ======================================
// ゲーム開始
// ======================================

function startGame(){

    if(gameStarted) return;

    gameStarted = true;

    startTime = Date.now();

    obstacleScore = 0;
    timeScore = 0;
    scrollSpeed = 8;
    message.style.display = "none";

}
// ======================================
// スコア
// ======================================

let obstacleScore = 0;
let timeScore = 0;

let startTime = 0;
// ======================================
// ジャンプ設定
// ======================================

const GRAVITY = 1.2;
const JUMP_POWER = 23;
function jump(){

    if(playerData.jumpCount >= 2){
        return;
    }

    playerData.velocityY = JUMP_POWER;

    playerData.onGround = false;

    playerData.jumpCount++;

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
            playerData.jumpCount = 0;

        }
timeScore = Math.floor((Date.now() - startTime) / 100);
        const elapsedSeconds =
    Math.floor((Date.now() - startTime) / 1000);

// 15秒ごとに速度アップ
scrollSpeed = 8 + Math.floor(elapsedSeconds / 15) * 0.5;

score.textContent =
    obstacleScore + timeScore;
    }
drawPlayer();

if(gameStarted){

    checkCollision();

}

requestAnimationFrame(gameLoop);

}
function moveObstacles(){

    obstacleList = obstacleList.filter((obstacle)=>{

        // 障害物を移動
        obstacle.x -= scrollSpeed;

        obstacle.style.left = obstacle.x + "px";

        // 通過で加点
        if(
            !obstacle.scored &&
            obstacle.x + obstacle.offsetWidth < playerData.x
        ){

            obstacle.scored = true;
            obstacleScore += 100;

        }

        // 画面外なら削除
        if(obstacle.x < -300){

            obstacle.remove();
            return false;

        }

        return true;

    });

}
function checkCollision(){

const hitMargin = 25;

const playerLeft =
    playerData.x - playerData.width / 2 + hitMargin;

const playerRight =
    playerData.x + playerData.width / 2 - hitMargin;

const playerBottom =
    playerData.y + hitMargin;

const playerTop =
    playerData.y + playerData.height - hitMargin;

    obstacleList.forEach((obstacle)=>{

 if(obstacle.dataset.type === "hole"){

    checkHole(obstacle);

    return;

}

        const margin = 20;

const obstacleLeft =
    obstacle.x + margin;

const obstacleRight =
    obstacle.x + obstacle.offsetWidth - margin;

const obstacleBottom =
    DESIGN_HEIGHT * GROUND_RATE + margin;

const obstacleTop =
    obstacleBottom + obstacle.offsetHeight - margin * 2;

        const hit =

            playerRight > obstacleLeft &&
            playerLeft < obstacleRight &&
            playerTop > obstacleBottom &&
            playerBottom < obstacleTop;

        if(hit){

            gameOver();

        }

    });

}
// 穴の設定
function checkHole(obstacle){

    const holeLeft = obstacle.x;
    const holeRight = obstacle.x + obstacle.offsetWidth;

    const playerCenter = playerData.x;

    if(
        playerCenter > holeLeft + 20 &&
        playerCenter < holeRight - 20 &&
        playerData.onGround
    ){
        gameOver();
    }

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

obj.dataset.type = type;

obj.textContent = type.toUpperCase();

    // ゲーム内座標
  obj.x = DESIGN_WIDTH + 200;

    // 地面位置
    obj.y = DESIGN_HEIGHT * GROUND_RATE;

    obj.style.left = obj.x + "px";

    switch(type){

        case "small":
        case "medium":
            // 地面の上に置く
            obj.style.bottom = obj.y + "px";
            break;

        case "hole":
            // 穴は地面に配置
            obj.style.bottom =
        (obj.y - 20) + "px";

    break;

    }

    obstacles.appendChild(obj);
    obj.scored = false;
    obstacleList.push(obj);


}

// ランダム生成する障害物の種類
const obstacleTypes = [
    "small",
    "medium",
    "hole"
];

// 一定時間ごとに障害物を生成
const obstacleInterval = setInterval(()=>{

    if(!gameStarted) return;

    const type =
        obstacleTypes[
            Math.floor(Math.random()*obstacleTypes.length)
        ];

    createObstacle(type);

},2000);

// ======================================
// ゲームオーバー
// ======================================
function gameOver(){

    gameStarted = false;

    document.getElementById("gameOver").style.display = "flex";

    document.getElementById("finalScore").textContent =
        "SCORE : " + (obstacleScore + timeScore);

}

function retryGame(){

    // GAME OVERを閉じる
    document.getElementById("gameOver").style.display = "none";

    // 障害物を全部消す
    obstacleList.forEach(obstacle => obstacle.remove());
    obstacleList = [];

    // プレイヤー初期化
playerData.y = DESIGN_HEIGHT * GROUND_RATE;
playerData.velocityY = 0;
playerData.jumpCount = 0;
playerData.onGround = true;

drawPlayer();
 // メッセージ
message.style.display = "block";

gameStarted = false;
obstacleScore = 0;
timeScore = 0;

score.textContent = "0";
}
