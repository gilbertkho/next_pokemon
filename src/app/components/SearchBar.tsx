'use client'
import React,{ ChangeEvent, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from '../../axios/axios';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ResponseContext, responseContextType } from "../context/ResponseContext";

const SearchBar = () =>{
    const router =  useRouter();
    let timer:any    = null; //typing timer
    const {responseResult, setResponseResult} = useContext(ResponseContext) as responseContextType;

    const searchPokemon = (e:ChangeEvent) => {
        if(timer){
                clearTimeout(timer);
                timer = null;
        }
        timer = setTimeout(async() => {
            //engage function when user finish typing and typing value is not null
            if(e.target.value != ''){
                try{
                    //getting desired pokemon from user input
                    let res = await Axios.get(`pokemon/${e.target.value}`);
                    //set the response in context
                    setResponseResult(res);
                    //moving page to the pokemon detail page
                    router.push(`/detail?pokemon=${e.target.value}`);
                }
                catch(err:any){
                    toast.error(err.message , {theme: "colored"})
                }
            }
        },1000)
    }
    
    return ( 
        <div className={'flex flex-col'}>
            <label htmlFor="search_pokemon">Search Pokémon ⤵</label>
            <input className={'text-[24px] rounded-[30px] py-[12px] px-[15px] outline-none bg-[#f5f5f5]'} 
            id="search_pokemon" 
            type='text' 
            placeholder="Gotta Search 'Em All..."
            onChange={(e) => {searchPokemon(e)}}/>
        </div>
    );
    
}

export default SearchBar;