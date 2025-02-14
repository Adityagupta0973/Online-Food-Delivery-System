import React, {useState, useEffect, useContext} from 'react'
import CategoryAuthContext from '../context/CategoryAuthContext'
import CategoryHeader from '../components/CategoryHeader'
import '../../components/LoginForm.css'
import './EditFoodItem.css'
import './CategoryLoginPage.css'

const EditFoodItem = ({match}) => {
    let [foodItem, setFoodItem] = useState([])
    let [updateFood , updateFoodItem] = useState(null)
    let { editFoodItem, deleteFoodItem, categoryAuthTokens, formLoading} = useContext(CategoryAuthContext)

    let foodId = match.params.id

    useEffect(() => {

        // API Route to update food based on the ID
        let getFood = async () => {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/partner-with-us/manage-food-items/${foodId}`, {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json',
                    // Provide the authToken when making API request to backend to access the protected route of that user
                    'Authorization':'Bearer ' + String(categoryAuthTokens.access)
                }
            })
            let data = await response.json()
            setFoodItem(data)
        }

        getFood()
    }, [foodId, categoryAuthTokens] )

    


    return (
        <div>
            <CategoryHeader/>

            <div className='row'>

                <div className='category-form-column-left'>
                    <div className='category-form-background'>
                        <div className='form-header'> Edit you food item here </div>

                        {foodItem.map( food => (
                            
                            <div key={food.id}>

                                {/* Form to edit the food item details */}
                                <form onSubmit={editFoodItem}>
                                    <input type="hidden" name="id" defaultValue={food.id} />
                                    <input type="text" name="name" defaultValue={food.name} onChange={(e) => {updateFoodItem({...updateFood, 'body': e.target.value})}} className='form-input' />
                                    <input type="text" name="description" defaultValue={food.description} onChange={(e) => {updateFoodItem({...updateFood, 'body': e.target.value})}} className='form-input'/>
                                    <input type="number" min="0" step="0.01" name="price" defaultValue={food.price} onChange={(e) => {updateFoodItem({...updateFood, 'body': e.target.value})}} className='form-input'/> 
                                    <div className='form-file-input-label'> Upload new image only if you want to update the exisiting one: </div>
                                    <input type="file" accept="image/x-png,image/jpeg,image/jpg" name="image" className='form-file-input'/> <br/>
                                    
                                    <input type="submit" disabled={formLoading} value="UPDATE" className='form-submit-btn'/>
                                    {formLoading ? <p> Updating data. Please wait . . </p> : (null)}
                                </form>

                                {/* Button to delete the food item */}
                                <button onClick={deleteFoodItem} disabled={formLoading} name="id" value={food.id} className='edit-food-delete-btn'> 
                                    DELETE ITEM 
                                </button>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <div className='category-form-column-right'>
                    <p className='formRight-heading'> From Our Kitchen </p>
                    <p className='formRight-subHeading'> Edit the food item here </p>
                    <p className='formRight-subHeading2'> Easily update/delete any of your exisiting foods with From Our Kitchen </p>
                </div>
        
            </div>
    
        </div>
    )
}

export default EditFoodItem
