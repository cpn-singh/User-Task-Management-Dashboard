import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdContacts } from "react-icons/io";
import { MdArrowCircleUp, MdArrowCircleDown } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { TiInputChecked } from "react-icons/ti";
import { ImHourGlass } from "react-icons/im";
import "../css/Dashboard.css"

const LiveClock = () => {
  const [time, settime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      settime(new Date())
    }, 1000)
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='dt_time'>
      {/* {time.toLocaleString()} <br /> */}
      {time.toUTCString()}
    </div>
  )
}

const Dashboard = ({ usersInParent, tasksInParent }) => {
  const [usrmngDash, setUsrMngDash] = useState([])
  const [tskmngDash, setTskMngDash] = useState([])
  
useEffect(() => {
  setTskMngDash(tasksInParent || [])
  setUsrMngDash(usersInParent || [])

}, [tasksInParent, usersInParent])

  useEffect(() => {
    console.log(tasksInParent, "Dashboard")
  }, [tasksInParent])

  const reset = () => {
    setTskMngDash([])
    setUsrMngDash([])
  }

  const navigate = useNavigate();
  const gototaskManagement = () => {
    navigate("/tasks")
  }

  const completedTaskCount = tskmngDash.filter(task => task.checked).length
  const completedTaskPercentage = tskmngDash.length === 0 ? 0 : Math.round((completedTaskCount / tskmngDash.length) * 100)
  const pendingTaskCount = tskmngDash.filter(task => !task.checked).length
  const pendingTaskPercentage = tskmngDash.length === 0 ? 0 : Math.round((pendingTaskCount / tskmngDash.length) * 100)

  const highPriorityTasks = tskmngDash.filter(task => task.priority === 'High').length
  const highPriorityTasksPercentage = tskmngDash.length === 0 ? 0 : Math.round((highPriorityTasks / tskmngDash.length) * 100)

  const mediumPriorityTasks = tskmngDash.filter(task => task.priority === 'Medium').length
  const mediumPriorityTasksPercentage = tskmngDash.length === 0 ? 0 : Math.round((mediumPriorityTasks / tskmngDash.length) * 100)

  const lowPriorityTasks = tskmngDash.filter(task => task.priority === 'Low').length
  const lowPriorityTasksPercentage = tskmngDash.length === 0 ? 0 : Math.round((lowPriorityTasks / tskmngDash.length) * 100)

  return (
    <div className='dsb-container'>
      <h2 className='heading'>Dashboard</h2>
      <div className='dsb-header'>
        <div className='dsb_info'>
          <p>TaskFlow Admin - live Overview</p>
        </div>
        <LiveClock />
      </div>
      <div className='dsb-tasks'>
        <div className='dsb-addtask cursor-pointer' on onClick={gototaskManagement}>+ Add Task</div>
        <div className='dsb-completedtask'>&#10004; Completed Random</div>
        <div className='dsb-reset cursor-pointer' onClick={reset}>&#8635; Reset</div>
        <div className='comment'>&larr; Try these to see derived state update live!</div>
      </div>
      <div className='dsb-tsk_info'>
        <div className='tlt_users'>
          <div className='usr_icon'>
            <IoMdContacts />
            <MdArrowCircleUp />
          </div>
          <p className='usr_count'>{usrmngDash.length}</p>
          <p className='usr_label'>Total Users</p>
          <p className='usr_members'>Active Member:{usrmngDash.length}</p>
        </div>
        <div className='tlt_tasks'>
          <div className='tsk_icon'>
            <BiTask />
            <MdArrowCircleUp />
          </div>
          <p className='tsk_count'>{tskmngDash.length}</p>
          <p className='tsk_label'>Total Tasks</p>
          <p className='tsk_members'>Active Tasks:{tskmngDash.length}</p>
        </div>
        <div className='complt_tasks'>
          <div className='cpl_icon'>
            <TiInputChecked />
            <MdArrowCircleUp />
          </div>
          <p className='cpl_count'>{completedTaskCount}</p>
          <p className='cpl_label'>Completed Tasks</p>
          <p className='cpl_members'>{completedTaskPercentage}% completed</p>
        </div>
        <div className='pending_tasks'>
          <div className='pnd_icon'>
            <ImHourGlass />
            <MdArrowCircleDown />
          </div>
          <p className='pnd_count'>{pendingTaskCount}</p>
          <p className='pnd_label'>Pending Tasks</p>
          <p className='pnd_members'>{pendingTaskPercentage}% pending</p>
        </div>
      </div>
      <section className='ovr_sumry'>
        <aside className='prgrs_ovrview'>
          <h3 className='font-medium text-[25px] text-center'>Task Progress Overview</h3>
          <div className='prgrs_info'>
            <div className='prcntage'>
              <h2>{completedTaskPercentage}</h2>
              <p>Overall Progress</p>
            </div>
            <div className='flex justify-between font-medium mt-3'>
              <p>Completed Tasks</p>
              <p>{completedTaskCount}/{tskmngDash.length} - {completedTaskPercentage}%</p>
            </div>
            <div className='prfres_bar'>
              <div className='green_bar' style={{ width: `${completedTaskPercentage}%` }} ></div>
            </div>

            <div className='flex justify-between font-medium mt-3'>
              <p>Pending Tasks</p>
              <p>{pendingTaskCount}/{tskmngDash.length} - {pendingTaskPercentage}%</p>
            </div>
            <div className='prfres_bar'>
              <div className='orange_bar' style={{ width: `${pendingTaskPercentage}%` }}></div>
            </div>
            <div className='mt-5 border-1 border-gray-500 rounded-xl'></div>
            <h3 className='mt-3 font-medium'>By Priority</h3>

            <div className='flex justify-between font-medium mt-3'>
              <p>High Priority Tasks</p>
              <p>{highPriorityTasks}/{tskmngDash.length} - {highPriorityTasksPercentage}%</p>
            </div>
            <div className='prfres_bar'>
              <div className='red_bar' style={{ width: `${highPriorityTasksPercentage}%` }}></div>
            </div>

            <div className='flex justify-between font-medium mt-3'>
              <p>Medium Priority Tasks</p>
              <p>{mediumPriorityTasks}/{tskmngDash.length} - {mediumPriorityTasksPercentage}%</p>
            </div>
            <div className='prfres_bar'>
              <div className='orange_bar' style={{ width: `${mediumPriorityTasksPercentage}%` }}></div>
            </div>

            <div className='flex justify-between font-medium mt-3'>
              <p>Low Priority Tasks</p>
              <p>{lowPriorityTasks}/{tskmngDash.length} - {lowPriorityTasksPercentage}%</p>
            </div>
            <div className='prfres_bar'>
              <div className='green_bar' style={{ width: `${lowPriorityTasksPercentage}%` }}></div>
            </div>

          </div>
        </aside>
        <aside className='usr_tsk_summary'>
          <h3 className='font-medium text-center text-[25px]'>User Task Summary</h3>
          {usrmngDash.map((user, index) => {
            const userTasks = tskmngDash.filter(t => t.assignToUser === user.name);
            const total = userTasks.length;
            const completed = userTasks.filter(t => t.checked).length;
            const pending = total - completed;
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <div key={index} className='usr_tsk_box '>
                <div  className='usr_task'>
                  <div className='usr_logo'>{user.name.substring(0, 2).toUpperCase()}</div>
                  <div className='usr_info '>
                    <div className='name_task'>
                      <p>{user.name}</p>
                      <p>{total} tasks</p>
                    </div>
                    <div className='name_bar'>
                      <div style={{ backgroundColor: '#3b82f6', height: '0.25rem', borderRadius: '2rem', width: `${percentage}%` }}></div>
                    </div>
                    <div className='usr_task_details'>
                      <div className='usr_tsk_completed'>&#10004;<span>{completed}</span></div>
                      <div className='usr_tsk_pending'><ImHourGlass /><span>{pending}</span></div>
                      <div className='usr_tsk_prcntage font-medium'><span>{percentage}%</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </aside>
      </section>
    </div>
  )
}

export default Dashboard