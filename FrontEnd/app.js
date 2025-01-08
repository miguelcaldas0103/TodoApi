document.addEventListener('DOMContentLoaded', async () => {
    const todosContainer = document.querySelector('.todos-container');

    const getApplicationTodos = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5271/todoitems");
            if (!response.ok) {
                throw new Error(`HTTP ERROR!: ${response.status}`);
            }
            const todos = response.json();
            console.log(todos);
            return todos;
        } catch (error) {
            console.error("Error fetching todos", error)
            return []
        }
    }

    const renderTodos = async () => {
        const todos = await getApplicationTodos();

        todosContainer.innerHTML = "";
        if (todos.length == 0) {
            todosContainer.innerHTML = "<p>There are no todos for completion.</p>"
            return
        }
        else {
            todos.forEach(todo => {
                const todoItem = document.createElement('div');
                todoItem.classList.add('todo-item');
                todoItem.innerHTML = `<h3>${todo.name}</h3>`
                todosContainer.appendChild(todoItem);
            });
        }
    }
    renderTodos();
})