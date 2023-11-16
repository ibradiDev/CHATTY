import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Logo from "../assets/image2.jpg";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { REGISTER_ROUTE } from '../utils/apiRoutes';

function Register() {



    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidate()) {
            const { username, email, password, } = values;
            const { data } = await axios.post(REGISTER_ROUTE, {
                username,
                email,
                password,
            });
            
            if (data) console.log(data);
        }
    }

    const toastOptions = {
        draggable: true,
        pauseOnHover: true,
        autoClose: 4000,
        theme: 'dark',
        position: 'bottom-left'
    };
    const handleValidate = () => {
        // const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        // const { username, password, confirmPassword } = values
        if (values.password !== values.confirmPassword) {
            toast.error('Les mots de passe doivent être les mêmes.', toastOptions)
            return false;
        } else if (values.username.length < 4) {
            toast.error("Le nom d'utilisateur doit être supérieur ou égal à 4 caractères.", toastOptions)
            return false;
        } else if (values.password.length < 6) {
            toast.error("Le mot de passe doit être supérieur ou égal à 6 caractères.", toastOptions)
            return false;
        }
        return true;
    }



    const handleChange = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <div className='brand'>
                        <img alt='logo' src={Logo} />
                        <h1>Chatty</h1>
                    </div>
                    <input type='text' placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
                    <input type='email' placeholder='Email' name='email' onChange={(e) => handleChange(e)} />
                    <input type='password' placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
                    <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)} />
                    <button type='submit'>Register</button>
                    <span>Already have an account? <Link to='/login'>Login</Link> </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items:center;
    background-color: #131324;

    .brand{
        display:flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height:5rem;
        }
        h1{
            color: white;
            text-transform: uppercase;
        }
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }

        button{
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 0.4rem;
            font-weight: bold;
            cursor: pointer;
            text-transform: uppercase;
            font-size: 1rem;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color: #4e0eff;
            }
        }

        span {
            color: white;
            text-transform: uppercase;
            a{
                text-decoration: none;
                font-weight: bold;
                color: #4e0eff;
            }
        }
    }
`;

export default Register