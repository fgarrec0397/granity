import getWidgetName from "@engine/App/Widgets/_actions/utilities/getWidgetName";
import { Object3D } from "@granity/three";

import widgetDictionaryItemTest from "../widgets/widgetDictionaryItemTest";

const testObject = new Object3D();

testObject.name = getWidgetName(widgetDictionaryItemTest);

export default testObject;
