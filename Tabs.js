import React from 'react'
import {CiPizza} from 'react-icons/ci'
import {useEffect,useState} from 'react'
import {GiFruitBowl , GiNoodles,GiCheckMark} from 'react-icons/gi'
import {MdOutlineIcecream} from 'react-icons/md'
import { fetchTabData } from '../service'

function Tabs(props) {
    const [tabData, setTabData] = useState('')
    const [active, setActive] = useState('Pizza')
    const [tabLabel, setTablLabel] = useState([
    
        {
            name: 'Pizza',
            icon: <CiPizza />,
            id: '0209cb28fc05320434e2916988f47b71'
           },

        {
            name: 'Noodles',
            icon: <GiNoodles />,
            id: 'bbfc1a248bd6fe277e35fe01027de91f'
           },

       {
        name: 'Desert',
        icon: <GiFruitBowl />,
        id: '91dd9bcd2a963c0e95ed3cb929043897'
       },

       {   name: 'Ice cream',
       icon: <MdOutlineIcecream />,
       id: '7c5a5ced83523b4dc49adbc78471cc38'
    },
    ])

    const handleClick = (name, id) => {
       setActive(name)
       fetchTabData(id[0]).then((response) => {
        setTabData(response)
        props.setLoader(false)
       })
    }

   useEffect(() => {
    fetchTabData(tabLabel.id).then((response) => {
        setTabData(response)
        props.setLoader(false)
    })
   }, [])

    return (
        <div className="container">
        <h1 className='recipeHeading'>What would you like to have!</h1>
        <div className="tabs">

         {tabLabel.map((item, index) => {

    return(
        <div onClick={() => {handleClick(item.name , item.id); props.setLoader(true)}} key={index} className={`tablist ${active === item.name ? 'active' : ""}`}>
             {item.icon}
              <span>{item.name}</span>
            </div>
    )
 })}   
        </div>

        <div className='recipe_banner'>

         {tabData !== '' && <>
      
         <div className="left-col">
                    <span className='badge'>{tabData.recipe.cuisineType[0].toUpperCase()}</span>
                    <h1>{tabData.recipe.label}</h1>
                    <p><strong>Recipe by:</strong><small>{tabData.recipe.source}</small></p>
                    <h3>Ingredients</h3>
                    <div className='ingredients'>
                        <ul>

                        {tabData.recipe.ingredientLines.map((list, index) => (

                            <li key={index}><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>{list}</span></li>
                        )  
                        )}
                        
                        </ul>
                    </div>
                </div>
                <div className="right-col">
                    <div className="image-wrapper">
                    <img src={tabData.recipe.image} alt="tabdata.recipe.label" />
                    </div>
                </div>
         </>}

        </div>
    </div>
  )
}

export default Tabs
