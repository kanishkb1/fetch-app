import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cards from './Cards';
//Search component for the search bar
//api endpoint used is /dogs/search get request and /dogs post request
const Search = () =>{
const [breed ,setBreed] = useState("");
const [msg,setMsg] = useState()
const [updated,setUpdated] = useState(msg)

useEffect(()=>{
    const fetchBreed = async ()=>{
        try{
                const response = await axios.get(
                'https://frontend-take-home-service.fetch.com/dogs/breeds',
                {withCredentials:true, headers: {'fetch-api-key':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s'}
                })
                setBreed(response.data);
        }
        catch(error){
                console.log(error);
            }
        }
        fetchBreed();
        },[])

    const handleChange =(e)=>
            {
                setMsg(e.target.value)    
            }


    const handleClick=(event)=>
            {
                event.preventDefault()
                setUpdated(msg)    
            }
    
    return (
            <div>
            <form className="search-bar">
            <input type="text"   onChange = {handleChange} value = {msg} placeholder= "Enter the breed name"/>
            <input type ="submit" onClick={handleClick} />
            </form>    
            <div className='cards'>
            <Cards breed={updated}/>
            </div>
            </div>          
        );}

export default Search;