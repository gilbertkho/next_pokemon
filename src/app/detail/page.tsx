'use client';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Axios from '../../axios/axios';
import { toast } from 'react-toastify';
import BackButton from "../components/NavBar";
import { ResponseContext, responseContextType } from "../context/ResponseContext";
import Image from "next/image";
import colours from '../components/PokeColors';

interface contentInterface {
    data: any
}

function Detail () {
    const router = useRouter();
    const [content, setContent] = useState<contentInterface>();

    const {responseResult, setResponseResult} = useContext(ResponseContext) as responseContextType;

    useEffect(() => {
        if(!responseResult){
            router.push('/');
            return;
        }
        let result:any = responseResult;

        toast.dismiss();
        setContent(result);
    },[]);

    const catchPokemon = (name:string) => {
        let getStore:any = localStorage.getItem("catchedPokemon");
        if(getStore && getStore.length > 0){
            getStore = JSON.parse(getStore);
            getStore.push({
                pokemon: name
            });
            localStorage.setItem('catchedPokemon', JSON.stringify(getStore));
        }
        else{
            let item = {
                pokemon: name
            }
            let items:Array<object> = [];
            items.push(item);
            localStorage.setItem('catchedPokemon', JSON.stringify(items));
        }
    }

    return (
        <div className={"h-screen py-[12px] sm-p-[16px] max-w-[1280px] bg-[transparent] mx-auto"}>
            <BackButton/>
            <div className={"flex justify-around"}>
                {
                    content ?
                    <div className={"card-poke blue-poke w-full text-white mx-auto flex flex-col gap-[6px]"}>
                        <span className={"big-title"}>{content.data.name.toUpperCase()}</span>
                        {content.data.types.length > 0 ?
                            <>
                                <div className="flex flex-wrap gap-1">
                                    {
                                        content.data.types.map((type:any, idx:number) => {
                                            return(
                                                <span className={`px-[10px] py-[3px] text-white rounded-[30px]`} style={{backgroundColor: colours[type.type.name]}} key={idx}>
                                                    {type.type.name}
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        :null}
                        <div className={"flex flex-wrap flex-col-reverse lg:flex-row items-stretch"}>
                            {
                                content.data.stats.length > 0 ?
                                <div className="w-full lg:w-[50%] flex flex-col">
                                    <span className={"heading"}>
                                        Stats
                                    </span>
                                    <div className={"grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#faf7d8] rounded-[10px] p-[6px] grow"}>
                                        {
                                            content.data.stats.map((stat:any, idx:number) => {
                                                return (
                                                    <span key={idx} className={"p-0 m-0 text-black"}>
                                                        {stat.stat.name} : {stat.base_stat}
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                :null
                            }
                            <div className={"flex flex-col items-center justify-center lg:w-[50%] gap-[8px]"}>
                                <Image className={"lg:max-h-[150px] max-h-[200px]"} width="200" height="200" src={content.data.sprites.other.dream_world.front_default} alt={content.data.name} />
                                <span className={`px-[10px] py-[3px] text-white rounded-[30px]`} onClick={() => catchPokemon(content.data.name)}>
                                    Catch This Pokémon    
                                </span>
                            </div>
                        </div>
                        {
                            content.data.abilities.length > 0 ?
                            <>
                                <span className={"heading"}>
                                    Abilities
                                </span>
                                <div className={"grid grid-cols-2 gap-4  bg-[#faf7d8] rounded-[10px] p-[6px]"}>
                                    {
                                        content.data.abilities.map((abi:any, idx:number) => {
                                            return (
                                                <div className={"grid grid-cols-12 text-black"}  key={idx}>
                                                    <div className="col-span-1">
                                                        -
                                                    </div>
                                                    <div className="col-span-11">
                                                        {abi.ability.name}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                            :
                            null

                        }
                        {
                            content.data.moves.length > 0 ?
                            <>
                                <span className={"heading"}>
                                    Moves
                                </span>
                                <div className={"max-h-[124px] md:max-h-[224px] bg-[#faf7d8] rounded-[10px] p-[6px] pr-[12px]"}>
                                    <div className={"grid grid-cols-2 gap-4 max-h-[100px] md:max-h-[200px] overflow-auto bg-[#faf7d8] rounded-[10px]"}>
                                    {
                                        content.data.moves.map((move:any, idx:number) => {
                                            return (
                                                <div className={"grid grid-cols-12 text-black"}  key={idx}>
                                                    <div className="col-span-1">
                                                        -
                                                    </div>
                                                    <div className="col-span-11">
                                                        {move.move.name}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                                
                            </>
                            :
                            null
                        }
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Detail;