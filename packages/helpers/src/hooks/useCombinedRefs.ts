import { ForwardedRef, MutableRefObject, useEffect, useRef } from "react";

export default <RefType>(...refs: (MutableRefObject<RefType | null> | ForwardedRef<RefType>)[]) => {
    const targetRef = useRef<RefType>(null);

    useEffect(() => {
        refs.forEach((ref) => {
            if (!ref) return;

            if (typeof ref === "function") {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
};
