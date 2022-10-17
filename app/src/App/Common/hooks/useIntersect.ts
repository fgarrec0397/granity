import { addAfterEffect, addEffect } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh } from "three";

// TODO - Remove this hook when https://github.com/pmndrs/drei/issues/1057 is merged and closed

function useIntersect(onChange: (visible: boolean) => void) {
    const ref = useRef<Mesh>(null);
    const check = useRef(false);
    const temp = useRef(false);
    useEffect(() => {
        const obj = ref.current;

        if (obj) {
            // Stamp out frustum check pre-emptively
            const unsub1 = addEffect(() => {
                check.current = false;
                return true;
            }); // If the object is inside the frustum three will call onRender

            const oldOnRender = obj.onBeforeRender;

            obj.onBeforeRender = () => (check.current = true); // Compare the check value against the temp value, if it differs set state

            const unsub2 = addAfterEffect(() => {
                if (check.current !== temp.current) onChange((temp.current = check.current));
                return true;
            });
            return () => {
                obj.onBeforeRender = oldOnRender;
                unsub1();
                unsub2();
            };
        }
    }, [onChange]);

    return ref;
}

export { useIntersect };
