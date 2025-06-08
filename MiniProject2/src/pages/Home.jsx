import React, { useEffect, useState } from 'react'
import CustomModal from './CustomModal'
import { useNavigate } from 'react-router-dom'

function Home() {
    const[storage , setStorage] = useState([])
    const[showModal , setShowModal] = useState(false)
    const[formData , setFormData] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
            const data = localStorage.getItem("data")
        if(data){
            setStorage(JSON.parse(data))
        }
    },[])

    useEffect(()=>{
        // console.log(storage)
    },[storage])

    const handleClick = (data) => {
      return new Promise((resolve) => {
        const storage = localStorage.getItem("data");
        setFormData(data);
        setShowModal(true);
        resolve(); // resolve the promise after setting modal
      });
    };
    
  return (
    <div>
        <h1>Stored Data</h1>
        {storage.length === 0 ? (
            <p>NO data found</p>
        ): (
            <table border="1" cellPadding="20" cellSpacing="4">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>fullName</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {storage.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td><button onClick={async() => {await handleClick(item)}}>Prev</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        {showModal && <CustomModal data={formData} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default Home