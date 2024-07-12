'use client';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Axios from '../../axios/axios';
import { toast } from 'react-toastify';
import BackButton from "../components/BackButton";
import { ResponseContext, responseContextType } from "../context/ResponseContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

interface contentInterface {
    data: any
}

const Result = (info:any) =>{
    const router = useRouter();
    const [content, setContent] = useState<contentInterface>();
    const [hasMore, setHasMore] = useState(true);
    let {searchParams} = info;

    /*const showPokemon = async(name) => {
       
    }*/

    const {responseResult, setResponseResult} = useContext(ResponseContext) as responseContextType;

    useEffect(() => {
        console.log("SEARHC PARAMS", searchParams)
        if(!responseResult){
            router.push('/');
            return;
        }
        let result:any = responseResult;

        toast.dismiss();
        setContent(result);
    },[]);

    const fetchData = async() => {
        try{
            let params = content &&  content.data.next ? content.data.next.split("?") : null;
            if(params){
                let res = await Axios.get(`${searchParams.result}?${params[1]}`);
                let cont = content ? content.data.results : null;
                cont = cont.concat(res.data.results);
                setContent((prevState) => {
                    return {
                        ...prevState,
                        data: {
                            count: res.data.count,
                            next: res.data.next,
                            previous: res.data.previous,
                            results: cont
                        }
                    }
                });
                res.data.next ? setHasMore(true) : setHasMore(false);
            }
        }
        catch(err:any){
            toast.error(err.message , {theme: "colored"})
        }
    }

    useEffect(() => {
        console.log('CONTENT', content);
    },[content])

    return(
        <div className={"h-screen p-[16px] max-w-[1280px] bg-[transparent] mx-auto"}>
            <BackButton/>
            <div className={"flex justify-around"}>
                {
                    content ?
                    <InfiniteScroll
                        dataLength={content.data.results.length}
                        next={fetchData}
                        hasMore={hasMore}
                        loader
                        >
                        {
                            content ?
                            content.data.results.map((res:any, idx:number) => {
                                return(
                                <div className={"card-poke blue-poke text-white mx-auto"} key={idx}>
                                    {searchParams.result === 'pokemon' && 
                                    <Image
                                    width="100" height="100" 
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.url.split('/')[6]}.png`}
                                    alt={""} />
                                    }
                                    {res.name}
                                </div>
                                )
                            })
                            : null
                        }
                    </InfiniteScroll>
                    : null
                }
            </div>
        </div>
    )
}

export default Result;