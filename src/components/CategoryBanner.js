import React from 'react'
import './Header.css'
import './Footer.css'
import './CategoryBanner.css'

const CategoryBanner = ({categoryInfo}) => {
    return (
         <div className='category-banner'>
            {categoryInfo.map(info => (
                <div key={info.id}>
                    <div className='banner-left'>
                        <img src={`${info.image}`} className='banner-image' alt='category'/>
                    </div>
                    <div className='banner-right'>
                        <p className='banner-heading'> {info.name} </p>
                        <p className='banner-subheading'> {info.address} </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CategoryBanner
