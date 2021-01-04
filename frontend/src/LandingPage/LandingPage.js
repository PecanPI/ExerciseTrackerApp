import React from 'react'
import Button from '../shared/components/FormElements/Button'
import Card from '../shared/components/UIElements/Card'


function LandingPage() {
    return (
        <div className='center'>
        <Card>
            <h1>ExerApp</h1>
            <p>This is a MERN based web app</p>
            <p>It is used to log your workouts into MongoDB</p>
            <p>React frontend with NodeJs and express backend </p>
            <Button to={"/users/login"}>Login</Button>
            <Button to={"/users/signup"}>Sign Up</Button>
            </Card>
        </div>
    )
}

export default LandingPage
