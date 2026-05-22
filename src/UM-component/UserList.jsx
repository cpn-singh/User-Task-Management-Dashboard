import React from 'react'
import "../css/UmList.css"

const UserList = ({ filteredUser, setSharedData }) => {
  
  const DeleteUser = (emailToDelete) => {
    // Better to delete by unique identifier (like email) 
    // than index when dealing with filtered lists
    setSharedData((prev) => prev.filter(user => user.email !== emailToDelete));
  }

  return (
    <div className='um-list'>
      <ul className="list-none p-0 m-0">
        {filteredUser.map((user, index) => (
          <li key={index} className='list-border'>
            <div className='info'>
              <div className='list-logo' aria-hidden="true">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div className='list-details'>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p className='role-badge'>{user.role}</p>
              </div>
            </div>
            <div className='list-btn'>
              <button 
                onClick={() => DeleteUser(user.email)} 
                className='delete-btn'
                aria-label={`Delete user ${user.name}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList