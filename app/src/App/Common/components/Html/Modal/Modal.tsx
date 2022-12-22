import { HasCallableChildren } from "@app/Common/commonTypes";
import { getColor, getCommon, getTypography, pxToRem } from "@themes/utils";
import getModal from "@themes/utils/getModal";
import {
    Dialog,
    DialogDismiss,
    DialogHeading,
    DialogStateProps,
    DisclosureState,
    DisclosureStateProps,
    useDialogDisclosure,
    useDialogState,
} from "ariakit";
import cloneDeep from "lodash/cloneDeep";
import { cloneElement, FC, ReactElement, useMemo } from "react";
import styled from "styled-components";

type ModalSize = "small" | "medium" | "large";

type ModalStylesProps = {
    size?: ModalSize;
};

type ModalProps = DisclosureStateProps &
    HasCallableChildren<DisclosureState> &
    ModalStylesProps & {
        isOpen?: boolean;
        title?: string;
        trigger?: ReactElement;
        options?: DialogStateProps;
    };

const StyledOverlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${pxToRem(30)};
    background-color: ${getColor("common.overlay")};
    backdrop-filter: blur(${getCommon("blur.light")});
`;

const StyledModal = styled(Dialog)<ModalStylesProps>`
    width: 100%;
    max-width: ${({ size }) => getModal(`size.${size}`)};
    margin: 0 auto;
    padding: ${({ size }) => getModal(`spacing.${size}`)};
    background-color: ${getColor("common.background")};
    z-index: ${getCommon("zIndex.modal")};
    border-radius: ${getCommon("borderRadius.modal")};
`;

const StyledTitle = styled(DialogHeading)<ModalStylesProps>`
    margin-bottom: ${pxToRem(50)};
    color: ${getColor("common.text")};
    font-weight: ${getTypography("weight.bold")};
    font-size: ${getTypography("size.largest")};
`;

const Modal: FC<ModalProps> = ({ options, title, trigger, size, children }) => {
    const dialog = useDialogState(options);

    const mergedTriggerProps = useDialogDisclosure({
        ...trigger?.props,
        state: dialog,
    });

    const triggerProps = useMemo(() => {
        const clonedProps = cloneDeep(mergedTriggerProps);
        delete clonedProps.ref;

        return clonedProps;
    }, [mergedTriggerProps]);

    return (
        <>
            {trigger ? cloneElement(trigger, triggerProps) : null}
            <StyledModal state={dialog} backdrop={StyledOverlay} size={size}>
                {title && <StyledTitle>{title}</StyledTitle>}
                {children?.(dialog)}
                <div>
                    <DialogDismiss className="button">OK</DialogDismiss>
                </div>
            </StyledModal>
        </>
    );
};

Modal.defaultProps = {
    size: "medium",
};

export default Modal;
