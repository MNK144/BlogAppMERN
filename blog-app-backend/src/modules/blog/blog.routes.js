import { Router } from "express";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { BlogIdSchema, BlogListSchema, BlogSlugSchema, BlogUpsertSchema } from "./blog.validation.js";
import { deleteBlog, getBlog, getBlogBySlug, listBlogs, upsertBlog } from "./blog.controller.js";

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
  `/getBySlug`,
  validationMiddleware(BlogSlugSchema),
  getBlogBySlug
)

BlogRouter.post(
  `/list`,
  validationMiddleware(BlogListSchema),
  listBlogs
);


export default BlogRouter;