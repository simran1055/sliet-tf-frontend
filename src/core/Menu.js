import React from 'react'
import { Link, withRouter } from 'react-router-dom'
function Menu() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/signin">Sign In</Link>
                </li>
                <li>
                    <Link to="/signout">Sign Out</Link>
                </li>
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to="/user/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>

            </ul>
        </div>
    )
}

export default withRouter(Menu)
