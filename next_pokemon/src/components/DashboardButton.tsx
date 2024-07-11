'use client'
import Axios from '../axios/axios';
import React, { useEffect } from "react";


function DashboardButton () {

    const getAllPokemon = async() => {
        try{
            let res = await Axios.get(`pokemon-form/`);
            console.log(res);
        }
        catch(err){
            
        }
    }

    useEffect(() => {
        getAllPokemon();
    },[]);

    return(
        <div className={"my-[16px]"}>
            <div className="grid grid-cols-12 grid-rows-3 gap-4">
                <div className={"col-span-7 dashboard-btn bg-[#f5f5f5]"}>
                    Pokemon
                </div>
                <div className={"col-span-5 dashboard-btn bg-[#f5f5f5]"}>
                    Abilities
                </div>
                <div className="col-span-4 dashboard-btn bg-[#f5f5f5]">
                    Species
                </div>
                <div className="col-span-8 dashboard-btn bg-[#f5f5f5]">
                    Types
                </div>
                <div className="col-span-9 dashboard-btn bg-[#f5f5f5]">
                    Areas
                </div>
                <div className="col-span-3 dashboard-btn bg-[#f5f5f5]">
                    Natures
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default DashboardButton;