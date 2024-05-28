import { deleteBlogByIdService, getBlogByIdService, upsertBlogByIdService } from "./blog.services.js";
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
    const blogData = await upsertBlogByIdService({
      title,
      description,
      category,
    },id);
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

export const listBlogs = async (req, res, next) => {
  try {
    const { search, sort, sort_field, limit, page } = req.body;
    const hotels = await listBlogsService(search, sort, sort_field, limit, page);
    return generalResponse(res, hotels);
  } catch (error) {
    next(error);
  }
}