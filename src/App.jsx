import { useState } from 'react'
import './App.css'
import UserManagement from './pages/UserManagement'
import Sidebar from './pages/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TaskManagement from './pages/TaskManagement'

function App() {

  const savedUsers = localStorage.getItem("users")
  const savedtask = localStorage.getItem("task")
  const [usersInParent, setUsersInParent] = useState(savedUsers ? JSON.parse(savedUsers) : [])
  const [tasksInParent, setTasksInParent] = useState(savedtask ? JSON.parse(savedtask) : [])
  
  console.log("user in parent", usersInParent)
  console.log("tasks in parent", tasksInParent)

  return (
    <>
      <main className='App-container'>
        <Sidebar />
        <Routes>
          <Route 
            path='/' 
            element={<UserManagement setUsersInParent={setUsersInParent} />} 
          />
          <Route 
            path='/tasks' 
            element={<TaskManagement usersInParent={usersInParent} setTasksInParent={setTasksInParent} />} 
          />
          <Route 
            path='/dashboard' 
            element={<Dashboard usersInParent={usersInParent} tasksInParent={tasksInParent} />} 
          />
        </Routes>
      </main>
    </>
  )
}

export default App