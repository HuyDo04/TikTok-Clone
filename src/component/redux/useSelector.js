import { useEffect, useState } from "react";
import useStore from "./useStore"

function useSelector (selector = (state) => state) {
    const store = useStore()
    const [state, setState]  = useState(selector(store.getState()));
        useEffect(() => {
            store.subscribe(() => {
                const nextState = setState(selector(store.getState()));
                if(state !== nextState) {
                    setState(nextState)
            }
                
            })
        },[store, selector, state])

    return state
}

export default useSelector