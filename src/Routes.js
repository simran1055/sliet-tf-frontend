import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminRoutes from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/privateRoutes'
import Home from './core/Home'
import Signin from './user/Signin'
import Signout from './user/Signout'
import Signup from './user/Signup'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import Profile from './user/Profile'
import SuperAdminRoutes from './auth/helper/SuperAdminRoutes'
import SuperAdminDashboard from './user/SuperAdminDashboard'
import Coordinator from './superAdmin/Coordinator'


function Routes() {
    return (
        <BrowserRouter>

            <Switch>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <Route path="/signout" exact component={Signout}></Route>
                <SuperAdminRoutes path="/superadmin/dashboard" exact component={SuperAdminDashboard} />
                <SuperAdminRoutes path="/superadmin/coordinator" exact component={Coordinator} />
                <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <PrivateRoute path="/user/dashboard/profile" exact component={Profile} />
                <Route path="/" exact component={Home}></Route>


            </Switch>

        </BrowserRouter>
    )
}

export default Routes
