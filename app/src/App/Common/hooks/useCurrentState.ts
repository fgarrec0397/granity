import { useEffect, useState } from "react";

type CallbackType<A, R> = (...args: A[]) => R;

export default <S>() => {
    const [state, setState] = useState<S>();

    useEffect(() => {});

    const withCurrentState = <ArgsType, ReturnType = void>(
        callback: CallbackType<ArgsType, ReturnType>
    ) => {};

    return { withCurrentState };
};
