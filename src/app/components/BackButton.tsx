import { useRouter } from "next/navigation";

const BackButton = () => {

    const router = useRouter();

    return(
        <>
            <button onClick={() => router.back()}>
                back
            </button>
        </>
    )
}

export default BackButton;