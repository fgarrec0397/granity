import buildGameWidgetName from "@engine/App/Game/_actions/utilities/buildGameWidgetName";
import { Object3D } from "@granity/three";

import widgetDictionaryItemTest from "../widgets/widgetDictionaryItemTest";

const testObject = new Object3D();

testObject.name = buildGameWidgetName(widgetDictionaryItemTest);

export default testObject;
