import Navigation from "@/components/Navigation";
import SocialMedia from "@/components/SocialMedia";

const Menu = () => {
    return (
        <aside className={'w-[244px] h-screen sticky top-0 bg-custom2 flex flex-col justify-between items-center py-4'}>
            <h1 className={'text-custom5 text-4xl font-bold'}>Menu</h1>
            <Navigation/>
            <SocialMedia/>
        </aside>
    )
}

export default Menu;