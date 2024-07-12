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

    return (
        <div className={"h-screen p-[16px] max-w-[1280px] bg-[transparent] mx-auto"}>
            <BackButton/>
            <div className={"flex justify-around"}>
                {
                    content ?
                    <div className={"card-poke blue-poke text-white mx-auto flex flex-colum gap-[6px]"}>
                        <span className={"heading"}>{content.data.name.toUpperCase()}</span>
                        {content.data.types.length > 0 ?
                            <>
                                <div className="flex flex-wrap gap-1">
                                    {
                                        content.data.types.map((type:any, idx:number) => {
                                            return(
                                                <span className={"px-[10px] py-[6px] text-black rounded-[30px] bg-white"} key={idx}>
                                                    {type.type.name}
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        :null}
                        <Image className={"mx-auto"} width="100" height="100" src={content.data.sprites.other.dream_world.front_default} alt={content.data.name} />
                        {
                            content.data.stats.length > 0 ?
                            <>
                                <span className={"heading"}>
                                    Stats
                                </span>
                                <div className={"grid grid-cols-2 gap-4 bg-[#c7a008] rounded-[20px]"}>
                                    {
                                        content.data.stats.map((stat:any, idx:number) => {
                                            return (
                                                <li key={idx} className={"p-0 m-0"}>
                                                    {stat.stat.name} : {stat.base_stat}
                                                </li>
                                            )
                                        })
                                    }
                                </div>
                            </>
                            :null
                        }
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
                                <span className={"heading"}>
                                    Moves
                                </span>
                                <div className={"max-h-[124px] bg-[#ffcb05] rounded-[20px] p-[6px] pr-[12px]"}>
                                    <div className={"grid grid-cols-2 gap-4 max-h-[100px] overflow-auto bg-[#ffcb05] rounded-[20px]"}>
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

export default Detail;