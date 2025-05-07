import Image from "next/image";
import Star from "@/icons/Star.svg";

type StarsProps = {
    stylesStar: string;
};

const Stars = ({stylesStar}: StarsProps) => {
    return (
        <div className={"flex flex-row justify-start items-center space-x-0.5"}>
            <Image className={`${stylesStar} drop-shadow-xl/50`} src={Star} alt={"star"}></Image>
            <Image className={`${stylesStar} drop-shadow-xl/50`}  src={Star} alt={"star"}></Image>
            <Image className={`${stylesStar} drop-shadow-xl/50`}  src={Star} alt={"star"}></Image>
            <Image className={`${stylesStar} drop-shadow-xl/50`}  src={Star} alt={"star"}></Image>
            <Image className={`${stylesStar} drop-shadow-xl/50`}  src={Star} alt={"star"}></Image>
        </div>
    )
}

export default Stars;