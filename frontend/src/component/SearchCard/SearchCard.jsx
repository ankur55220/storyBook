import React from 'react'
import './search.css'
import { useNavigate } from 'react-router-dom'
import { url } from '../../url'
import { useSelector } from 'react-redux'
function SearchCard({name,image,id}) {
    const logged=useSelector((state)=>state.users)
    const navigate=useNavigate()
  return (
    <div className='searchCard' onClick={()=>navigate(`/user/${id}`,{state:{loggedId:logged.userId.id}})}>
        
        
        <div className="search-img">
            <img src={image} alt="" />
        </div>
        <div className="search-name">
          <p style={{width:"100%",wordWrap:"break-word"}}>
          {name}
          </p>
          
          
          </div>
        
    </div>
  )
}

export default SearchCard