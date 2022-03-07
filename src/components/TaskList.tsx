import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'
import '../styles/item.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.   

    if(newTaskTitle){

      const newtask = {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false,
      }
  
      setTasks( oldState => [...oldState, newtask]);

      setNewTaskTitle("")
    }

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let newTasks = tasks.filter( task => {if (task.id == id) {task.isComplete = true} return task} );
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    let newtasks = tasks.filter( task => task.id != id );
    setTasks(newtasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            className="teste"
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <h2 style={tasks.length ? {display: "none"} : {display: "block", textAlign: "center"}}>Você não tem tarefas a fazer.</h2>
        <ul style={tasks.length ? {display: "block"} : {display: "none"}}>
          {tasks.map(task => (
            <li key={task.id}>
              <div className="item-list" >
                <input
                type="checkbox"
                className={task.isComplete ? "done" : ""}
                onClick={() => handleToggleTaskCompletion(task.id)}  
                />
                <label>{task.title}</label>
              </div>
              
              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>

          ))}
          
        </ul>
      </main>
    </section>
  )
}