import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import './Footer.css'
import './CategoryList.css'


const CategoryList = ({category}) => {
    
    
    return (
        <Link to={`/category/${category.id}`} key={category.id} className='category-list-column'>
            <div key={category.id} >
                <img src={`${process.env.REACT_APP_API_URL}${category.image}`} alt='Food' height="150px" className='category-image'/>
                <p className='category-heading'> {category.name} </p>
                <p className='category-address'> {category.address} </p>
            </div>
        </Link>

    )
}

export default CategoryList