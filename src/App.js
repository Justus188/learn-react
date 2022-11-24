import './App.css';
import {useState, useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer';
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const  [tasks, setTasks] = useState([])

  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  useEffect(() => {
    const getTasks = async() => {
      const tasks = await fetchTasks()
      setTasks(tasks)
    }
    getTasks()
  }, [])
  
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(task)})
    const newTask = await res.json()
    setTasks([...tasks, newTask])
  };
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  const toggleReminder = async (id) => {
    const task = await fetchTask(id)
    const updatedTask = {...task, reminder: !task.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'PUT', headers: {'Content-type': 'application/json'}, body: JSON.stringify(updatedTask)})
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  return (
    <div className="container">
      <Header title = {'Task Tracker'} onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks to Show'}
      <Footer/>
    </div>
  );
}

export default App;
