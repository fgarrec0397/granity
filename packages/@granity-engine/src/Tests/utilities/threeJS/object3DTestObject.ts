import getWidgetName from "@granity-engine/App/Widgets/_actions/utilities/getWidgetName";
import * as THREE from "three";

import widgetDictionaryItemTest from "../widgets/widgetDictionaryItemTest";

const testObject = new THREE.Object3D();

testObject.name = getWidgetName(widgetDictionaryItemTest);

export default testObject;
