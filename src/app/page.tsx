import Image from "next/image";
import SearchBar from "./components/SearchBar";
import DashboardButton from "./components/DashboardButton";

export default function Home() {
  return (
    <div className={"flex flex-col justify-center min-h-screen p-[16px] max-w-[1280px] bg-[white] mx-auto blue-poke"}>
      <div className={"text-center text-[#ffcb05]"}>
        <h1 className={"text-[48px] font-[700] m-[0]"}>
          PokéDex
        </h1>
        <small>Dive more into Pokémon world!</small>
      </div>
      <SearchBar/>
      <DashboardButton/>
    </div>
  );
}
