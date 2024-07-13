'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useEffect, useState } from "react";

const NavBar = () => {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [catchedPokemon, setCatchedPokemon] = useState<any>([]);

    const getPokemonInBag = () => {
        //localStorage.removeItem('catchedPokemon');
        //get catched pokemon from localStorage
        let getStore = localStorage.getItem('catchedPokemon');
        if(getStore && getStore.length > 0){
            //parsed the value from localStorage
            getStore = JSON.parse(getStore);
            //set the value into state to be displayed in the modal
            setCatchedPokemon(getStore);
        }
        else{
            //set state to null if no data from localStorage
            setCatchedPokemon([]);
        }
        //open the modal
        onOpen();
    }

    return(
        <div className={"flex justify-between blue-poke rounded-[10px] p-[10px] mb-[12px]"}>
            <button onClick={() => router.back()}>
                <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={"2x"}/>
            </button>
            <button onClick={getPokemonInBag}>
                <FontAwesomeIcon icon={faSuitcaseRolling} color={'white'} size={"2x"}/>
            </button>
            <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className={"initial-blue-poke text-white rounded-[10px]"}>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Poke Bag</ModalHeader>
                    <ModalBody>
                        {
                            catchedPokemon.length > 0 ?
                            <table className="text-white">
                                <thead className="border-b-[1px] border-[white]">
                                    <tr>
                                        <th className={"text-left"}>Name</th>
                                        <th className={"text-left"}>Pokemon</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        catchedPokemon.map((cp:any,idx:number) => {
                                            return(
                                            <tr key={idx} className="border-b-[1px] border-[white]">
                                                <td>{cp.name}</td>
                                                <td>{cp.pokemon}</td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            :
                            <div className={"flex justify-center items-center text-white"}>
                                No pokemon catched yet...
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        {/* <Button color="primary" onPress={onClose}>
                        Action
                        </Button> */}
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default NavBar;