'use client'
import { toast } from 'react-toastify';
import Axios from '../../axios/axios';
import React, { useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ResponseContext } from '../context/ResponseContext';


const DashboardButton = () => {
    const router = useRouter();
    const {responseResult, setResponseResult} = useContext(ResponseContext);

    const getData = async(data:string) => {
        try{
            let res = await Axios.get(`${data}`);
            console.log(res);
            setResponseResult(res);
            router.push(`/result?result=${data}`);
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
                <div className={"col-span-7 dashboard-btn bg-[#f5f5f5]"} onClick={() => getData('pokemon')}>
                    Pokémon
                </div>
                <div className={"col-span-5 dashboard-btn bg-[#f5f5f5]"} onClick={() => getData('ability')}>
                    Abilities
                </div>
                <div className="col-span-4 dashboard-btn bg-[#f5f5f5]" onClick={() => getData('pokemon-species')}>
                    Species
                </div>
                <div className="col-span-8 dashboard-btn bg-[#f5f5f5]" onClick={() => getData('type')}>
                    Types
                </div>
                <div className="col-span-9 dashboard-btn bg-[#f5f5f5]" onClick={() => getData('pokemon-color')}>
                    Colors
                </div>
                <div className="col-span-3 dashboard-btn bg-[#f5f5f5]" onClick={() => getData('nature')}>
                    Natures
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default DashboardButton;