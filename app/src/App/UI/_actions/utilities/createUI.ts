import { SetOptionalPropertyFrom } from "@app/Common/commonTypes";
import { WidgetUIModule } from "@app/Widgets/_actions/widgetsTypes";

/**
 * A function helping you creating a widget UI.
 *
 * For now it only returns the widgetUIModule you pass, but in the future it could be more.
 */
export default <Props>(ui: any) => {
    return ui;
};
