import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default (request: NextApiRequest, result: NextApiResponse) => {
    const dirRelativeToPublicFolder = "assets";

    const dir = path.resolve("./public", dirRelativeToPublicFolder);

    const filenames = fs.readdirSync(dir);

    const images = filenames.map((name) => path.join("/", dirRelativeToPublicFolder, name));

    result.statusCode = 200;
    result.json(images);
};
