'use client'
import React,{ ChangeEvent } from "react";
import { toast, ToastContainer } from "react-toastify";

function SearchBar() {


    let timer = null;
    const searchPokemon = (e:ChangeEvent) => {
       if(timer){
            clearTimeout(timer);
            timer = null;
       }
        timer = setTimeout(() => {
            toast.info("finish typing", {position: "top-right"})
        },1000)
    }
    
    return ( 
        <div className={'flex flex-col'}>
            <label htmlFor="search_pokemon">Search Pokémon ⤵</label>
            <input className={'text-[24px] rounded-[10px] py-[12px] px-[15px] outline-none bg-[#f5f5f5]'} 
            id="search_pokemon" 
            type='text' 
            placeholder="Gotta Search 'Em All..."
            onChange={(e) => {searchPokemon(e)}}/>
        </div>
    );
    
}

export default SearchBar;