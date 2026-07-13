//==============================
// HTML取得
//==============================

const player = document.getElementById("player");
const message = document.getElementById("message");
const world = document.getElementById("world");

//==============================
// アニメーション画像
//==============================

const frames = [
    "frog1.png",
    "frog2.png"
];

let frame = 0;

//==============================
// ゲーム状態
//==============================

let gameStarted = false;

//==============================
// プレイヤー
//==============================

// 横位置
let playerX;

// 高さ
let playerY;

// ジャンプ速度
let velocityY = 0;

// 重力
const gravity = -0.8;

// ジャンプ力
const jumpPower = 15;

// 地面の高さ
let groundY;

//==============================
// 初期化
//==============================

function resizeGame(){

    groundY = window.innerHeight * 0.15;

    playerX = window.innerWidth * 0.15;

    playerY = groundY;

    updatePlayer();

}

window.addEventListener("resize", resizeGame);

resizeGame();

//==============================
// プレイヤー表示更新
//==============================

function updatePlayer(){

    player.style.left = playerX + "px";

    player.style.bottom = playerY + "px";

}

//==============================
// ゲーム開始
//==============================

function startGame(){

    if(gameStarted) return;

    gameStarted = true;

    message.style.display = "none";

}

//==============================
// ジャンプ
//==============================

function jump(){

    velocityY = jumpPower;

}

//==============================
// メインループ
//==============================

function gameLoop(){

    if(gameStarted){

        velocityY += gravity;

        playerY += velocityY;

        if(playerY < groundY){

            playerY = groundY;

            velocityY = 0;

        }

        updatePlayer();

    }

    requestAnimationFrame(gameLoop);

}

gameLoop();

//==============================
// アニメーション
//==============================

setInterval(()=>{

    if(!gameStarted) return;

    frame++;

    if(frame>=frames.length){

        frame=0;

    }

    player.src = frames[frame];

},200);

//==============================
// タップ
//==============================

document.addEventListener("pointerdown",()=>{

    if(!gameStarted){

        startGame();

    }else{

        jump();

    }

});
