// Tạo dữ liệu có sẵn nếu m muốn
// localStorage.setItem('todoList', JSON.stringify([{id: 1, name: 'Đánh răng', completed: false}]));
interface ITodoList{
    id: number,
    name: string,
    completed: boolean
}


class TodoList implements ITodoList{
    id: number;
    name: string;
    completed: boolean;
    todoList: ITodoList[];
    constructor(todoList: ITodoList[]) {
        this.todoList = todoList;
        this.id = 0;
        this.name = '',
        this.completed = false
    }
    // render dữ liệu 
    renderJob = () => {
        const listTodo = document.getElementById('listTodo') as HTMLUListElement;
        let text = ``;
        if(this.todoList.length === 0){
            listTodo.innerHTML = '';
        }
        this.todoList.forEach(item => {
            text += `
            
            <li class="todo">
                    <div>${item.name}</div>
                    <div class="function">
                        <input onclick="completed(${item.id})" class="done" type="checkbox">
                        <ion-icon onclick="edits(${item.id})" class="change" name="pencil-outline"></ion-icon>
                        <ion-icon onclick="deletes(${item.id})" class="delTodo" name="trash-bin-outline"></ion-icon>
                    </div>
                </li>
                <hr>
            `
        });
        listTodo.innerHTML = text;
    }
    // nhận dữ liệu đc truyền từ hàm addNewTask để tạo 
    createJob(name: string){
        this.todoList.push({id: Math.floor(Math.random() * 1000000),name: name, completed: false})
    }

    // Xóa 
    deteteJob = (value: number) =>{
        this.todoList.map(item => {
            if(item.id === value){
                this.todoList.splice(1, 1);
            }
        })
    }

    // Xóa "Đã xong"
    deleteCompleted = () =>{
        this.todoList.map(item =>{
            if(item.completed){
                this.todoList.splice(1, 1);
            }
        })
    }

    // Xóa hết 
    deleteAll = () =>{
        this.todoList = []
    }

    // Khi click vào nút hoàn thành
    completedJob = (value: number) =>{
        this.todoList.map(item =>{
            if(item.id === value){
                item.completed = !item.completed;
            }
        })
    }
}
// Lấy dữ liệu từ local và render 
const todoList = new TodoList(JSON.parse(localStorage.getItem('todoList') || '[]') || []);
todoList.renderJob();

// Hàm xóa hết mấy cái hoàn thành
const deleteDoneTask = (value: number) =>{
    if(!confirm("Bạn có muốn xóa")){
        return
    }
    todoList.deleteCompleted();
    todoList.renderJob();
    localStorage.setItem('todoList', JSON.stringify(todoList.todoList));
}

// Hàm xóa hết 
const deleteAllTask = () =>{
    if(!confirm("Bạn có muốn xóa")){
        return
    }
    todoList.deleteAll();
    todoList.renderJob();
    localStorage.setItem('todoList', JSON.stringify(todoList.todoList));
}

// Hàm thêm mới
const addNewTask = () =>{
    // Lấy dữ liệu từ chỗ TodoInput cái Input bên trên 
    const todoInput = document.getElementById('todoInput') as HTMLInputElement;
    if(todoInput.value === ''){
        return
    }
    todoList.createJob(todoInput.value);
    todoList.renderJob();
    todoInput.value = '';
    localStorage.setItem('todoList', JSON.stringify(todoList.todoList));
}

// Hàm xóa 
const deletes = (value: number) =>{
    if(!confirm("Bạn có muốn xóa")){
        return
    }
    if(todoList.todoList.length === 1){
        todoList.deleteAll();
    }
    todoList.deteteJob(value);
    todoList.renderJob();
    localStorage.setItem('todoList', JSON.stringify(todoList.todoList));
}


// Hàm khi nhấn vào ô để nó hoàn thành công việc
const completed = (value: number) =>{
    // const todoInput = document.getElementById('todoInput') as HTMLInputElement;
    todoList.completedJob(value);
    console.log(todoList.todoList);
    localStorage.setItem('todoList', JSON.stringify(todoList.todoList));
}