import Menu from "@/components/Menu"
import CardForBooking from "@/components/Card-for-Booking";

const Booking = () => {
    const count: number = 16
    return (
        <main className={'flex'}>
            <Menu></Menu>
            <section className={'flex-1 col-start-1 row-start-1 grid grid-cols-3 grid-rows-5 gap-5 px-5 py-3 overflow-auto'}>
                {Array.from({ length: count }).map((_, i) => (
                    <CardForBooking key={i}/>
                ))}
            </section>
        </main>
    )
}
export default Booking;