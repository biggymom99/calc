// 각 버튼 클릭했을떄 콘솔에 각 버튼 밸류 나오게 하기
// addEventListener, forEach, event.target

//버튼눌러서 숫자 표시
//display 내가 부여한 클래스이름이라서 . 찍어야하고 button은 태그이름이라서 앞에 선택자가 없는게 마즘

const number = document.querySelectorAll(".number");
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const functions = document.querySelectorAll('.functions')

let firstOperand = "";
let secondOperand = "";
let operator = "";
let isOper="";
let funcs="";

//buttons 클래스에 대해 forEach 사용
buttons.forEach(button => {
    //각 버튼에 클릭이벤트리스너 추가
    //이벤트 리스너가 작동할때 브라우저가 event 객체 생성
    button.addEventListener('click',(event)=>
    //클릭 발생시 이벤트가 일어난 곳의 버튼값 콘솔로그로 출력
    console.log(event.target.textContent))
})

// 숫자를 디스플레이에 표시하기
// 초기 0일때는 클릭한 숫자로
// 초기 0 아닐때는 클릭한 숫자가 뒤에 추가
// number클래스에 대해서만

number.forEach(button => {
    button.addEventListener('click',()=>{
        //value는 input요소에 사용되는 기본속성이기 때문에 버튼에는 커스텀속성을 써야함
        const numvalue = button.dataset.numValue;
        console.log('Clicked value:', numvalue);  
        //Text content: 여백포함,innerText: 여백미포함
        //isOper가 참이거나 화면에 0이 있을 때, 두 상황 중 하나만 참이면 숫자를 새로 넣음
        if (display.textContent === '0' || isOper){            
            display.textContent = numvalue;
            isOper=false;
        }else {
            display.textContent += numvalue;
        }
    })
})

//functions() 구현
function firstLine(firstOperand, secondOperand, button){
    let result;
    const funcvalue = button.dataset.funcValue;
    console.log('Clicked value:', funcvalue);  
    switch(funcvalue) {
        case "C":
            display.innerText="0";
            firstOperand = "";
            secondOperand = "";
            operator = "";
            console.log(display.innerText,firstOperand,secondOperand,operator);
            break;

        case "±":
            display.textContent=(-1)*Number(display.textContent);

        case "%":
            result= parseFloat(firstOperand) * 0.01;
            return result;

        default: result = 'ERROR';
        display.innerText=result;
    }
}

functions.forEach(button =>{
    button.addEventListener('click',(e)=>firstLine(firstOperand,secondOperand,e.target))
})

//calculate() 구현
function calculate(firstOperand, secondOperand, operator) {
    let result;
    let first=parseFloat(firstOperand);
    let second=parseFloat(secondOperand);
    switch (operator) {
        case "+":
            result = first + second;
            break;
        case "-":
            result = first - second;
            break;
        case "*":
            result = first * second;
            break;
        case "/":
            result = first / second;
            break;
        default :

        result = 'ERROR';
        break;
    }
    
    display.innerText = result; // 계산 결과를 화면에 표시
    return result
}

buttons.forEach(button => {

    button.addEventListener('click',()=>{

        if(button.dataset.operValue){
            //연산기호버튼이 클릭되면 현재 디스플레이 값을 firstOperand로 저장, 연산기호 기억
            firstOperand = display.innerText;
            operator = button.dataset.operValue;  
            console.log('First Operand:',firstOperand,',Operator:',operator);
            isOper=true;                 
        
        } else if(button.dataset.equlValue){
            //=버튼이 눌리면 calculate 동작
            secondOperand = display.innerText;
            console.log('Second Operand:', secondOperand)
            isOper=false; 
            const result = calculate(firstOperand, secondOperand, operator);
            console.log(result);
        }
    })
})

function black(){
    alert('뛰어난 관찰력!');
    alert('어떻게 찾았나요?');
    alert('그렇군요..');
    alert('뭐 없냐구요?');
    alert('네!');
    alert('하지만 .. 다른 곳에도 있어요');
    alert('걔는 다를지도..?');
}

let inputSequence = '';  // 입력된 숫자 기록

const numberButtons = document.querySelectorAll('.button.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-num-value');
        inputSequence += number;
        // '6500'이 입력되면 공룡 게임 시작
        if (inputSequence === '6500') {
            startGame();  // 공룡 게임 시작 (game.js에 정의됨)
            inputSequence = '';  // 입력 초기화
        } 
    });
});