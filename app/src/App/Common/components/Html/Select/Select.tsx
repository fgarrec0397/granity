import {
    Select as SelectLib,
    SelectItem,
    SelectLabel,
    SelectPopover,
    useSelectState,
} from "ariakit/select";
import { FC } from "react";

const Select: FC = () => {
    const select = useSelectState({
        defaultValue: "Apple",
        sameWidth: true,
        gutter: 4,
    });
    return (
        <div className="wrapper">
            <SelectLabel state={select}>Favorite fruit</SelectLabel>
            <SelectLib state={select} className="select" />
            <SelectPopover state={select} className="popover">
                <SelectItem className="select-item" value="Apple" />
                <SelectItem className="select-item" value="Banana" />
                <SelectItem className="select-item" value="Grape" disabled />
                <SelectItem className="select-item" value="Orange" />
            </SelectPopover>
        </div>
    );
};

export default Select;
