let taskInput = document.getElementById("task-input");
let btnAdd = document.getElementById("btn-add");
let tabs = document.querySelectorAll(".task-tabs a");
let taskList = [];
let mode = 'all';
let underLine = document.getElementById("under-line");
let underLineMenu = document.querySelectorAll(".task-tabs span");

// 탭 클릭 이벤트
tabs.forEach(tab => {
    tab.addEventListener("click", function(event) {
        filter(event);
        horizontalIndicator(event);
    });
});

// 추가 버튼 클릭 이벤트
btnAdd.addEventListener("click", addTask);

// 입력창에서 Enter 키 누르면 할 일 추가
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// 할 일 추가 함수
function addTask() {
    if (taskInput.value.trim() !== "") {
        let task = {
            id: randomIDGenerate(),
            taskContent: taskInput.value,
            isComplete: false
        };
        taskList.push(task);
        render();
        taskInput.value = ""; // 입력창 비우기
        taskInput.focus(); // 포커스 유지
    } else {
        alert("할 일을 입력하세요!");
    }
}

// 렌더 함수
function render() {
    let list = mode === "all" ? taskList : taskList.filter(task => (mode === "ongoing" ? !task.isComplete : task.isComplete));
    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        resultHTML += `
            <div class="task">
                <div class="${list[i].isComplete ? 'task-done' : ''}">${list[i].taskContent}</div>
                <div class="btn-wrap">
                    <button id="check" onclick="toggleComplete('${list[i].id}')">
                        <i class="fa-solid fa-${list[i].isComplete ? 'rotate-left' : 'check'}"></i>
                    </button>
                    <button id="delete" onclick="deleteTask('${list[i].id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>`;
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

// 완료 상태 토글 함수
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

// 삭제 함수
function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    alert("정말 삭제하시겠습니까?");
    render();
}

// 필터링 함수
function filter(event) {
    mode = event.target.closest("a").id;
    render();
}

// 랜덤 ID 생성 함수
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// 언더라인 위치 조정 함수
function horizontalIndicator(event) {
    const spanElement = event.currentTarget.querySelector("span"); // 클릭된 a 태그 안의 span 태그 선택
    underLine.style.left = spanElement.offsetLeft + "px"; // span 태그의 위치
    underLine.style.width = spanElement.offsetWidth + "px"; // span 태그의 너비
    underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px"; // a 태그의 아래쪽
}

// 페이지 로드 시 기본으로 첫 번째 탭에 대해 #under-line 설정
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
