import React, { useState } from 'react'
import Base from '../core/Base'
import { Link } from "react-router-dom"
import { signup } from '../auth/helper';
function Signup() {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })


    const { name, email, password, error, success } = values;

    const handleChange = key => event => {
        setValues({ ...values, error: false, [key]: event.target.value })
    }
    const onSubmit = e => {
        e.preventDefault()
        setValues({ ...values, error: false })


        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({
                    ...values, error: data.error, success: false
                })
            } else {
                setValues({
                    ...values, name: "", email: "", error: "", password: "", success: true
                })
            }
        }).catch(console.log("Error in signup"));
    }

    const signUpForm = () => {
        return (
            <form>
                <input type="text" placeholder="name" onChange={handleChange("name")} value={name} /><br />
                <input type="email" placeholder="email" onChange={handleChange("email")} value={email} /><br />
                <input type="password" placeholder="password" onChange={handleChange("password")} value={password} /><br />
                <input type="submit" value="Submit" onClick={onSubmit} />
            </form>)
    }


    const successMessage = () => {
        return (
            <div className="row">
                <div className="offset-sm-3 col-md-6 text-left">
                    <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        New Account was created successfully!!.Please{" "}
                        <Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
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
    return (
        <Base title="signup page">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    )
}

export default Signup
