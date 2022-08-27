import { useEffect, useState } from "react";

import useIsEditing from "./useIsEditing";

export default () => {
    const [hasEdited, setHasEdited] = useState(false);
    const { isEditing } = useIsEditing();

    useEffect(() => {
        if (isEditing && !hasEdited) {
            setHasEdited(true);
        }
    }, [isEditing, hasEdited]);

    return hasEdited;
};
