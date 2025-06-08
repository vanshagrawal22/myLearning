import React, { useRef, useState } from 'react'
import CustomModal from './CustomModal';
import { useNavigate } from 'react-router-dom';

function NewForm() {
    const[file , setFile] = useState()
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(null);
    const formRef = useRef()
    const navigate = useNavigate()

    // File uploaded
    const handleChange = (e)=>{
        const selectedFile = e.target.files[0]
        // console.log(selectedFile)
        const maxSize = 2 *1024 * 1024; // 2MB
        if(selectedFile && selectedFile.size > maxSize){
            alert("File size should be less than 2MB")
            e.target.value=""
            setFile(null)
            return 
        }
        setFile(selectedFile)
    }
    
    const handleSave = async() => {
        if(!file){
            alert("No file uploaded")
            return ;
        }
        const currData = getCurrFormData()
        try{
            currData.fileData = await readFile(file)
        }catch(e){
            alert("error reading file!")
            return
        }
        currData.name = file.name
        const storage = JSON.parse(localStorage.getItem("data")) || []    
        if(check(storage , currData)){
            alert("Data already exist!")
            return
        }
        storage.push(currData)
        localStorage.setItem("data" , JSON.stringify(storage))
        alert("Data stored in localstorage")
    };
    
    
    // preview
    const handleClick = async() => {
        if(!file){
            alert("No File Selected for the Preview")
            return ;
        }
        const formDataObj = getCurrFormData();
        formDataObj.fileData = await readFile(file);
        formDataObj.fileName = file.name

        setFormData(formDataObj)
        setShowModal(true)
    };
    
    // submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submit
    
        await handleSave(); 
        navigate("/home");
    };
    
    // validation
    const check = (storage , curr)=>{
        return storage.some(item => (item.date === curr.date) && (item.fullName.toLowerCase() === curr.fullName.toLowerCase()));
    }
    const getCurrFormData = ()=>{
        return Object.fromEntries(new FormData(formRef.current).entries())
    }
    // fileread
    const readFile = (file)=>{
        return new Promise((resolve , reject)=>{
            const reader = new FileReader()   // instance to read the file
            reader.onloadend = ()=>{      // when read option is finished
                return resolve(reader.result)
            }
            reader.onerror = reject
            reader.readAsDataURL(file)   // read the file and convert into base64 string for img src
        })
    }
    
  return (
    <>
        <form className="container formWrapper" ref={formRef} onSubmit={handleSubmit}>
        <h2>Enter the Details:</h2>
        <input type="text" placeholder='Enter Your FullName' name='fullName'required/>
        <input type="email" placeholder='Enter Your Email'name='email' required/>
        <input type="tel" placeholder='Enter Your Mobile Number' name='PhoneNumber'required/>
        <input type="date" placeholder='Enter Your Dob' name='date'required/>

        <select name="documentType" defaultValue="" required>
            <option value="" disabled>Select the option</option>
            <option value="aadhar">Aadhar Card</option>
            <option value="pancard">PAN Card</option>
            <option value="marksheet">10th MarkSheet</option>
            <option value="resume">Resume</option>
        </select>
 
        <div>
            <input 
            name='file'
            type="file" accept=".pdf,.jpg, .jpeg , .png"
            onChange={handleChange}
            required/>
            <span>File size should be less than 2MB</span>
        </div>
        
        <label htmlFor="checkbox" >
            <input type="checkbox" name='checkbox' required/>I confirm the above documents are valid 
        </label>

        <div className='buttons'>
            <button type='submit'>Submit</button>
            <button type='button' onClick={handleSave}>Save</button>
            <button type='button' onClick={handleClick}>Preview</button>
        </div>
        
        
    </form>

    {showModal && <CustomModal data={formData} onClose={() => setShowModal(false)} />}
    </>

    
  )
}

export default NewForm