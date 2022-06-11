import { useEffect, useState } from "react";

export default () => {
    const [seconds, setSeconds] = useState(0);
    const [isStart, setIsStart] = useState(false);
    const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval>>();

    useEffect(() => {
        if (isStart) {
            setIntervalId(
                setInterval(() => {
                    setSeconds((prevSec) => prevSec + 1);
                }, 1000)
            );
        }

        if (!isStart && intervalId) {
            clearInterval(intervalId);
            setSeconds(0);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId, isStart]);

    const startTimer = () => {
        setIsStart(true);
    };

    const stopTimer = () => {
        setIsStart(false);
    };

    return {
        seconds,
        startTimer,
        stopTimer,
    };
};
