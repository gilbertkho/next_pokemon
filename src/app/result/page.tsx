'use client';
import { useEffect } from "react";
import Axios from '../../axios/axios';
import { toast } from 'react-toastify';
import BackButton from "../components/BackButton";

const Result = (pokemon:string) => {
    let {searchParams} = pokemon;

    const showPokemon = async(name) => {
       
    }

    useEffect(() => {
        showPokemon(searchParams.pokemon);
    },[]);

    return(
        <div className={"flex flex-col h-screen p-[16px] max-w-[1280px] bg-[white] mx-auto"}>
            <BackButton/>
        </div>
    )
}

export default Result;