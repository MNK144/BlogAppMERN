import { deleteBlogByIdService, getBlogByIdService, getBlogBySlugService, listBlogsService, upsertBlogByIdService } from "./blog.services.js";
import { generalResponse } from "../../helpers/common.helper.js"

export const upsertBlog = async (req, res, next) => {
  try {
    const { 
      id,
      title,
      description,
      category,
    } = req.body;
    
    if(id) {
      let blogData = await getBlogByIdService(id);
      if(!blogData) {
        return generalResponse(res, null, "Blog not found", false, true, 404);
      }
    }
    let blogData = await upsertBlogByIdService({
      title,
      description,
      category,
    },id);

    //Updating Slug
    if(blogData) {
      const slug = `${blogData.title.replace(/\s+/g, '-').toLowerCase()}-${blogData._id}`;
      blogData = await upsertBlogByIdService({ slug }, blogData._id);
    }

    return generalResponse(res, blogData, `Blog ${id?"Updated":"Created"} Successfully`, true, true);
  } catch (error) {
    next(error);
  }
}

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.body;
    let blogData = await getBlogByIdService(id);
    if(!blogData) {
      return generalResponse(res, null, "Blog not found", false, true, 404);
    }
    await deleteBlogByIdService(id);
    return generalResponse(res, null, "Blog Deleted Successfully", true, true);
  } catch (error) {
    next(error);
  }
}

export const getBlog = async (req, res, next) => {
  try {
    const { id } = req.body;
    const blogData = await getBlogByIdService(id);
    if(!blogData) {
      return generalResponse(res, null, "Blog not found", false, true, 404);
    }
    return generalResponse(res, blogData);
  } catch (error) {
    next(error);
  }
}

export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.body;
    const blogData = await getBlogBySlugService(slug);
    if(!blogData) {
      return generalResponse(res, null, "Blog not found", false, true, 404);
    }
    return generalResponse(res, blogData);
  } catch (error) {
    next(error);
  }
}

export const listBlogs = async (req, res, next) => {
  try {
    const { search, sort, sort_field, limit, page } = req.body;
    const blogs = await listBlogsService(search, sort, sort_field, limit, page);
    return generalResponse(res, blogs);
  } catch (error) {
    console.log("error",error);
    next(error);
  }
}