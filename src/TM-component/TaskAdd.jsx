import React, { useState } from 'react'
import "../css/TaskAdd.css"

const TaskAdd = ({ usersInParent, AddTask }) => {

    const [taskDetails, setTaskDetails] = useState({
        taskTitle: "",
        taskDescription: "",
        assignToUser: "",
        priority: "",
        dueDate: "",
        checked: false,
        status: "Pending"
    })

    const addTask = (e) => {
        e.preventDefault()
        if (!taskDetails.taskTitle || !taskDetails.assignToUser || !taskDetails.priority || !taskDetails.dueDate) {
            alert("Please fill all the required fields")
            return
        }
        AddTask(taskDetails)
        setTaskDetails({
            taskTitle: "",
            taskDescription: "",
            assignToUser: "",
            priority: "",
            dueDate: "",
            checked: false,
            status: "Pending"
        })
    }

    return (
        <div className='TskAdd-container'>
            <h2>New Task</h2>
        <form className='tsk-form' onSubmit={addTask}>
            <input 
                type="text" 
                placeholder='Task Title*' 
                aria-label="Task Title"
                value={taskDetails.taskTitle} 
                onChange={(e) => setTaskDetails({ ...taskDetails, taskTitle: e.target.value })} 
                required
            />
            
            <textarea 
                placeholder='Description(optional)' 
                aria-label="Task Description"
                value={taskDetails.taskDescription} 
                onChange={(e) => setTaskDetails({ ...taskDetails, taskDescription: e.target.value })}
            />
            
            <select 
                value={taskDetails.assignToUser} 
                onChange={(e) => setTaskDetails({ ...taskDetails, assignToUser: e.target.value })}
                aria-label="Assign to User"
                required
            >
                <option disabled value="">--Assign to User--</option>
                {usersInParent.map((user, index) => (
                    <option key={index} value={user.name}>
                        {user.name}
                    </option>
                ))}
            </select>

            <div className='priority-label' id="priority-label">Priority:</div>
            <div className='tsk-priority' role="group" aria-labelledby="priority-label">
                <button 
                    type="button"
                    onClick={() => setTaskDetails({ ...taskDetails, priority: "Low" })} 
                    className={`prt_btn btn-low ${taskDetails.priority === "Low" ? "prt_active" : ""}`}
                    aria-pressed={taskDetails.priority === "Low"}
                >
                    Low
                </button>

                <button 
                    type="button"
                    onClick={() => setTaskDetails({ ...taskDetails, priority: "Medium" })} 
                    className={`prt_btn btn-medium ${taskDetails.priority === "Medium" ? "prt_active" : ""}`}
                    aria-pressed={taskDetails.priority === "Medium"}
                >
                    Medium
                </button>

                <button 
                    type="button"
                    onClick={() => setTaskDetails({ ...taskDetails, priority: "High" })} 
                    className={`prt_btn btn-high ${taskDetails.priority === "High" ? "prt_active" : ""}`}
                    aria-pressed={taskDetails.priority === "High"}
                >
                    High
                </button>
            </div>

            <input 
                type="date" 
                aria-label="Due Date"
                value={taskDetails.dueDate} 
                onChange={(e) => setTaskDetails({ ...taskDetails, dueDate: e.target.value })} 
                required
            />
            
            <button type="submit" className='add-task-btn'>Add Task</button>
        </form>
        </div>
    )
}

export default React.memo(TaskAdd)