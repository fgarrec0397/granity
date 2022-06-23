type EventListenerCallBack = (arg?: any) => void;

const on = <ListenerType extends EventListenerCallBack>(
    eventType: string,
    listener: ListenerType
) => {
    document.addEventListener(eventType, listener);
};

const off = <ListenerType extends EventListenerCallBack>(
    eventType: string,
    listener: ListenerType
) => {
    document.removeEventListener(eventType, listener);
};

const once = (eventType: string, listener: EventListenerCallBack) => {
    const handleEventOnce = (event: string) => {
        listener(event);
        off(eventType, handleEventOnce);
    };

    on(eventType, handleEventOnce);
};

const trigger = <DataType>(eventType: string, data?: DataType) => {
    const event = new CustomEvent(eventType, { detail: data });
    document.dispatchEvent(event);
};

export { off, on, once, trigger };
