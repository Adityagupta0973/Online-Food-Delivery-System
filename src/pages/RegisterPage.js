import React, {useContext, useState} from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {

    let {user, registerUser, formLoading} = useContext(AuthContext)
    // To store the user's phone number
    let [phoneNo, setPhoneNo] = useState({})

    let [mainForm, setMainForm] = useState(false)
    let [phoneForm, setPhoneForm] = useState(true)
    let [phoneVerificationForm, setPhoneVerificationForm] = useState(false)

    let [loading, setLoading] = useState(false)

    // If a category owner is logged in, then tell them to logout and login with a USER ACCOUNT to access the user's login
    if(localStorage.getItem('categoryAuthTokens') !== null){
        return(  
            <p> You need to logout from your CATEGORY ACCOUNT to login with the USER ACCOUNT ! </p>
        )
    }

    // To not allow login route to a user who is logged in. Redirect to '/'
    if(user){
        return( <Navigate to="/category" /> )
    }

    


    // To submit phone number to recieve a verification code
    let submitPhoneNumber = async (e) => {
        e.preventDefault()
        setLoading(true)
        // To temporarily store the phone number, and pass it for submission along with the main registration form (username, password)
        setPhoneNo(e.target.number.value)

        // Make a POST request to the API with the mobile number.
        let response = await fetch(`http://127.0.0.1:8000/api/mobile-send-message/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'number':e.target.number.value})
        })
        let data = await response.json()
        setLoading(false)

        if(response.status === 200){
            alert(data)
            setPhoneForm(false)
            setPhoneVerificationForm(true)
        }else{
            //console.log(data)
            alert(data)
        }

    }


    // To submit the phone's verification code
    let submitVerificationCode = async (e) => {
        e.preventDefault()
        setLoading(true)
        setPhoneNo(e.target.number.value)

        // Make a POST request to API api with the mobile number.
        let response = await fetch(`http://127.0.0.1:8000/api/mobile-verification/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'number':e.target.number.value, 'code':e.target.code.value})
        })
        let data = await response.json()
        setLoading(false)

        if(response.status === 200){
            alert(data)
            setPhoneVerificationForm(false)
            setMainForm(true)
        }
        // If verification code is invalid, then backend returns a status code of 412
        else if (response.status === 412){
            alert(data)
        }
        else{
            alert(data)
        }

    }
    
    return (
        <div>
            <Header/>
            <RegisterForm
                registerUser={registerUser}
                phoneNo={phoneNo}
                mainForm={mainForm}
                phoneForm={phoneForm}
                loading={loading}
                formLoading={formLoading}
                phoneVerificationForm={phoneVerificationForm}
                submitPhoneNumber={submitPhoneNumber}
                submitVerificationCode={submitVerificationCode}
            />
            <Footer/>
            
            
        </div>
    )
}

export default RegisterPage
