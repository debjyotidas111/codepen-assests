import React,{useEffect,useState} from 'react'
import {BsSearch} from 'react-icons/bs';
import { fetchData } from '../service';


function RecipeLists(props) {

    const [searchedterm, setsearchedTerm] = useState('');
   const [query, setQuery] = useState('');
   const [data, setData] = useState('');


   useEffect(() => {
     fetchData(query).then((response) => {
        setData(response)
       props.setLoader(false)
       console.log(response);
     })
   },[])


    const searchRecipe = (searchedterm) => {
        fetchData(searchedterm).then((response) => {
           setData(response)
           props.setLoader(false)
        })
}
 
  return (
    <div className='container'>
        <div className='heading-line'>
            <strong>Search Recipes</strong>
            <div className='input-wrapper' >
                <input
                onChange={(e) => setsearchedTerm(e.target.value)} 
                value={searchedterm}
                 type="search" placeholder='Search Your Recipe'/>
                 <button onClick={() => {searchRecipe(searchedterm); props.setLoader(true)}} ><BsSearch /></button>   
                 {/* onClick={searchRecipe(query)} */}
            </div> 
        </div>
        <div className='flexbox'>

          {
            data && data.hits.map((item, index) => (

                <div  className='flexItem'>
                <div id={index} className='img-wrapper'>
                    <img src={item.recipe.image} alt={item.recipe.label} />
                </div>
                <p>{item.recipe.label} </p>
            </div>
      
            ))
          }

          
        </div>
    </div>
  )
}

export default RecipeLists