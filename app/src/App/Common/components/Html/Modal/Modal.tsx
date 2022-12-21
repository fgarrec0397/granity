import { HasCallableChildren } from "@app/Common/commonTypes";
import { getColor, getCommon, pxToRem } from "@themes/utils";
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
import { cloneElement, FC, ReactElement } from "react";
import styled from "styled-components";

type ModalProps = DisclosureStateProps &
    HasCallableChildren<DisclosureState> & {
        isOpen?: boolean;
        title?: string;
        trigger?: ReactElement;
        options?: DialogStateProps;
    };

const StyledOverlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${getColor("common.overlay")};
    backdrop-filter: blur(${getCommon("blur.light")});
`;

const StyledModal = styled(Dialog)`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: ${pxToRem(20)};
    background-color: ${getColor("common.background")};
    z-index: ${getCommon("zIndex.modal")};
    border-radius: ${getCommon("borderRadius.modal")};
`;

const Modal: FC<ModalProps> = ({ options, title, trigger, children }) => {
    const dialog = useDialogState(options);

    const triggerProps = useDialogDisclosure({
        state: dialog,
        ...trigger?.props,
    });

    return (
        <>
            {trigger ? cloneElement(trigger, triggerProps) : null}
            <StyledModal state={dialog} backdrop={StyledOverlay} backdropProps={{}}>
                {title && <DialogHeading>{title}</DialogHeading>}
                {children?.(dialog)}
                <div>
                    <DialogDismiss className="button">OK</DialogDismiss>
                </div>
            </StyledModal>
        </>
    );
};

export default Modal;
