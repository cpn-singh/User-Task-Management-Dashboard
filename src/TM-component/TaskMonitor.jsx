import React from 'react'
import "../css/TaskMonitor.css"

const TaskMonitor = ({calbackCount,renderCount, memoCount}) => {
  return (
    <div className='tsk_mon-container'>
        <h2>Performance Monitor</h2>
        
        <h3>
            Page Renders 
            <span>{renderCount}</span>
        </h3>
        
        <h3>
            useCallback saves 
            <span className='text-green-400!'>renders prevented :{calbackCount}</span>
        </h3>
        
        <h3>
            useMemo recals 
            <span>{memoCount}</span>
        </h3>
        
        <h3>
            showing 
            <span>5 tasks</span>
        </h3>
    </div>
  )
}

export default React.memo(TaskMonitor)