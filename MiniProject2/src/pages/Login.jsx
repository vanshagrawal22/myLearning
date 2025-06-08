import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const[storage , setStorage] = useState()
    useEffect(()=>{
        const data = localStorage.getItem("data")
        setStorage(JSON.parse(data))
    } , [])

    // handleSubmit
    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const formInput = Object.fromEntries(formData.entries())
        if(storage !== null){
            const findUser = storage.find((item) =>{
                if(item.email === formInput.email && item.password === formInput.password){
                    return item;
                }
            })
            if(findUser){
                navigate("/newForm")
            }else{
                alert("Enter the valid email or password!")
                e.target.reset()
            }
        }
    }
    // handle signup button
    const handleClick = ()=>{
        navigate("/")
    }
  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <h2>LogIn</h2>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' required/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' required/>
            </div>
            <button type='submit'>Submit</button>
            <button type='button' onClick={handleClick}>SignUp</button>
        </form>
    </div>
  )
}

export default Login