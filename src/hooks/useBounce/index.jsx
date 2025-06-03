import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
    const [input, setInput] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInput(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return input;
};

export default useDebounce;
