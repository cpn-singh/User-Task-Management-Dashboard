import React from 'react'
import "../css/Tasklist.css";

const TaskList = ({ tasklist, toggleTask, deleteTask }) => {

    return (
        <>
            {tasklist.map((task, index) => {
                // Determine Priority Class
                const priorityClass = task.priority === "Low" ? "low" :
                    task.priority === "Medium" ? "medium" : "high";

                return (
                    <div key={index} className={`tasklist-container border-l-${priorityClass}`}>
                        <div className='tasklist-checkbox'>
                            <input
                                type="checkbox"
                                aria-label={`Mark task ${task.taskTitle} as ${task.checked ? 'pending' : 'completed'}`}
                                checked={task.checked || false}
                                onChange={() => toggleTask(task)}
                            />
                        </div>

                        <div className="tasklist-card">
                            <div className="tasklist-card-header">
                                <h3>{task.taskTitle}</h3>
                                <p>{task.taskDescription}</p>
                            </div>

                            <div className="tasklist-card-body">
                                <span className={`tm-priority bg-${priorityClass}`}>
                                    {task.priority}
                                </span>
                                <span className='tm-avatar avatar-rv bg-blue-500 rounded-full py-1 px-[5px]' aria-hidden="true">
                                    {task.assignToUser ? task.assignToUser.substring(0, 2).toUpperCase() : ""}
                                </span>
                                <span className='tm-user'>{task.assignToUser}</span>
                                <span className='tm-date overdue'>{task.dueDate}</span>
                                <span className={`tm-status-badge ${task.checked ? "status-done" : "status-pending"}`}>
                                    {task.checked ? "Done" : "Pending"}
                                </span>
                            </div>
                        </div>

                        <div className="tasklist-card-btn">
                            <button
                                className='delete-btn'
                                aria-label={`Delete task ${task.taskTitle}`}
                                onClick={() => deleteTask(task)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default React.memo(TaskList)