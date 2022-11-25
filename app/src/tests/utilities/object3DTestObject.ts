import getWidgetName from "@app/Widgets/_actions/utilities/getWidgetName";
import * as THREE from "three";

import widgetDictionaryItemTest from "./widgetDictionaryItemTest";

const testObject = new THREE.Object3D();

testObject.name = getWidgetName(widgetDictionaryItemTest);

export default testObject;
