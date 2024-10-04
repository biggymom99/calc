const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');//2d 그리기 컨텍스트 가져오기

// 공룡 설정
const dino = {
    //xy 좌표는 공룡 박스의 좌상단 모서리
    x: 50, // 공룡의 x 좌표 
    y: 150, // 공룡의 y 좌표
    width: 10, // 공룡의 너비
    height: 20, // 공룡의 높이
    dy: 0, // 공룡의 수직 속도(점프시 사용)
    gravity: 0.5, // 중력
    jumpPower: -8, //점프 속도
    grounded: true,//공룡이 땅에 닿아있는지
    draw: function () {
        // 공룡 그리는 함수
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    jump: function () {
        // 점프 함수 : 공룡이 땅에 닿아 있을 때만 점프가능
        // 아래 this는 dino 객체를 가리키는 참조
        if (this.grounded) {
            this.dy = this.jumpPower;
            this.grounded = false;
        }
    },
    update: function () {
        // 중력을 적용해 공룡의 y좌표를 업데이트 하고, 땅에 닿으면 위치 고정
        this.y += this.dy;
        // 공룡 y좌표에 공룡 높이를 더한 값 : 공룡의 하단이 화면 바닥에 얼마나 가까운지
        // 즉, 얘가 참이면 공룡 발이 바닥에 닿아있거나 위에 있음
        if (this.y + this.height >= canvas.height) {
            //캔버스 높이에서 공룡의 높이를 뺀 위치로 설정하면 공룡이 땅에 착지
            this.y = canvas.height - this.height;
            this.grounded = true;
            //땅에 닿았으니 수직 속도변화 0으로 맞추기
            this.dy = 0;
        } else {
            this.dy += this.gravity;
        }
    }
};

// 장애물 설정
const obstacle = {
    x: 200, // 장애물 x 좌표
    y: 170, // 장애물 y 좌표
    width: 10, // 장애물의 너비
    height: 10, // 장애물의 높이
    speed: 3, // 장애물이 왼쪽으로 움직이는 속도
    draw: function () {
        // 장애물 그리는 함수
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function () {
        // 장애물이 왼쪽으로 이동, 화면 밖으로 나가면 오른쪽 끝으로 위치 리셋
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = canvas.width;
        }
    }
};

// 게임 실행
function gameLoop() {
    //화면 지움
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //공룡 업데이트(중력 적용)
    dino.update();
    dino.draw();

    //장애물 업데이트(움직임 적용)
    obstacle.update();
    obstacle.draw();

    // 충돌 감지
    if (//장애물을 못넘는 경우 4가지

        //공룡의 왼쪽 경계가 장애물의 오른쪽 경계보다 왼쪽에 있을떄
        // (<면 못넘어갔단뜻)
        dino.x < obstacle.x + obstacle.width &&
        //공룡의 오른쪽 경계가 장애물의 왼쪽 경계보다 오른쪽에 있을때
        //겹쳐졌는지
        dino.x + dino.width > obstacle.x &&
        //공룡의 상단 경계가 장애물의 하단경계보다 위에 있을때
        //공룡이 장애물의 하단을 못넘어섰는지
        dino.y < obstacle.y + obstacle.height &&
        //공룡의 하단 경계가 장애물의 상단경계보다 아래 있을때
        dino.y + dino.height > obstacle.y
    ) {
        alert('Game Over');
        canvas.style.display='none';
        calculator.style.display='block';
    }

    requestAnimationFrame(gameLoop);
}

// 키보드 입력 처리
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        dino.jump();
    }
});

window.startGame = function() {
    document.getElementById('calculator').style.display = 'none';  // 계산기 숨김
    canvas.style.display = 'block';  // 게임 화면 표시
    gameLoop();  // 게임 시작
}