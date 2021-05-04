import React, { Fragment, useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

const KEY = "todoApp.todos";

export function App() {
    const [todos, setTodos] = useState([]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
            if(storedTodos) {
                setTodos(storedTodos);
            }
        },[]);
        

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.checked = !todo.checked;
        setTodos(newTodos);
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task, checked: false}]
        });

        todoTaskRef.current.value = null;
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.checked);
        setTodos(newTodos);
    };

    return (
        <Fragment>
            <TodoList todos={ todos } toggleTodo={ toggleTodo }/>
            <input ref={ todoTaskRef } type="text" placeholder="New task"/>
            <button onClick={ handleTodoAdd }>➕</button>
            <button onClick={ handleClearAll }>🗑️</button>
            <div>{todos.filter((todo) => !todo.checked).length} tasks remain</div>
        </Fragment> 
    );
};