import { useMutation } from '@apollo/client';
import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../gqlOperations/mutations';

export default function Login() {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({})
    const [signinUser, {error, loading, data}] = useMutation(LOGIN_USER, {
        onCompleted(data){
            console.log("login",data)
            localStorage.setItem("token", data.signin.token)
            navigate('/') 
        }
    })

    if(loading){return <h3>Loading...</h3>}

    const handleChange = (e)=>{
        setFormData({
         ...formData,
         [e.target.name]:e.target.value
        })
    
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formData)
        signinUser({
            variables:{
                userCred:formData
            }
        })
    }
    return (
        <div className="container my-container">
            <h5>Login!!</h5>
            <form onSubmit={handleSubmit}>
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
                  <Link to="/signup"><p>Dont have an account ?</p></Link> 
                 <button className="btn #673ab7 deep-purple" type="submit">Login</button>
            </form>
        </div>
    )
}
