// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할 일이 추가된다.
// 유저가 delete버튼을 누르면 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
    // 1. check 버튼을 클릭하는 순간 false를 true로 바꿔준다.
    // 2. true이면 끝난걸로 간주하고 밑줄 보여주기
    // 3. false이면 안 끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만.
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴.

let taskInput =  document.getElementById("task-input");
let btnAdd = document.getElementById("btn-add");
let taskList = []; //어레이 만듬

// btnAdd 클릭이벤트
btnAdd.addEventListener("click", addTask);

 // 입력창 클릭하면 placeholder 제거, 입력값 지우기
taskInput.addEventListener("focus", function() {
    this.value = "";
    this.placeholder = "";
});
// 입력창에서 벗어나면 placeholder 복원
taskInput.addEventListener("blur", function() {
    this.placeholder = "오늘 할일은?";
});

// Enter 키
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = ''; //스트링 변수

    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML +=`<div class="task">
                    <div class="task-done">${taskList[i].taskContent}</div>
                    <div class="btn-wrap">
                        <button id="check" onclick="toggleComplete('${taskList[i].id}')">Check</button>
                        <button id="delete" onclick="deleteTask('${taskList[i].id}')">Delete</button>
                    </div>
                </div>`;
        }else{
            resultHTML += `<div class="task">
                    <div>${taskList[i].taskContent}</div>
                    <div class="btn-wrap">
                        <button id="check" onclick="toggleComplete('${taskList[i].id}')">Check</button>
                        <button id="delete" onclick="deleteTask('${taskList[i].id}')">Delete</button>
                    </div>
                </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}