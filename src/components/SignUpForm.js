import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import classes from '../styles/Signup.module.css'
import Alert from './Alert'
import Button from './Button'
import Checkbox from './Checkbox'
import Form from './Form'
import TextInput from './TextInput'

export default function SignUpForm() {
    // console.log(process.env.REACT_APP_API_KEY);

    const navigates = useNavigate();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [agree, setAgree] = useState(false)
    const [error, setError] = useState("")
    const [errorType, setErrorType] = useState("")
    const [show, setShow] = useState(false)


    const authContext = useAuth();

    const { Signup, loading } = authContext;

    async function onFormSubmit(e) {

        e.preventDefault();
        // console.log(username, email, password, confirmPassword, agree);
        if (password !== confirmPassword || agree === false) {
            setShow(true)
            setErrorType("warning")
            setError("Failed to sign up!");
            return 0;
            // setErrorType("warning")
            // alert("Please Enter Correct password!")
        }
        // if (password !== confirmPassword) {
        //     return setError("Passwords don't match!");
        //   }
        try {
            if (password === confirmPassword || agree === true) {
                console.log("condition true");

                await Signup(email, password, username)
                navigates('/')
            }


        } catch (error) {
            console.log(error);
            setError(error);
            setErrorType("warning");
        }
        setShow(true)

    }

    return (
        <>

            {loading ? <p>Loading...</p> : (
                <Form className={`${classes.signup}`} onSubmit={onFormSubmit}>
                    {show && <Alert alert={error} type={errorType} />}
                    <TextInput
                        type="text"
                        placeholder="Enter name"
                        icon="person"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextInput
                        type="text"
                        placeholder="Enter email"
                        icon="alternate_email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextInput
                        type="password"
                        placeholder="Enter password"
                        required
                        icon="lock"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <TextInput
                        type="password"
                        placeholder="Confirm password"
                        required
                        icon="lock_clock"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Checkbox
                        text="I agree to the Terms &amp; Conditions"
                        required
                        value={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />

                    <Button type="submit">
                        <span>Submit Now</span>
                    </Button>



                    <div className="info">
                        Already have an account? <Link to="/signin">Login</Link> instead.
                    </div>
                </Form>
            )
            }

        </>
    )
}
