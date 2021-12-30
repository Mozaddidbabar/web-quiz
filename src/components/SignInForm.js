import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import classes from '../styles/Login.module.css'
import Alert from './Alert'
import Button from './Button'
import Form from './Form'
import TextInput from './TextInput'

export default function SignInForm() {
    const navigates = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [errorType, setErrorType] = useState("")
    const [show, setShow] = useState(false)


    const authContext = useAuth();

    const { Login, loading } = authContext;

    async function onFormSubmit(e) {

        e.preventDefault();
        // console.log(username, email, password, confirmPassword, agree);

        try {

            await Login(email, password)

            navigates('/')
            setShow(true)
            setError("Loading");
            setErrorType("success")


        } catch (error) {
            // console.log(error.message);
            setError("Failed to Login!");
            setErrorType("warning");
            setShow(true)
        }


    }



    return (
        <>
            {
                loading ? <p>Loading ...</p> : (
                    <Form className={`${classes.login}`} onSubmit={onFormSubmit}>
                        {show && <Alert alert={error} type={errorType} />}
                        <TextInput
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon="alternate_email"
                        />

                        <TextInput
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon="lock" />

                        <Button>
                            <span>Submit Now</span>
                        </Button>

                        <div className="info">
                            Don't have an account? <Link to="/signup">Signup</Link> instead.
                        </div>
                    </Form>
                )
            }

        </>
    )
}
