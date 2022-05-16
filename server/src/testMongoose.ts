import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/youtube3D");

const schema = new mongoose.Schema({ name: "string", size: "string" });
const Tank = mongoose.model("Tank", schema);

const small = new Tank({ name: "fabrice2", size: "small" });
small.save(function (err: any) {
    if (err) return console.log(err, "err");

    console.log("saved");

    // saved!
});
