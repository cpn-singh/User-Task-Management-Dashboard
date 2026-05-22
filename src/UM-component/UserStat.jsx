import React from 'react'
import "../css/Umstat.css"

const UserStat = ({SharedData}) => {
  console.log("userstat kaam kr rha h", SharedData)
  return (
    <div className='um-stat'>
      <ul className='stat-list'>
        <li className='stat-item'>
            Total Users <span>{SharedData.length}</span>
        </li>
        <li className='stat-item'>
            Total Developers <span>{SharedData.filter(user=>user.role==="Developer").length}</span>
        </li>
        <li className='stat-item'>
            Total Designers <span>{SharedData.filter(user=>user.role==="Designer").length}</span> 
        </li>
        <li className='stat-item'>
            Total Testers <span>{SharedData.filter(user=>user.role==="Tester").length}</span>
        </li>
        <li className='stat-item'>
            Total Managers <span>{SharedData.filter(user=>user.role==="Manager").length}</span>
        </li>
      </ul>
    </div>
  )
}

export default UserStat