import { FaPlus } from "react-icons/fa"
import { useState } from "react"
import "../css/UmAdd.css"

const UserAdd = ({ setSharedData }) => {
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  })

  const HandleSubmit = (e) => {
    e.preventDefault()
    setSharedData((update) => [...update, FormData])
    setFormData({
      name: "",
      email: "",
      role: ""
    })
  }

  return (
    <div className="um-add">
      <h2><FaPlus aria-hidden="true" /> Add New User</h2>
      
      <form className="ud-form" onSubmit={HandleSubmit}>
        <input 
          value={FormData.name} 
          onChange={(e) => setFormData({ ...FormData, name: e.target.value })} 
          placeholder="Please enter your name..." 
          aria-label="Full Name"
          type="text" 
          required
        />
        
        <input 
          value={FormData.email} 
          onChange={(e) => setFormData({ ...FormData, email: e.target.value })} 
          placeholder="Please enter your email..." 
          aria-label="Email Address"
          type="email" 
          required
        />
        
        <select 
          value={FormData.role} 
          onChange={(e) => setFormData({ ...FormData, role: e.target.value })} 
          aria-label="Select User Role"
          required
        >
          <option value="">Select Role</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Tester">Tester</option>
          <option value="Manager">Manager</option>
        </select>
        
        <button type="submit" className="form-btn">
          Add User
        </button>
      </form>
    </div>
  )
}

export default UserAdd