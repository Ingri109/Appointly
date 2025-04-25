import Image from "next/image";
import Star from "@/icons/Star.svg";

const Stars = () => {
    return (
        <div className={"flex flex-row justify-start items-center space-x-0.5"}>
            <Image className={'w-3 h-3 drop-shadow-lg'} src={Star} alt={"star"}></Image>
            <Image className={'w-3 h-3 drop-shadow-lg'}  src={Star} alt={"star"}></Image>
            <Image className={'w-3 h-3 drop-shadow-lg'}  src={Star} alt={"star"}></Image>
            <Image className={'w-3 h-3 drop-shadow-lg'}  src={Star} alt={"star"}></Image>
            <Image className={'w-3 h-3 drop-shadow-lg'}  src={Star} alt={"star"}></Image>
        </div>
    )
}

export default Stars;