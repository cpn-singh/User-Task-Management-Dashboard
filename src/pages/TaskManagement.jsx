import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import TaskAdd from '../TM-component/TaskAdd'
import TaskList from '../TM-component/TaskList'
import TaskMonitor from '../TM-component/TaskMonitor'
import '../css/TaskManagement.css'

const TaskManagement = ({ usersInParent, setTasksInParent }) => {
  const savedtask = localStorage.getItem("task")
  const [TaskData, setTaskData] = useState(savedtask ? JSON.parse(savedtask) : [])
  const [sortBy, setSortBy] = useState("Newest_First");

  const renderCount = useRef(0);
  const memoizedCount = useRef(0); //to track usememo calls
  const calbackCount = useRef(0); //to track usecalback calls

  renderCount.current += 1;
  console.log(`TaskManagement Render Count: ${renderCount.current}`);

  const stats = useMemo(() => {
    memoizedCount.current += 1;
    console.log(`useMemo Call Count: ${memoizedCount.current}`)
    const total = TaskData.length
    const completed = TaskData.filter(task => task.checked).length
    const pending = TaskData.filter(task => !task.checked).length
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, completed, pending, progress }
  }, [TaskData])  // dependency array -> only re-run when TaskData changes

  const { total, completed, pending, progress } = stats

  const addTask = useCallback((data) => {
    setTaskData(prevData => [...prevData, data]);
  }, []); // Never re-creates

  const toggleTask = useCallback((taskToToggle) => {
    setTaskData(prevData => prevData.map(task => task === taskToToggle ? { ...task, checked: !task.checked } : task));
  }, []);

  const deleteTask = useCallback((taskToDelete) => {
    setTaskData(prevData => prevData.filter(task => task !== taskToDelete));
  }, []);

  useEffect(() => {
    if (prevAddTask.current !== addTask) {
      calbackCount.current += 1;
      prevAddTask.current = addTask;
      console.log(`callback count:${calbackCount.current}`)
    }
    localStorage.setItem("task", JSON.stringify(TaskData))
    setTasksInParent(TaskData)
  }, [TaskData, addTask])

  const callbackSaves = renderCount.current - calbackCount.current;

  const [isActive, setisActive] = useState("")
  const [TMsearch, setTMsearch] = useState("")


  const prevAddTask = useRef(addTask);

  const displayTask = useMemo(() => {
    memoizedCount.current += 1;
    console.log(`useMemo Call Count: ${memoizedCount.current}`)
    return TaskData.filter(task => {
      const filterScreen =
        isActive === "All" || isActive === "" ? true :
          isActive === "completed" ? task.checked :
            isActive === "pending" ? !task.checked : true;

      const filteredTask =
        task.taskTitle.toLowerCase().includes(TMsearch.toLowerCase()) ||
        task.taskDescription.toLowerCase().includes(TMsearch.toLowerCase()) ||
        task.priority.toLowerCase().includes(TMsearch.toLowerCase()) ||
        task.assignToUser.toLowerCase().includes(TMsearch.toLowerCase());

      return filterScreen && filteredTask;
    }).sort((taskA, taskB) => {
      const dateA = new Date(taskA.dueDate);
      const dateB = new Date(taskB.dueDate);
      return sortBy === "Newest_First" ? dateB - dateA : dateA - dateB;
    });
  }, [TaskData, isActive, TMsearch, sortBy])  // dependency array -> only re-run when TaskData changes


  return (
    <div className='tm-container'>
      <div className='tm-heading'>
        <h2>Task Management - filter & Search</h2>
        <p>{total} task - {progress}% completed</p>
      </div>

      <div className='tm-highlights'>
        <div className='tm-total-card'>
          <p className='text-2xl'>Total</p>
          <p className='text-3xl text-green-700'>{total}</p>
        </div>
        <div className='tm-total-card'>
          <p className='text-2xl'>completed</p>
          <p className='text-3xl text-red-500'>{completed}</p>
        </div>
        <div className='tm-total-card'>
          <p className='text-2xl'>Pending</p>
          <p className='text-3xl text-blue-700'>{pending}</p>
        </div>
        <div className='tm-total-card'>
          <p className='text-2xl'>Progress</p>
          <p className='text-3xl text-purple-500'>{progress}%</p>
          <div className='tm-bar-prg bg-[#3d3939]  rounded-full'>
            <div className={`tm-purple_bar bg-purple-900 p-1 rounded-full `} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className='tm-search_tags'>
        <div className='tm-srch'>
          <input
            value={TMsearch}
            onChange={(e) => setTMsearch(e.target.value)}
            type="text"
            placeholder='Search by title,assignee,description...'
            aria-label="Search tasks by title, assignee, or description"
          />
        </div>
        <div className="tags-group" role="group" aria-label="Filter tasks by status">
          <button
            onClick={() => setisActive("All")}
            className={`tag-base border-none text-white ${isActive === 'All' ? 'bg-blue-500' : "bg-gray-700"}`}
            aria-pressed={isActive === 'All'}
          >
            All({total})
          </button>
          <button
            onClick={() => setisActive("completed")}
            className={`tag-base border-none text-white ${isActive === 'completed' ? 'bg-blue-500' : 'bg-gray-700'}`}
            aria-pressed={isActive === 'completed'}
          >
            Completed({completed})
          </button>
          <button
            onClick={() => setisActive('pending')}
            className={`tag-base border-none text-white ${isActive === 'pending' ? 'bg-blue-500' : 'bg-gray-700'}`}
            aria-pressed={isActive === 'pending'}
          >
            Pending({pending})
          </button>
        </div>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)} 
          className='sorting'
          aria-label="Sort tasks"
        >
          <option value="Newest_First">Newest First</option>
          <option value="Oldest_First">Oldest First</option>
        </select>
      </div>

      <section className='tm-component'>
        <div className='flex-col-gap-5 w-[25%]'>
          <div className='tm-add'>
            <TaskAdd usersInParent={usersInParent} AddTask={addTask} />
          </div>
          <div className='tm-monitor'>
            <TaskMonitor calbackCount={callbackSaves} renderCount={renderCount.current} memoCount={memoizedCount.current} />
          </div>
        </div>
        <div className='tm-list-grid'>
          <TaskList tasklist={displayTask} toggleTask={toggleTask} deleteTask={deleteTask} />
        </div>
      </section>
    </div>
  )
}

export default TaskManagement