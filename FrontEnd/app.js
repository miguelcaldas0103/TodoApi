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

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5271/todoitems/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete todo. Status: ${response.status}`);
            }

            return response.status; // Returns 200 if successful
        } catch (error) {
            console.error("Error deleting todo:", error);
            throw error; // Propagate the error if needed
        }
    };

    // const markAsCompleted = async (id) => {
    //     try {
    //         response = await fetch(`http://127.0.0.1:5271/todoitems/${id}`, {
    //             method: 'PUT'
    //         })
    //         if (!response.ok) {

    //         }
    //     } catch (error) {

    //     }
    // }

    const renderTodos = async () => {
        const todos = await getApplicationTodos();

        todosContainer.innerHTML = "";
        if (todos.length == 0) {
            todosContainer.innerHTML = "<p>There are no todos for completion.</p>"
            return
        }
        else {
            todos.forEach(todo => {
                const todoItem = document.createElement('div')
                const deleteButton = document.createElement('button')

                deleteButton.addEventListener('click', async (params) => {
                    await deleteTodo(todo.id);
                    renderTodos();
                })

                deleteButton.innerHTML = 'Delete'

                todoItem.classList.add('todo-item');
                todoItem.innerHTML = `<h3>${todo.name}</h3>`
                todoItem.appendChild(deleteButton)
                todosContainer.appendChild(todoItem);
            });
        }
    }
    renderTodos();
})