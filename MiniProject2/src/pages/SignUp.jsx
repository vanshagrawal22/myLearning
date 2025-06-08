import { useState } from "react"
import Mymodal from "./Mymodal"
import { useNavigate } from "react-router-dom"

const SignUp = ()=>{
    
    const navigate = useNavigate()
 
    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const formInput = Object.fromEntries(formData.entries())
        const storage = JSON.parse(localStorage.getItem("data")) || []
        const userExist = storage.find((item)=>item.email === formInput.email)
        
        if(((formInput.userName).trim()=== '') || ((formInput.email).trim()=== '') || ((formInput.password).trim()=== '')){
            alert("Please enter the necessary field first!")
            return
        }

        if(userExist){
            const output = confirm("Email already registered!")
            // if output true
            if(output){
                navigate("/login")
            }
            else{
                navigate("/")
            }
            return;
        }

        storage.push(formInput)
        localStorage.setItem("data",JSON.stringify(storage))
        alert("Data Saved!")
        navigate("/newForm")
    }

    // const handlePreview = (e)=>{
    //     e.preventDefault()
    //     const formData = new FormData(e.target.form)
    //     const formInput = Object.fromEntries(formData.entries())
    //     
    //     setPreviewData(formInput)
    //     setShowModal(true)
    // }
    
    // handle signup
    const handleClick = ()=>{
        navigate("/login")
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>SignUp</h2>
                <div>
                <label htmlFor="userName"><span>UserName</span></label>
                <input type="text" name="userName" required />
                </div>
                <div>
                <label htmlFor="email"><span>Email</span></label>
                <input type="email" name="email" required/>
                </div>
                <div>
                <label htmlFor="password"><span>Password</span></label>
                <input type="password" name="password" required/>
                </div>
                {/* <button type="button" onClick={handlePreview}>Preview</button>S */}
                <button type="submit">Submit</button>
                <button type="button" onClick={handleClick}>Login</button>
            </form>
        </div>
    )   
}
export default SignUp