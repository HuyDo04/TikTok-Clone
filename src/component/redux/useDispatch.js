import useStore from "./useStore";

function useDispatch () {
    const store = useStore();

    return store.dispatch;
}

export default useDispatch