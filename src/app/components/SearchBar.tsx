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
            //router.push(`/result?pokemon=${e.target.value}`);
            //toast.info("finish typing", {position: "top-right"});
            if(e.target.value != ''){
                try{
                    let res = await Axios.get(`pokemon/${e.target.value}`);
                    setResponseResult(res);
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