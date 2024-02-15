import { useMutation } from '@apollo/client'
import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { SIGNUP_USER } from '../gqlOperations/mutations'
export default function Signup() {
    const [formData,setFormData] = useState({})
    const [signupUser,{data, loading, error}] = useMutation(SIGNUP_USER)

    if(loading) return <h3>Loading...</h3>
    if(data) {console.log(data)}

    const handleChange = (e)=>{
        setFormData({
         ...formData,
         [e.target.name]:e.target.value
        })
    
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formData)
        signupUser({
            variables:{
                userNew: formData
            }
        })
    }
    return (
        <div className="container my-container">
            {
                error && 
                <div className='red card-panel'>{error.message}</div>
            }
            {
                data && data.signup &&
                <div className='green card-panel'>{data.signup.firstName} is Signed up!, you can login now.</div>
            }
            <h5>Signup!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                 type="text"
                 placeholder="First Name"
                 name="firstName"
                 onChange={handleChange}
                 required
                 />
                <input
                 type="text"
                 placeholder="Last Name"
                 name="lastName"
                 onChange={handleChange}
                 required
                 />
                <input
                 type="email"
                 placeholder="email"
                 name="email"
                 onChange={handleChange}
                 required
                 />
                <input
                 type="password"
                 placeholder="password"
                 name="password"
                 onChange={handleChange}
                 required
                 />
                  <Link to="/login"><p>Already have an account ?</p></Link> 
                 <button className="btn #673ab7 deep-purple" type="submit">Submit</button>
            </form>
        </div>
    )
}
