'use client'
import { toast } from 'react-toastify';
import Axios from '../../axios/axios';
import React, { useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ResponseContext, responseContextType } from '../context/ResponseContext';


const DashboardButton = () => {
    const router = useRouter();
    const {responseResult, setResponseResult} = useContext(ResponseContext) as responseContextType;

    const getData = async(data:string) => {
        if(data == 'pokemon'){
            router.push(`/result?category=pokemon`)
            return;
        }

        try{
            let res = await Axios.get(`${data}`);
            //console.log(res);
            setResponseResult(res);
            router.push(`/result?category=${data}`);
        }
        catch(err:any){
            toast.error(err.message , {theme: "colored"})
        }
    }

    useEffect(() => {
        //getAllPokemon();
    },[]);

    return(
        <div className={"my-[16px]"}>
            <div className="grid grid-cols-12 grid-rows-3 gap-4">
                <div className={"card-poke w-full blue-poke text-white lg:col-span-7 col-span-12 dashboard-btn bg-[#f5f5f5]"} onClick={() => getData('pokemon')}>
                    Pokémon
                </div>
                <div className={"card-poke w-full blue-poke text-white lg:col-span-5 col-span-12 dashboard-btn bg-[#f5f5f5]"} onClick={() => getData('ability')}>
                    Abilities
                </div>
                <div className={"card-poke w-full blue-poke text-white lg:col-span-4 col-span-12 dashboard-btn bg-[#f5f5f5]"} onClick={() => getData('pokemon-species')}>
                    Species
                </div>
                <div className={"card-poke w-full blue-poke text-white lg:col-span-8 col-span-12 dashboard-btn bg-[#f5f5f5]"} onClick={() => getData('type')}>
                    Types
                </div>
                <div className={"card-poke w-full blue-poke text-white lg:col-span-9 col-span-12 dashboard-btn bg-[#f5f5f5]"} onClick={() => getData('pokemon-color')}>
                    Colors
                </div>
                <div className={"card-poke w-full blue-poke text-white lg:col-span-3 col-span-12 dashboard-btn bg-[#f5f5f5]"} onClick={() => getData('nature')}>
                    Natures
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default DashboardButton;