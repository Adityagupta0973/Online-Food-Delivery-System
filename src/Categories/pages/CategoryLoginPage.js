import React, {useContext} from 'react'
import CategoryAuthContext from '../context/CategoryAuthContext'
import CategoryHeader from '../components/CategoryHeader'
import { Navigate } from 'react-router'
import '../../components/LoginForm.css'

const CategoryLoginPage = () => {

    // Get the login user function from AuthContext 
    let {category , loginCategory, formLoading} = useContext(CategoryAuthContext)
    


    // If a normal user is logged in, then tell them to logout with the normal account to access the category login
    if(localStorage.getItem('authTokens') !== null){
        return(  
            <p> You need to logout from your main account to login with the category account ! </p>
        )
    }

    // If a category is already logged in
    if(category){
        return( <Navigate to="/partner-with-us/orders" /> )
    }
    
    return (
        <div>
            <CategoryHeader/>
            <br/><br/><br/><br/>
            <div className='row'>

                <div className='form-column-left'>    
                    <div className='form-background'>
                        
                        <div className='form-header'> Category Login Page </div>
                        <form onSubmit={loginCategory}>
                            <input type="text" name="email" placeholder="Enter Email" required className='form-input'/>
                            <input type="password" name="password" placeholder="Enter Password" required className='form-input' /> <br/>
                            <input type="submit" disabled={formLoading} className='form-submit-btn'/>
                            {formLoading ? <p> Logging you in. Please wait . . </p> : (null)}
                        </form>
                    </div>
                </div>
                <div className='form-column-right'>    
                    <p className='formRight-heading'> From Our Kitchen </p>
                    <p className='formRight-subHeading'> Login with your category account </p>
                    <p className='formRight-subHeading2'> Category administration made easy with From Our Kitchen </p>
                </div>
            </div>

        </div>
    )
}

export default CategoryLoginPage
