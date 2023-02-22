import { WidgetObjectInfo } from "../widgetsTypes";

export type UpdateWidgetParameter = Partial<Omit<WidgetObjectInfo, "id">>;
