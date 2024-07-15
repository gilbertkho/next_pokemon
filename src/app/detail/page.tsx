'use client';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Axios from '../../axios/axios';
import { toast } from 'react-toastify';
import BackButton from "../components/NavBar";
import { ResponseContext, responseContextType } from "../context/ResponseContext";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Image from "next/image";
import colours from '../components/PokeColors';
import { SubmitHandler, useForm } from "react-hook-form";

interface contentInterface {
    data: any
}

interface selectedPokemon {
    name:string,
    pokemon:string,
}

interface Inputs {
    name: string,
};

function Detail () {
    const router = useRouter();
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    const [selectedPokemon, setSelectedPokemon] = useState<selectedPokemon>();
    const [content, setContent] = useState<contentInterface>();
    const {responseResult, setResponseResult} = useContext(ResponseContext) as responseContextType;
    const {register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => catchPokemon();

    useEffect(() => {
        //if detail page is refresh (state is reloaded) redirect back to dashboard
        if(!responseResult){
            router.push('/');
            return;
        }
        let result:any = responseResult;
        setSelectedPokemon((prevState:any) => {
            return {
                ...prevState,
                name: '',
                pokemon: responseResult.data.name,
            }
        })

        toast.dismiss();
        setContent(result);
    },[]);

    const catchPokemon = () => {
        //get catched pokemon from localStorage
        let getStore:any = localStorage.getItem("catchedPokemon");
        //check if pokebag exist and save the catched pokemon data to localStorage
        if(getStore && getStore.length > 0){
            getStore = JSON.parse(getStore);
            getStore.push({
                name: selectedPokemon.name,
                pokemon: selectedPokemon.pokemon,
            });
            localStorage.setItem('catchedPokemon', JSON.stringify(getStore));
        }
        else{
            let item = {
                name: selectedPokemon.name,
                pokemon: selectedPokemon.pokemon
            }
            let items:Array<object> = [];
            items.push(item);
            localStorage.setItem('catchedPokemon', JSON.stringify(items));
        }
        toast.success('Pokemon Catched !', {theme: "colored"})
        //close the modal
        onClose();
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
                                <Button className={`px-[10px] py-[3px] text-white rounded-[30px]`} onClick={onOpen}>
                                    Catch This Pokémon    
                                </Button>
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
                <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className={"initial-blue-poke text-white rounded-[10px]"}>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Poke Bag</ModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <input placeholder="Enter your pokemon name" {...register("name", { required: true })} className={"text-black"} defaultValue="" value={selectedPokemon.name}  onChange={(e) => {
                                setSelectedPokemon(
                                    (prevState:any) => { 
                                        return{...prevState, 
                                            name: e.target.value,
                                            pokemon: selectedPokemon.pokemon
                                        }
                                    }
                                )
                            }}/>
                            {errors.name && <span>This field is required</span>}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                            Close
                            </Button>
                            <Button color="primary" type="submit">
                            Catch
                            </Button>
                        </ModalFooter>
                    </form>
                    </>
                )}
                </ModalContent>
            </Modal>
            </div>
        </div>
    )
}

export default Detail;