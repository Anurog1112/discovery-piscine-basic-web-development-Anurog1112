// จัดการ Cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // ใช้ encodeURIComponent เพื่อป้องกันปัญหาภาษาไทยและอักขระพิเศษ
    document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) 
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}


function newTodo() {
    let text = prompt("คุณอยากทำอะไร");
    if (text != null && text.trim() !== "") {
        addTodoToDOM(text);
        saveTodoList();
    }
}

// ฟังก์ชันช่วย: สร้าง HTML และแปะลงหน้าเว็บ
function addTodoToDOM(text) {
    let todoDiv = document.createElement("div");
    todoDiv.innerHTML = text;
    todoDiv.className = "todo-item";

    // กฎ: คลิกแล้วลบ
    todoDiv.onclick = function() {
        if (confirm("ทำเสร็จแล้วหรอ? จะลบเลยนะ?")) {
            this.remove();
            saveTodoList(); // *** ลบแล้วก็ต้องบันทึก Cookie ใหม่ด้วย ***
        }
    };

    let list = document.getElementById("ft_list");
    list.prepend(todoDiv);
}

// บันทึกทุกรายการหน้าเว็บไปเก็บลง Cookie
function saveTodoList() {
    let todos = [];
    let list = document.getElementById("ft_list").children;
    
    for (let i = 0; i < list.length; i++) {
        todos.push(list[i].innerHTML);
    }
    
    // แปลง Array เป็นข้อความ JSON แล้วยัดใส่ Cookie ชื่อ 'todoList'
    // เนื่องจากเรา prepend (แทรกบนสุด) ตลอด เวลา save ต้อง reverse กลับเพื่อให้ลำดับถูกต้องตอนโหลด
    setCookie("todoList", JSON.stringify(todos), 7);
}

// โหลดทำงานทันทีที่เปิดหน้าเว็บ
function loadTodoList() {
    let cookie = getCookie("todoList");
    if (cookie) {
        let todos = JSON.parse(cookie); // แปลงข้อความกลับเป็น Array
        for (let i = todos.length - 1; i >= 0; i--) {
            addTodoToDOM(todos[i]);
        }
    }
}

// *** สั่งให้โหลดข้อมูลทันทีที่เปิดไฟล์ ***
window.onload = loadTodoList;