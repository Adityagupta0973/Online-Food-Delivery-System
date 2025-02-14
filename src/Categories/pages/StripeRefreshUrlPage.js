import React, {useContext, useEffect} from 'react'
import CategoryAuthContext from '../context/CategoryAuthContext'

// This page is called when stripe onboarding is not completed
// Refer: https://stripe.com/docs/connect/enable-payment-acceptance-guide?platform=web#web-refresh-url
const StripeRefreshUrlPage = () => {

    let {categoryAuthTokens} = useContext(CategoryAuthContext)

    useEffect(() => {
        
        // To get the stripe refresh url
        let getStripeRefreshURL = async() =>{
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/partner-with-us/create-stripe-account/refresh-url/`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    // Provide the authToken when making API request to backend to access the protected route of that user
                    'Authorization':'Bearer ' + String(categoryAuthTokens.access),
                }
            })
            
            let data = await response.json()

            // Redirect to the link generated from backend
            if(response.status === 200){
                window.location.href = `${data}`

            } 
            else {
                alert('Error getting refresh url of stripe ',data)
                console.log('ERROR: ', data)

            }
        }

        getStripeRefreshURL()
    }, [categoryAuthTokens])
    
    return(
        <div>
            🔎🔎🔎 You are lost 🔎🔎🔎
        </div>
    )
}

export default StripeRefreshUrlPage
