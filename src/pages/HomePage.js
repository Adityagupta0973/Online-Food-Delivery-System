import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CategoryList from '../components/CategoryList'

import CategoryOffer from '../assets/CategoryOffer.png'
import CategoryOffer1 from '../assets/CategoryOffer1.png'
import CategoryOffer2 from '../assets/CategoryOffer2.png'
import CategoryOffer3 from '../assets/CategoryOffer3.png'
import loadingGIF from '../assets/loading.gif'

const HomePage = () => {
    let [category, setCategory] = useState([])
    let {logoutUser} = useContext(AuthContext)


    useEffect(()=> {
        // To fetch all the Category
        let getCategory = async() =>{
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/category/`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                }
            })
            let data = await response.json()

            if(response.status === 200){
                setCategory(data)
            }else if(response.statusText === 'Unauthorized'){
                logoutUser()
            }
            
        }
        getCategory()
        
    }, [logoutUser])

    return (
        <div>
            <Header/>
            
            {/* OFFERS SECTION */}
            <div className='category-offers-container'> 
                <div className='category-offer-column'> <img src={CategoryOffer} alt='offerImg 1'/> </div>
                <div className='category-offer-column'> <img src={CategoryOffer1} alt='offerImg 2'/> </div>
                <div className='category-offer-column'> <img src={CategoryOffer2} alt='offerImg 3'/> </div>
                <div className='category-offer-column'> <img src={CategoryOffer3} alt='offerImg 4'/> </div>
            </div>
            
            {/* CATEGORY LISTS SECTION */}
            <div className='category-row'>
                {/* To display a loading symbol until the API gets back a response from backend  */}
                {Object.keys(category).length === 0 
                ?   <div>
                        <img src={loadingGIF} style={{width: 50, marginTop:25, marginLeft: 25}} alt='loading' />
                        <p style={{fontSize: '28px'}}> Getting categories for you. Please wait . . .  </p>
                    </div>
                : <div>
                    <p style={{fontSize: '42px'}}>{category.length} categories </p><hr/>
                  </div>
                }

                {category.map(category => (
                    <CategoryList
                        category={category}
                        key={category.id}
                    />
                ))}

            </div>
            <Footer/>
        </div>
    )
}

export default HomePage
