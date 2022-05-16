import express from "express";

const saveRoutes = () => {
    const router = express.Router();

    const getController = () => {
        console.log("Get saved document");
    };

    const postController = () => {
        console.log("Post saved document");
    };

    router.route("/scene").get(getController).post(postController);

    return router;
};

export default saveRoutes;
