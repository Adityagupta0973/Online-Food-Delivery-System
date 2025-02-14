import React, {useContext} from 'react'
import CategoryAuthContext from '../context/CategoryAuthContext'
import CategoryHeader from '../components/CategoryHeader'
import { Navigate } from 'react-router'
import '../../components/LoginForm.css'
import './CategoryLoginPage.css'

const CategoryRegisterPage = () => {

    let {category, registerCategory, formLoading} = useContext(CategoryAuthContext)

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
            <div className='row'>

                <div className='category-form-column-left'>
                    <div className='category-form-background'>
                        <div className='form-header'> Registration Form </div>
                        <form onSubmit={registerCategory}>
                            <input type="text" name="email" placeholder="Enter Email" required className='form-input'/> 
                            <input type="password" name="password" placeholder="Enter Password" required className='form-input'/>
                            <input type="password" name="confirmPassword" placeholder="Enter Password Again" required className='form-input'/> 
                            <input type="text" name="name" placeholder="Enter Category Name" required className='form-input'/>
                            <input type="text" name="address" placeholder="Enter Category Address" required className='form-input'/>
                            <div className='form-file-input-label'> Upload a category image to be shown on main page </div>
                            <input type="file" accept="image/x-png,image/jpeg,image/jpg" name="image" placeholder="Main page food Image" required className='form-file-input'/> <br/>
                            
                            <input type="submit" disabled={formLoading} className='form-submit-btn'/>
                            {formLoading ? <p> Registering your account. Please wait . . </p> : (null)}
                        </form>
                    </div>
                
                </div>
                <div className='category-form-column-right'>    
                    <p className='formRight-heading'> From Our Kitchen </p>
                    <p className='formRight-subHeading'> Partner with us by filling the form</p>
                    <p className='formRight-subHeading2'> From Our Kitchen offers an easy onboarding process </p>
                </div>
            </div>
        </div>
    )
}

export default CategoryRegisterPage
