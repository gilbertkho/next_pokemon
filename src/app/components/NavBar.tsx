import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    const router = useRouter();

    const getPokemonInBag = () => {
        //localStorage.removeItem('catchedPokemon');
        let getStore = localStorage.getItem('catchedPokemon');
        if(getStore && getStore.length > 0){
            console.log(JSON.parse(getStore));
        }
        else{
            console.log('NO POKEMON CATCHED!');
        }
    }

    return(
        <div className={"flex justify-between blue-poke rounded-[10px] p-[10px] mb-[12px]"}>
            <button onClick={() => router.back()}>
                <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={"2x"}/>
            </button>
            <button onClick={getPokemonInBag}>
                <FontAwesomeIcon icon={faSuitcaseRolling} color={'white'} size={"2x"}/>
            </button>
        </div>
    )
}

export default NavBar;