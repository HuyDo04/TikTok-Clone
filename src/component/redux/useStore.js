import { ReduxContext } from "@/context/ReduxContext"
import { useContext } from "react"

function useStore () {
    const context = useContext(ReduxContext);
    return context.store
}

export default useStore