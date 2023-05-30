import getGameWidgetName from "@engine/App/Game/_actions/utilities/getGameWidgetName";
import { Object3D } from "@granity/three";

import widgetDictionaryItemTest from "../widgets/widgetDictionaryItemTest";

const testObject = new Object3D();

testObject.name = getGameWidgetName(widgetDictionaryItemTest);

export default testObject;
