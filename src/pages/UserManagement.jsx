import Search from "../UM-component/Search"
import UserAdd from "../UM-component/UserAdd"
import UserList from "../UM-component/UserList"
import UserStat from "../UM-component/UserStat"
import { useState, useEffect } from "react"
import "../css/UserManagement.css"

const UserManagement = ({setUsersInParent}) => {
    const savedUser = localStorage.getItem("users")
    const [SharedData, setSharedData] = useState(savedUser ? JSON.parse(savedUser) : [])
    const [search, setSearch] = useState("")

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(SharedData))
        setUsersInParent(SharedData)
    }, [SharedData,setUsersInParent])

    console.log("usermanagement mein aya", SharedData) //debug

    const filteredUser = SharedData.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase());
    })

    return (
        <div className='user-container'>
            <div className="um-heading">
                <h2>User Management</h2>
                <p>Total Users: {SharedData.length}</p>
            </div>
            
            <div className="um-search">
                <Search search={search} setSearch={setSearch} />
            </div>

            <section className="um-section">
                <aside className="add_stat-user">
                    <div className="user-add">
                        <UserAdd setSharedData={setSharedData} />
                    </div>
                    <div className="user-stat">
                        <UserStat SharedData={SharedData} />
                    </div>
                </aside>
                
                <aside className="user-list">
                    <div className="user-list-container">
                        <UserList filteredUser={filteredUser} setSharedData={setSharedData} />
                    </div>
                </aside>
            </section>
        </div>
    )
}

export default UserManagement