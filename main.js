// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할 일이 추가된다.
// 유저가 delete버튼을 누르면 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만.
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴.

let taskInput =  document.getElementById("task-input");
let btnAdd = document.getElementById("btn-add");
let taskList = []; //어레이 만듬

// btnAdd 클릭이벤트
btnAdd.addEventListener("click", addTask);

function addTask(){
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = ''; //스트링 변수

    for(let i = 0; i < taskList.length; i++){
        resultHTML += `<div class="task">
                    <div>${taskList[i]}</div>
                    <div class="btn-wrap">
                        <button class="check">Check</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>`
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}