import { Schema, Types, model } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: Types.String,
      required: true,
    },
    description: {
      type: Types.String,
      required: true,
    },
    category: {
      type: Types.String,
      required: true,
    },
    slug: {
      type: Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Blog", BlogSchema);
