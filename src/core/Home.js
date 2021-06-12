import React from 'react'
import { API } from './backend'
import Base from './Base'
function Home() {
    return (
        <Base>
            <h1>Home</h1>
            <p>{API}</p>
        </Base>
    )
}

export default Home
