import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from "../auth/helper"
function Menu({ history }) {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!isAuthenticated() && (
                    <Fragment>
                        <li>
                            <Link to="/signin">Sign In</Link>
                        </li>

                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    </Fragment>)
                }

                {isAuthenticated() && isAuthenticated().user.role === 2 && (
                    <li>
                        <Link to="/superadmin/dashboard">Super Admin Dashboard</Link>
                    </li>

                )}
                {isAuthenticated() && isAuthenticated().user.role === 2 && (
                    <>
                        <li>
                            <Link to="/superadmin/coordinator">Coordinator</Link>
                        </li>
                        <li>
                            <Link to="/superadmin/adddomain">Add Domain</Link>
                        </li>
                    </>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li>
                        <Link to="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li>
                        <Link to="/user/dashboard">User Dashboard</Link>
                    </li>
                )}



                {
                    isAuthenticated() && (
                        <li>
                            <span onClick={() => signout(() => {
                                history.push("/")
                            })}>Sign out</span>
                        </li>
                    )
                }

            </ul>
        </div>
    )
}

export default withRouter(Menu)
