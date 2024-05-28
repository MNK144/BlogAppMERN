import { Router } from "express";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { BlogIdSchema, BlogListSchema, BlogUpsertSchema } from "./blog.validation.js";
import { deleteBlog, getBlog, listBlogs, upsertBlog } from "./blog.controller.js";

const BlogRouter = Router();

BlogRouter.post(
  `/upsert`,
  validationMiddleware(BlogUpsertSchema),
  upsertBlog
);

BlogRouter.post(
  `/delete`,
  validationMiddleware(BlogIdSchema),
  deleteBlog
);

BlogRouter.post(
  `/get`,
  validationMiddleware(BlogIdSchema),
  getBlog
)

BlogRouter.post(
  `/list`,
  validationMiddleware(BlogListSchema),
  listBlogs
);


export default BlogRouter;