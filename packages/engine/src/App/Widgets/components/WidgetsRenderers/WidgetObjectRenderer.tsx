import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import useEditorHelper from "@engine/App/Editor/_actions/hooks/useEditorHelper";
import useGameWidgets from "@engine/App/Game/_actions/hooks/useGameWidgets";
import useGameWidgetsUtilities from "@engine/App/Game/_actions/hooks/useGameWidgetsUtilities";
import useGetMeshByGameWidget from "@engine/App/Game/_actions/hooks/useGetMeshByGameWidget";
import buildGameWidgetName from "@engine/App/Game/_actions/utilities/buildGameWidgetName";
import resolveHelper from "@engine/App/Game/_actions/utilities/resolveHelper";
import { ErrorBoundary, FallbackProps } from "@granity/helpers";
import { Object3D } from "@granity/three";
import { Html } from "@granity/three/drei";
import {
    Button,
    ButtonProps,
    Paper,
    PaperProps,
    pxToRem,
    Typography,
    TypographyProps,
} from "@granity/ui";
import { FC, MutableRefObject, ReactNode, useRef } from "react";

import useWidgets from "../../_actions/hooks/useWidgets";
import WidgetsGizmo from "../WidgetsCommon/WidgetsGizmo";

type Props = {
    widgetId: string;
};

type WidgetObjectRendererStyles = {
    errorWrapper?: PaperProps;
    errorText?: TypographyProps;
    errorResetButton?: ButtonProps;
};

const styles: WidgetObjectRendererStyles = {
    errorText: {
        sx: (theme) => ({
            color: theme.palette.error.main,
        }),
    },
    errorWrapper: {
        sx: (theme) => ({
            width: pxToRem(200),
            padding: 1,
            backgroundColor: theme.palette.background.paperDarker,
        }),
    },
    errorResetButton: {
        sx: {
            mt: 1,
        },
    },
};

const WidgetObjectRenderer: FC<Props> = ({ widgetId }) => {
    const componentRef = useRef(null!);
    const { gameWidgets, gameWidgetsInfo, getGameWidgetInfoFromWidget, getGameWidgetById } =
        useGameWidgets();
    const { displayWidgetName, selectWidget } = useWidgets();
    const { getGameWidgetProps } = useGameWidgetsUtilities();
    const getMeshByGameWidget = useGetMeshByGameWidget();
    const { isEditor } = useEditor();
    const widget = getGameWidgetById(widgetId)!;
    const { component, id, editorOptions, hasRef } = widget;
    const name = buildGameWidgetName(widget);
    const Component = component;

    const helper =
        typeof editorOptions?.helper === "function"
            ? editorOptions?.helper(gameWidgetsInfo[id].options)
            : editorOptions?.helper;

    const resolvedHelper = resolveHelper(helper);

    useEditorHelper(resolvedHelper && (componentRef as MutableRefObject<Object3D>), resolvedHelper);

    if (gameWidgetsInfo[id]?.isVisible !== undefined) {
        const mesh = getMeshByGameWidget(gameWidgets[id]);
        const { isVisible } = gameWidgetsInfo[id];

        if (mesh) {
            mesh.visible = Boolean(isVisible); // Casting to boolean because we are sure it's not undefined
        }
    }

    const widgetProps = getGameWidgetProps(id);

    const gizmo = editorOptions?.gizmo;

    const resolveGizmoText = () => {
        if (typeof gizmo === "undefined" || typeof gizmo === "boolean") {
            return displayWidgetName(id) || widget.name;
        }

        return gizmo.text;
    };

    const widgetProperties = getGameWidgetInfoFromWidget(id!)?.properties; // TODO - continue here. Rename the function to something more meaningful and extract it to the useGameWidgets

    const onGizmoClick = () => {
        const gizmoWidget = getGameWidgetById(id);

        if (!gizmoWidget) {
            return console.error("No game widget found");
        }

        selectWidget([gizmoWidget]);
    };

    const ref =
        hasRef || editorOptions?.helper
            ? {
                  ref: componentRef,
              }
            : {};

    return (
        <mesh name={name} {...widgetProperties}>
            {isEditor && gizmo && <WidgetsGizmo text={resolveGizmoText()} onClick={onGizmoClick} />}

            <ErrorBoundary
                fallbackRender={(fallbackProps) =>
                    widgetFallbackRender(fallbackProps, displayWidgetName(id))
                }
            >
                <Component {...widgetProps} {...widgetProperties} {...ref} />
            </ErrorBoundary>
        </mesh>
    );
};

type WidgetFallbackRender = (fallbackProps: FallbackProps, widgetName?: string) => ReactNode;

const widgetFallbackRender: WidgetFallbackRender = (fallbackProps, widgetName) => {
    return (
        <Html role="alert">
            <Paper {...styles.errorWrapper}>
                <Typography {...styles.errorText}>
                    Something went wrong {widgetName ? `in ${widgetName}` : undefined}
                </Typography>
                <Button
                    variant="text"
                    onClick={fallbackProps.resetErrorBoundary}
                    {...styles.errorResetButton}
                >
                    Reload
                </Button>
            </Paper>
        </Html>
    );
};

export default WidgetObjectRenderer;
