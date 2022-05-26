type EventListenerCallBack = (arg?: any) => void;

const on = (eventType: string, listener: any) => {
    document.addEventListener(eventType, listener);
};

const off = (eventType: string, listener: any) => {
    document.removeEventListener(eventType, listener);
};

const once = (eventType: string, listener: EventListenerCallBack) => {
    const handleEventOnce = (event: string) => {
        listener(event);
        off(eventType, handleEventOnce);
    };

    on(eventType, handleEventOnce);
};

const trigger = (eventType: string, data?: any) => {
    const event = new CustomEvent(eventType, { detail: data });
    document.dispatchEvent(event);
};

export { on, once, off, trigger };
