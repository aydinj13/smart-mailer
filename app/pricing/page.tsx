import Navbar from "@/components/Navbar"
import PricingGrids from "@/components/PricingGrids"

function Page() {
  return (
    <div>
        <Navbar />
        <p className="text-4xl mt-9 font-bold text-center">Pricing that works for you</p>
        <PricingGrids />
    </div>
  )
}
export default Page