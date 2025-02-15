import React, {useContext, useEffect, useState} from 'react'
import CategoryAuthContext from '../context/CategoryAuthContext'
import { useNavigate } from 'react-router-dom'


const StripeReturnUrlPage = () => {

    let {categoryAuthTokens} = useContext(CategoryAuthContext)
    let [returnURLData, setReturnURLData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        // To get the stripe return url
        let getStripeReturnURL = async() =>{
            let response = await fetch(`${process.env.REACT_APP_API_URL}/partner-with-us/create-stripe-account/return-url/`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    // Provide the authToken when making API request to backend to access the protected route of that user
                    'Authorization':'Bearer ' + String(categoryAuthTokens.access),
                }
            })
            
            let data = await response.json()

            if(response.status === 200){
                setReturnURLData(true)
                alert(data)

            } 
            else {
                setReturnURLData(false)
                alert(data)
            }
        }

        getStripeReturnURL()
    }, [categoryAuthTokens])


    let returnToAccountSetup = async () => {
        navigate('/partner-with-us/account-setup')
    }

    return (
        <div>
            {returnURLData === true
            ?   <div className='account-setup-center'>
                    STRIPE ONBOARDING PROCESS COMPLETED <br/>
                    YOUR ACCOUNT IS NOW SETUP <br/>
                    SIT BACK AND RELAX WHILE ANY PURCHASE AUTOMATICALLY COMES TO YOUR ACCOUNT <br/>
                    <button onClick={returnToAccountSetup} className='account-setup-btn2'> Click here to go back to Account Setup </button>
                </div>
            :   <div className='incompleteAccount-setup-center'>
                    STRIPE ONBORADING PROCESS WAS NOT COMPLETED ⚠️ <br/>
                    <div className='accountSetup-warning'>
                        NOTE: If you have already provided all the details, then please wait for 2-5 minutes for stripe to verify and update the status.
                    </div>
                    <button onClick={returnToAccountSetup} className='account-setup-btn2'> Click here to go back to Account Setup </button>
                </div>
            }
        </div>
    )

}

export default StripeReturnUrlPage
