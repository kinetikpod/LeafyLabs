import MLCard from "./MLCard"
import StatCard from "./StatCard"
import AICard from "./AICard"
import { useRef } from "react"

const AppCard = () => {
  const appCardRef = useRef(null)
  return (
    <div id="appcard" ref={appCardRef} className="app-card flex justify-around">
      <StatCard />
      <MLCard />
      <AICard />
    </div>
  )
}

export default AppCard
