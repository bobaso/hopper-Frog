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

    const rect = world.getBoundingClientRect();

    const scaleX = rect.width / DESIGN_WIDTH;
    const scaleY = rect.height / DESIGN_HEIGHT;

    playerData.width = PLAYER_SIZE * scaleX;
    playerData.height = PLAYER_SIZE * scaleX;

    playerData.x = rect.width * 0.15;

    if(!gameStarted){

    playerData.y = rect.height * GROUND_RATE;

}

    drawPlayer();

}

window.addEventListener("resize", resizeGame);

// ======================================
// プレイヤー描画
// ======================================

function drawPlayer(){

    player.style.width = playerData.width + "px";

    player.style.left = playerData.x + "px";

    player.style.bottom = playerData.y + "px";

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

        playerData.velocityY -= GRAVITY;

        playerData.y += playerData.velocityY;

        const groundY = world.clientHeight * GROUND_RATE;

        if(playerData.y <= groundY){

            playerData.y = groundY;

            playerData.velocityY = 0;

            playerData.onGround = true;

        }

    }

    drawPlayer();

    requestAnimationFrame(gameLoop);

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
