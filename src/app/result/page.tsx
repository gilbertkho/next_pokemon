'use client';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Axios from '../../axios/axios';
import { toast } from 'react-toastify';
import BackButton from "../components/BackButton";
import { ResponseContext, responseContextType } from "../context/ResponseContext";
import Image from "next/image";

interface contentInterface {
    data: any
}

const Result = (pokemon:string) =>{
    const router = useRouter();
    const [content, setContent] = useState<contentInterface>();
    //let {searchParams} = pokemon;

    /*const showPokemon = async(name) => {
       
    }*/

    const {responseResult, setResponseResult} = useContext(ResponseContext) as responseContextType;

    useEffect(() => {
        //showPokemon(searchParams.pokemon);
        console.log(responseResult)
        if(!responseResult){
            router.push('/');
            return;
        }
        let result:any = responseResult;

        toast.dismiss();
        setContent(result);
        console.log('result', responseResult)
    },[]);

    useEffect(() => {
        console.log('CONTENT', content);
    },[content])

    return(
        <div className={"h-screen p-[16px] max-w-[1280px] bg-[transparent] mx-auto"}>
            <BackButton/>
            <div className={"mx-auto"}>
                {
                    content ?
                    <div className={"card-poke blue-poke text-white mx-auto"}>
                        <span className={"heading"}>{content.data.name.toUpperCase()}</span>
                        <Image className={"mx-auto"} width="100" height="100" src={content.data.sprites.other.dream_world.front_default} alt={content.data.name} />
                        {
                            content.data.abilities.length > 0 ?
                            <>
                                <span className={"heading"}>
                                    Abilities
                                </span>
                                <div className={"max-h-[124px] bg-[#c7a008] rounded-[20px] p-[6px]"}>
                                    <div className={"grid grid-cols-2 gap-4 max-h-[100px] overflow-auto bg-[#c7a008] rounded-[20px] p-[6px]"}>
                                        {
                                            content.data.abilities.map((abi:any, idx:number) => {
                                                return (
                                                    <div key={idx}>
                                                        -{abi.ability.name}
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
                        {
                            content.data.moves.length > 0 ?
                            <>
                                <span className={"heading mt-[12px]"}>
                                    Moves
                                </span>
                                <div className={"max-h-[124px] bg-[#c7a008] rounded-[20px] p-[6px]"}>
                                    <div className={"grid grid-cols-2 gap-4 max-h-[100px] overflow-auto bg-[#c7a008] rounded-[20px]"}>
                                    {
                                        content.data.moves.map((abi:any, idx:number) => {
                                            return (
                                                <div key={idx}>
                                                    -{abi.move.name}
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

export default Result;