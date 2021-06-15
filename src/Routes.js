import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminRoutes from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import Home from './core/Home'
import Signin from './user/Signin'
import Signout from './user/Signout'
import Signup from './user/Signup'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'


function Routes() {
    return (
        <BrowserRouter>

            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <Route path="/signout" exact component={Signout}></Route>
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />

            </Switch>

        </BrowserRouter>
    )
}

export default Routes
