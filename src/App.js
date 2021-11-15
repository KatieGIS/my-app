import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from './components/Header'; // all the import should be in capital.
import About from "./components/About" // display the about component
import Footer from './components/Footer'
import Task from './components/Task';
import AddTask from './components/AddTask'

function App() {
  const [tasks, setTasks] =useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])
  const fetchTasks = async() => {
    const response = await fetch("http://localhost:5000/tasks")
    const data = await response.json()
    console.log("fetched data from json server",data)
    return data
  }


  const fetchTask = async(id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data =await response.json()
    console.log("fetched single task from json server",data)
    return data
  }
  const deleteTask = async(id) =>{
    console.log('delete:', id);
    await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'})
    // to only display the rest of tasks, do a filter which excludes the id being sent.
    setTasks(tasks.filter((task)=> task.id !== id))
  }

// Toggle reminder
  const toggleReminder = async(id) => {
    console.log('toggleReminder:', id);
    const taskToToggle = await fetchTask(id)
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const response = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      body: JSON.stringify(updateTask),
      headers: {'Content-Type': 'application/json'}
    })
    const data = await response.json()
    console.log('updated data', data)
    setTasks(
      tasks.map((task) => 
      task.id === id ? {...task, reminder:
        data.reminder} : task))
  }


  const [showAddTask,setShowAddTask] = useState(false)
  const addTask = async(task) =>{
    console.log('add:', task);
    // When adding a new task, JSON server takes ID as the sequencial index.
    // Add the task in the current tasks array
    const response = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      body: JSON.stringify(task),
      headers: {'Content-Type': 'application/json'}
    })
    const data = await response.json()
    setTasks([...tasks,data])

  }
  const onAdding= () =>{
    setShowAddTask(!showAddTask)
  }
  return (
    <Router>
      <div className="container">
      <Header title='Tasks' adding={onAdding} showAdd = {showAddTask}></Header>
        
      
      <Routes>
         <Route path ="/" element={(
          <>
          {showAddTask && <AddTask onAdd={addTask}></AddTask>}
          {tasks.length > 0 ? 
          <Task tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Task> : 'No Tasks'}
          </>
        )}></Route>    
        
        <Route path="about" element={<About />}> </Route>  
      </Routes>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;