import React, { useState } from 'react'
import Base from '../core/Base'
import { Redirect } from "react-router-dom"
import { signin, authenticate, isAuthenticated } from '../auth/helper'
function Signin() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        didRedirect: false,
        error: "",
        loading: false
    })


    const { email, password, loading, didRedirect, error } = values

    const { user } = isAuthenticated();

    const handleChange = key => event => {
        setValues({ ...values, error: false, [key]: event.target.value })
    }


    const performRedirect = () => {
        if (didRedirect) {
            // console.log(user)
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else if (user && user.role === 2) {
                return <Redirect to="/superadmin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }


        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
            loading && (
                <h1>loading</h1>
            )
        );
    };
    const errorMessage = () => {
        return (
            <div className="row">
                <div className="offset-sm-3 col-md-6 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    const onSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, error: false, loading: true });

        signin({ email, password }).then(
            data => {

                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({ ...values, email: "", password: "", error: "", didRedirect: true })
                    })

                }
            }
        ).catch("Some error Ocuured")
    }

    const signinForm = () => {
        return (
            <form>
                <input type="email" placeholder="email" value={email} onChange={handleChange("email")} /><br />
                <input type="password" placeholder="password" value={password} onChange={handleChange("password")} /><br />
                <input type="submit" value="Submit" onClick={onSubmit} />
            </form>)
    }

    return (
        <Base title="signin page">
            {loadingMessage()}
            {errorMessage()}
            {signinForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signin
