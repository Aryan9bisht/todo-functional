import React, { useState } from 'react';
import { v4 as uuidv4,v4 } from 'uuid';

let index =0;
export default function Todo() {
    const [todos,setTodos]=useState([
     
    ]);
    const [newTodo, setNewTodo] = useState('');
    const [filtered,setfiltered]= useState([]);
    const [showCompleted, setShowCompleted] = useState(false);


    const handleChange = (e) => {
        setNewTodo(e.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return; // If newTodo is empty or contains only whitespace, return
        const todo = {
            id: index++,
            title: newTodo,
            completed: false
        };
        setTodos([...todos, todo]); // Add the new todo to the todos array
        setNewTodo(''); // Reset the newTodo state to an empty string
        
    };
 
    const clicked = (id) => {
        if(showCompleted){
            setfiltered(prevTodos =>
                prevTodos.map(todo =>
                  todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            )
        }
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      };
      const deleted = (id) => {
        setTodos(prevTodos =>
            prevTodos.filter(todo => todo.id !== id)
        );
    };
    
    const clear =()=>{
        setTodos([]);
        setfiltered([]);
    }
    const complete = () => {
        const completedTodos = todos.filter(todo => todo.completed);
        setfiltered(completedTodos);
     setShowCompleted(true);

    };
    const active = () =>{
        const completedTodos= todos.filter(todo=> !todo.completed);
        setfiltered(completedTodos);
        setShowCompleted(true);
    }
    const All =()=>{
        setShowCompleted(false);
    }
    return (
        <div>
         <form onSubmit={submit}>
            <h1>Todo List</h1>
            <input 
                type='text' 
                placeholder='Enter the task' 
                value={newTodo} 
                onChange={handleChange} 
            />
      </form>
      {showCompleted ? (
    <div className="dis">
        {filtered.map(todo => (
            <div key={todo.id} className={'first'} style={{display:'flex',justifyContent:'space-evenly'}}>
                <input style={{margin:'10px'}} type='checkbox' checked={todo.completed} onChange={() => clicked(todo.id) } />
                <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' ,margin:'10px'}}> {todo.title}</p>
                <button style={{margin:'10px'}} onClick={()=>deleted(todo.id)}> X</button>
            </div>
        ))}
    </div>
) : (
    <div className='dis'>
        {todos.map(todo => (
            <div key={todo.id} className={'first'}style={{display:'flex',justifyContent:'space-evenly'}}>
                <input style={{margin:'10px'}} type='checkbox' checked={todo.completed} onChange={() => clicked(todo.id) } />
                <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' ,margin:'10px'}}> {todo.title}</p>
                <button style={{margin:'10px'}} onClick={()=>deleted(todo.id)}> X</button>
            </div>
        ))}
    </div>
)}


    <button onClick={complete}>Completed</button>
    <button onClick={active}>Active</button>
    <button onClick={All}>All</button>
    <button onClick={clear}>Clear</button>
    </div>
  )
}
