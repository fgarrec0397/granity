const on = (
  eventType: string,
  listener: EventListenerOrEventListenerObject
): void => {
  document.addEventListener(eventType, listener);
};

const off = (
  eventType: string,
  listener: EventListenerOrEventListenerObject
): void => {
  document.removeEventListener(eventType, listener);
};

const trigger = (eventType: string, data: any): void => {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
};

export { on, off, trigger };
