import { Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import CategoryAuthContext from '../context/CategoryAuthContext'

const CategoryPrivateRoute = ({children, ...rest}) => {
    let {category} = useContext(CategoryAuthContext)

    // If a normal user visits (With group=None), then redirect to normal users page
    if(category?.group === 'None'){
        return( < Navigate to="/category" /> )
    }
   
    return(
        // If category is not authenticated, redirect to login, else continue with the request
        <Route {...rest}>{!category ? <Navigate to="/partner-with-us/login" /> :   children}</Route>
    )
}

export default CategoryPrivateRoute;