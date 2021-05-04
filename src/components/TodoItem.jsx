import React from 'react'

export  function TodoItem({ todo, toggleTodo }) {
    const {id, task, checked } = todo;

    const handleTodoClick = () => {
        toggleTodo(id);
    };

    return (
        <li>
            <input type="checkbox" checked={checked} onChange={handleTodoClick}/>
            { task }
        </li>
    )
}