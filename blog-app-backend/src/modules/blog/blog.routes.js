import { Router } from "express";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { BlogDeleteSchema, BlogListSchema, BlogUpsertSchema } from "./blog.validation.js";
import { deleteBlog, listBlogs, upsertBlog } from "./blog.controller.js";

const BlogRouter = Router();

BlogRouter.post(
  `/upsert`,
  validationMiddleware(BlogUpsertSchema),
  upsertBlog
);

BlogRouter.post(
  `/delete`,
  validationMiddleware(BlogDeleteSchema),
  deleteBlog
);

BlogRouter.post(
  `/list`,
  validationMiddleware(BlogListSchema),
  listBlogs
);


export default BlogRouter;