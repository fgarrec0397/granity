import { MutableRefObject, useEffect, useRef } from "react";

export default <T>(
    value: T,
    callback?: (ref: MutableRefObject<T | undefined>) => T | undefined
) => {
    const ref = useRef<T>();

    useEffect(() => {
        if (!callback) {
            ref.current = value;
        } else {
            ref.current = callback(ref);
        }
    }, [callback, value]);

    return ref.current;
};
