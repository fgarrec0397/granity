/**
 * React-Serialize utility re-written in TypeScript
 * Originally created by @pravdomil (https://github.com/pravdomil/react-serialize)
 */
import { Component, ComponentType, createElement, ReactElement, ReactNode } from "react";

type ObjectType = {
    [index: string]: any;
};

type DeserializableComponent = {
    type: string;
    props: { children: DeserializableComponent[] } & ObjectType;
};

type ReviverOptions = {
    type: string | ComponentType;
    props: { children: DeserializableComponent[] & ObjectType };
    key: string | number;
    components: { [type: string]: ComponentType };
};

type DeserializationOpts = {
    components?: { [type: string]: ComponentType };
    reviver?: (args: ReviverOptions) => ReviverOptions;
};

const deserializeElement = <T extends ReactElement<any>>(
    element: DeserializableComponent[] | DeserializableComponent | string | null,
    options: DeserializationOpts = {},
    key?: string | number
): T | string | null | undefined => {
    let { components = {} } = options;
    const { reviver } = options;

    if (typeof element !== "object") {
        return element;
    }

    if (element === null) {
        return element;
    }

    if (element instanceof Array) {
        return element.map((el, i) => deserializeElement(el, options, i)) as any;
    }

    let { props } = element as DeserializableComponent;
    const elementType = element.type;

    if (typeof elementType !== "string") {
        throw new Error("Deserialization error: element type must be string");
    }

    let type: string | ComponentType = components[elementType] || elementType.toLowerCase();

    if (props.children) {
        props = { ...props, children: deserializeElement(props.children, options) as any };
    }

    if (reviver && key) {
        ({ type, props, key, components } = reviver({ type, props, key, components }));
    }

    createElement(type, { ...props, key });
};

export const serializeComponent = <T extends Component | JSX.Element | ReactNode>(component: T) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const getName = (value: string | Function) => {
        if (typeof value === "string") {
            return value;
        } else if (typeof value === "function") {
            return value.name;
        }
        return value;
    };

    const replacer = (key: string, value: any) => {
        switch (key) {
            case "type":
                return getName(value);
            case "_owner":
            case "_store":
            case "ref":
            case "key":
                return;
            default:
                return value;
        }
    };

    return JSON.stringify(component, replacer);
};

export const deserialize = <T extends ReactElement<any>>(
    serializedComponent: string,
    options?: DeserializationOpts
): T => {
    const componentData = JSON.parse(serializedComponent);

    return deserializeElement(componentData, options) as T;
};
