import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const CategoryAuthContext = createContext()

export default CategoryAuthContext;

export const CategoryAuthProvider = ({children}) => {

    // Get the value of authToken from local storage. If the local storage contains authTokens, then parse the token(get the value back) , else set that to null
    // Callback function sets the value only once on inital load 
    let [categoryAuthTokens, setAuthTokens] = useState(() => localStorage.getItem('categoryAuthTokens') ? JSON.parse(localStorage.getItem('categoryAuthTokens')) : null)
    // If the local storage contains authTokens, then decode the token, else set that to null
    let [category, setCategory] = useState(() => localStorage.getItem('categoryAuthTokens') ? jwtDecode(localStorage.getItem('categoryAuthTokens')): null)
    let [loading, setLoading] = useState(true)
    
    // To check the API state, before an API is called, and after the API has returned a response.
    let [formLoading, setFormLoading] = useState(false)

    const navigate = useNavigate()

    // Login Category method
    let loginCategory = async (e ) => {
        e.preventDefault()
        setFormLoading(true)

        // Make a post request to the api with the Category's credentials.
        let response = await fetch(`${process.env.REACT_APP_API_URL}/partner-with-us/api/token/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            // 'e.target' is the form, '.username' gets the username field and '.password' gets the password field from wherever it is called (CategoryLoginPage.js here)
            body:JSON.stringify({'username':e.target.email.value, 'password':e.target.password.value})
        })
        // Get the access and refresh tokens
        let data = await response.json()
        setFormLoading(false)

        if(response.status === 200){


            // If a simple user tries to login, the return without allocating the authTokens
            if(jwtDecode(data.access)['group'] === 'None'){
                alert('You need to login with a category account')
                return 
            }
            // Update the state with the logged in tokens
            setAuthTokens(data) 
            // Decode the access token and store the information
            setCategory(jwtDecode(data.access))
            // Set the authTokens in the local storage
            localStorage.setItem('categoryAuthTokens', JSON.stringify(data))
            // Redirect category to home page
            navigate('/partner-with-us/orders')
        }else{
            alert('Something went wrong!')
        }
    }
    // Logout Category method
    let logoutCategory = () => {
        // To logout, set 'setAuthTokens' and 'setUser' to null and remove the 'authTokens' from local storage
        setAuthTokens(null)
        setCategory(null)
        localStorage.removeItem('categoryAuthTokens')
        navigate('/partner-with-us')
    }


    // To register a Category
    let registerCategory = async (e) => {
        e.preventDefault()
        setFormLoading(true)

        // Reference: https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
        let form_data = new FormData();
        form_data.append('image', e.target.image.files[0]);
        form_data.append('email', e.target.email.value);
        form_data.append('password', e.target.password.value);
        form_data.append('confirmPassword', e.target.confirmPassword.value);
        form_data.append('name', e.target.name.value);
        form_data.append('address', e.target.address.value);

        let url = `${process.env.REACT_APP_API_URL}/partner-with-us/register/`;
        await axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
          loginCategory(e)
          console.log(response.data)
        })
        .catch(error => alert(error))
        setFormLoading(false)
    }

    // To add a new food item
    let addFoodItem = async (e) => {
        e.preventDefault()
        setFormLoading(true)

        // Reference: https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
        let form_data = new FormData();
        form_data.append('image', e.target.image.files[0]);
        form_data.append('name', e.target.name.value);
        form_data.append('description', e.target.description.value);
        form_data.append('price', e.target.price.value);

        let url = `${process.env.REACT_APP_API_URL}/partner-with-us/add-food-item/`;
        await axios.post(url, form_data, {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization':'Bearer ' + String(categoryAuthTokens.access)
        }
        })
        .then(res => {
          alert(res.data);
          navigate('/partner-with-us/manage-food-items')
        })
        .catch(err => alert(err))
        setFormLoading(false)
    }

    // To edit an exisiting food item
    let editFoodItem = async (e) => {
        e.preventDefault()
        setFormLoading(true)

        // Reference: https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
        let form_data = new FormData();

        form_data.append('image', e.target.image.files[0]);
        form_data.append('name', e.target.name.value);
        form_data.append('description', e.target.description.value);
        form_data.append('price', e.target.price.value);
        
        let url = `${process.env.REACT_APP_API_URL}/partner-with-us/manage-food-items/${e.target.id.value}/update`;
        await axios.post(url, form_data, {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization':'Bearer ' + String(categoryAuthTokens.access)
        }
        })
        .then(res => {
          alert(res.data);
          navigate('/partner-with-us/manage-food-items')
        })
        .catch(err => alert(err))
        setFormLoading(false)
    }

    // To delete a food item
    let deleteFoodItem = async (e) => {
        e.preventDefault()
        setFormLoading(true)

        let response = await fetch(`${process.env.REACT_APP_API_URL}/partner-with-us/manage-food-items/${e.target.value}/delete`, {
            method: 'DELETE',
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization':'Bearer ' + String(categoryAuthTokens.access)
            }
        })
        let data = await response.json()
        setFormLoading(false)
        alert(data)
        navigate('/partner-with-us/manage-food-items')
    }

    // Context data for AuthContext so that it can be used in other pages
    let contextData = {
        category:category,
        categoryAuthTokens:categoryAuthTokens,
        formLoading:formLoading,
        loginCategory:loginCategory,
        logoutCategory:logoutCategory,
        registerCategory:registerCategory,
        addFoodItem:addFoodItem,
        editFoodItem:editFoodItem,
        deleteFoodItem:deleteFoodItem
    }

    // To update the access tokens after every few time interval
    useEffect(()=> {

        // --------------------------- updateToken method  ----------------------------------------
        // To update the access token
        let updateToken = async ()=> {

            // If no authToken exists i.e. category is not logged in then return
            if(!categoryAuthTokens){
                setLoading(false)
                return
            }
            // Make a post request to the api with the refresh token to update the access token
            let response = await fetch(`${process.env.REACT_APP_API_URL}/partner-with-us/api/token/refresh/`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                // Send the refresh token
                body:JSON.stringify({'refresh':categoryAuthTokens?.refresh})
            })
            let data = await response.json()
            
            if (response.status === 200){   
                // Update the data as done similarly in the login category method
                setAuthTokens(data)
                setCategory(jwtDecode(data.access))
                localStorage.setItem('categoryAuthTokens', JSON.stringify(data))
            }else{
                logoutCategory()
            }

            if(loading){
                setLoading(false)
            }
        }
        // --------------------------- updateToken method end  ----------------------------------------
        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(categoryAuthTokens){
                updateToken()
            }
        }, fourMinutes)
        // Clear the interval after firing preventing re-initializing every time, refer to docs for more details
        return ()=> clearInterval(interval)

    }, [categoryAuthTokens, loading])

    return(
        <CategoryAuthContext.Provider value={contextData} >
            {/* Render children components only after AuthContext loading is complete */}
            {loading ? null : children}
        </CategoryAuthContext.Provider>
    )
}