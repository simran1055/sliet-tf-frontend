import React, { useState } from 'react'
import Base from '../core/Base'
import { Link } from "react-router-dom"
function Signup() {

    const signUpForm = () => {
        return (
            <form>
                <input type="text" placeholder="name" /><br />
                <input type="email" placeholder="email" /><br />
                <input type="password" placeholder="password" /><br />
                <input type="submit" value="Submit" />
            </form>)
    }

    return (
        <Base title="signup page">
            {signUpForm()}
        </Base>
    )
}

export default Signup
