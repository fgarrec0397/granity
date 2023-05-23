import { WidgetInfoDictionaryItem } from "../widgetsTypes";

export type UpdateWidgetParameter<TValue = string> = Partial<Omit<WidgetInfoDictionaryItem<TValue>, "id">>;
