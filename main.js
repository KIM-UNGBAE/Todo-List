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
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = []; //어레이 만듬
let mode = 'all';
let filterList = [];
let deletedTasks = [];
let underLine = document.getElementById("under-line");
let underLineMenu = document.querySelectorAll(".task-tabs > a > span ");

// tabs 클릭이벤트
for(let i = 1; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)});
}

// btnAdd 클릭이벤트
btnAdd.addEventListener("click", addTask);

 // 입력창 클릭하면 placeholder 제거, 입력값 지우기
taskInput.addEventListener("focus", function() {
    this.value = "";
    this.placeholder = "";
});
// 입력창에서 벗어나면 placeholder 복원
taskInput.addEventListener("blur", function() {
    this.placeholder = "오늘 할 일은?";
});

// Enter 키
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    // 입력값이 비어있지 않은 경우에만 추가
    if (taskInput.value.trim() !== "") {
        let task = {
            id: randomIDGenerate(),
            taskContent: taskInput.value,
            isComplete: false
        };

        taskList.push(task); // 할일 추가
        console.log(taskList); // 할일 목록 출력
        render(); // 화면에 렌더링

        // 입력창 비우지 않고 포커스 유지
        taskInput.focus(); // 커서를 입력창에 계속 두기

        // 입력창 비우기
        taskInput.value = "";
    } else {
        alert("할 일을 입력하세요!"); // 입력값이 없을 경우 경고 메시지
    }
}

function render(){
    // 1. 내가 선택한 탭에 따라서
    let list = [];
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = taskList.filter(task => (mode === "ongoing" ? !task.isComplete : task.isComplete));
    }
    // 2. 리스트를 달리 보여준다.

    let resultHTML = ''; //스트링 변수

    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML +=`<div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div class="btn-wrap">
                        <button id="check" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                        <button id="delete" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`;
        }else{
            resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div class="btn-wrap">
                        <button id="check" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button id="delete" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
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
            alert("정말로 삭제하시겠습니까?")
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = [];

    if(mode === "all"){
        // 전체 리스트를 보여준다
        render();
    }else if(mode === "ongoing"){
        // 진행중인 아이템을 보여준다
        // task.isComplete = false
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중", filterList);
    }else if(mode === "done"){
        // 끝나는 케이스
        // task.isComplete = true
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

// task-tabs a태그 클릭시 under-line 이동
underLineMenu.forEach(menu => menu.addEventListener("click", (e) => horizontalIndicator(e)))

function horizontalIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = 
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

// // 페이지 로드 시 기본으로 첫 번째 탭에 대해 #under-line 설정
window.addEventListener('load', () => {
    const firstTab = underLineMenu[0]; // 첫 번째 탭
    underLine.style.left = firstTab.offsetLeft + "px"; // 첫 번째 탭의 위치
    underLine.style.width = firstTab.offsetWidth + "px"; // 첫 번째 탭의 너비
    underLine.style.top = firstTab.offsetTop + firstTab.offsetHeight + "px"; // 첫 번째 탭의 아래쪽
    firstTab.classList.add('on'); // 기본적으로 첫 번째 탭 활성화
});

// 창 크기 변경 시 under-line 위치 재조정
window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.task-tabs a.on span'); // 현재 활성화된 탭
    if (activeTab) {
        underLine.style.left = activeTab.offsetLeft + "px";
        underLine.style.width = activeTab.offsetWidth + "px";
        underLine.style.top = activeTab.offsetTop + activeTab.offsetHeight + "px";
    }
});

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}