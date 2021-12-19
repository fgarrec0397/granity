import { notification } from "antd";
import { useEffect, useState } from "react";

export default (): boolean => {
  const [isEditor, setIsEditor] = useState<boolean>(true);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.code === "KeyE") {
        setIsEditor((prevIsEditor) => !prevIsEditor);
      }
    };
    document.addEventListener("keyup", handleKeyUp);
  }, []);

  useEffect(() => {
    if (isEditor) {
      document.exitPointerLock();
      notification.open({
        message: "Edit mode",
        description: "You entered in edit mode",
      });
    } else {
      notification.open({
        message: "Normal mode",
        description: "You entered in normal mode",
      });
    }
  }, [isEditor]);

  return isEditor;
};
