// ==============================
// プレイヤー
// ==============================

const player = document.getElementById("player");

// アニメーション画像
const frames = [
    "img/frog1.png",
    "img/frog2.png"
];

// 現在の画像番号
let frame = 0;

// ゲーム開始状態
let gameStarted = false;

// ==============================
// アニメーション
// ==============================

function startAnimation(){

    setInterval(() => {

        // ゲーム開始前は動かさない
        if(!gameStarted){
            return;
        }

        frame++;

        if(frame >= frames.length){
            frame = 0;
        }

        player.src = frames[frame];

    },200);

}

// ==============================
// ゲーム開始
// ==============================

function startGame(){

    if(gameStarted){
        return;
    }

    gameStarted = true;

    document.getElementById("message").style.display = "none";

}

// ==============================
// タップ
// ==============================

document.addEventListener("pointerdown", startGame);

// ==============================
// 初期化
// ==============================

player.src = frames[0];

startAnimation();
