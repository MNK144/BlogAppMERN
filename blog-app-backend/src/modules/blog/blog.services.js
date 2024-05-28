import { Types } from "mongoose";
import Blog from "../../models/Blog.js"

/**
 * Retrieves a blog document from the database by its ID.
 *
 * @param {string} id - The ID of the blog document to retrieve.
 * @return {Promise<Object>} A promise that resolves to the retrieved blog document.
 */
export async function getBlogByIdService(id) {
  return await Blog.findById(id);
}

/**
 * Creates or Updates a blog document in the database.
 *
 * @param {Object} blogData - The data to be updated or inserted in the blog document.
 * @param {string} [id=null] - The ID of the blog document to update or insert. If not provided, a new ID will be generated.
 * @return {Promise<Object>} A promise that resolves to the updated or inserted blog document.
 */
export async function upsertBlogByIdService(blogData, id = null) {
  return await Blog.findByIdAndUpdate(
    id ?? new Types.ObjectId(),
    blogData,
    { upsert: true, new: true },
  );
}

/**
 * Deletes a blog document from the database by its ID.
 *
 * @param {string} id - The ID of the blog document to delete.
 * @return {Promise<void>} A promise that resolves when the blog is deleted.
 */
export async function deleteBlogByIdService(id) {
  return await Blog.findByIdAndDelete(id);
}

/**
 * Retrieves a list of blogs based on the provided search criteria.
 *
 * @param {string} search - The search query to filter blogs by title or content.
 * @param {"acs" | "desc"} sort - The sort order of the blogs. Can be either "ASC" or "DESC".
 * @param {"date"} sort_field - The field to sort the blogs by. Can be either "date" or "title".
 * @param {number} limit - The maximum number of blogs to retrieve.
 * @param {number} page - The page number of the blogs to retrieve.
 * @return {Promise<Array<Object>>} A promise that resolves to an array of blog objects.
 */
export async function listBlogsService(search, sort, sort_field, limit, page) {

}