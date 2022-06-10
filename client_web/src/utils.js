import { useEffect, useRef } from "react"

export const hashPwd = (str) => {
    return str.split('').reduce((prevHash, currHash) => (((prevHash << 5) - prevHash) + currHash.charCodeAt(0)) |0, 0)
}

export const CheckUsername = (str, dst) => {
    return str === dst
}

export const useOuterClick = (callback) => {
    const callbackRef = useRef();
    const innerRef = useRef();

    useEffect(() => { callbackRef.current = callback; });
    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
        function handleClick(e) {
            if (innerRef.current && callbackRef.current && 
            !innerRef.current.contains(e.target)
            ) callbackRef.current(e);
        }
    }, []);
    return innerRef;
}