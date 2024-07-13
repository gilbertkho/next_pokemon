'use client';
import { Suspense, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Axios from '../../axios/axios';
import { toast } from 'react-toastify';
import BackButton from "../components/NavBar";
import { ResponseContext, responseContextType } from "../context/ResponseContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

interface contentInterface {
    data: any
}

const Result = (category:any) =>{
    const router = useRouter();
    const [content, setContent] = useState<contentInterface>();
    const [hasMore, setHasMore] = useState(true);
    const [firstFetch,setFirstFetch] = useState(true);
    let searchParams = useSearchParams();

    const {responseResult, setResponseResult} = useContext(ResponseContext) as responseContextType;

    const getData = async() => {
        try{
            let res = await Axios.get(`pokemon`);
            setContent(res);
        }
        catch(err:any){
            toast.error(err.message , {theme: "colored"})
        }
    }

    useEffect(() => {
        if(searchParams.get('category') == 'pokemon'){
            getData();
            return;
        }
        if(!responseResult){
            router.push('/');
            return;
        }

        let result:any = responseResult;

        toast.dismiss();
        setContent(result);
    },[]);
    
    useEffect(() => {
        let screenHeight:number = screen.height;
        if(content && firstFetch){
            if(screenHeight >= 500 && content.data.next){
                //fetch more data, to fit the container for the infinity scroll
                fetchData();
                setFirstFetch(false);
            }
        }
    },[content])

    const fetchData = async() => {
        try{
            let params = content && content.data.next ? content.data.next.split("?") : null;
            //console.log("params", params);
            if(params){
                let res = await Axios.get(`${searchParams.get('category')}?${params[1]}`);
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

    const goToPokemon = async(name:any) => {
        try{
            let res = await Axios.get(`pokemon/${name}`);
            setResponseResult(res);
            router.push(`/detail?pokemon=${name}`);
        }
        catch(err:any){
            toast.error(err.message , {theme: "colored"})
        }
    }

    return(
        <Suspense>
            <div className={"h-screen py-[12px] sm-p-[16px] max-w-[1280px] bg-[transparent] mx-auto"}>
                <BackButton/>
                    {
                        content ?
                        <InfiniteScroll
                            dataLength={content.data.results.length}
                            next={fetchData}
                            hasMore={hasMore}
                            loader
                            >
                            <div className={"grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"}>
                            {
                                content ?
                                    content.data.results.map((res:any, idx:number) => {
                                        return(
                                            searchParams.get('category') === 'pokemon' ?
                                                <div className={"card-poke w-full blue-poke text-white flex-row items-center justify-center heading"} key={idx} onClick={() => goToPokemon(res.name)}>
                                                    <Image
                                                    width="100" height="100" 
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.url.split('/')[6]}.png`}
                                                    alt={res.name} />
                                                    {res.name.toUpperCase()}
                                                </div>
                                            :
                                                <div className={"card-poke w-full blue-poke text-white mx-auto heading"} key={idx}>
                                                    {res.name.toUpperCase()}
                                                </div>
                                        )
                                    })
                                : null
                            }
                            </div>
                        </InfiniteScroll>
                        : null
                    }
            </div>
        </Suspense>
    )
}

export default Result;