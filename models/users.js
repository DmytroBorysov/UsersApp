import pkg from "mongoose";
const { Schema, model } = pkg;

const schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  age: Number,
});

export default model("User", schema);
