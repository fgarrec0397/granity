import { WidgetObjectInfo } from "../widgetsTypes";

export type UpdateWidgetParameter<TValue = string> = Partial<Omit<WidgetObjectInfo<TValue>, "id">>;
