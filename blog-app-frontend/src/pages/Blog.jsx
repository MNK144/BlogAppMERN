import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBlogGetBySlug } from "../services/blogService";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addBlogData, getBlog } from "../redux/slices/blogSlice";

const Blog = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const cachedBlog = useSelector(getBlog(param?.slug));

  const { blogGetBySlugApi, isLoading } = useBlogGetBySlug();
  const [blogData, setBlogData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if(cachedBlog) setBlogData(cachedBlog);
    async function getBlog() {
      if (param?.slug) {
        const { data, error } = await blogGetBySlugApi({ slug: param?.slug });
        if (error) {
          setError(error);
        } else {
          console.log("blogData", data);
          setBlogData(data);
          dispatch(addBlogData(data));
        }
      }
    }
    getBlog();
  }, [param?.slug]);
  console.log("param", param);
  return error ? (
    <div className="container mt-5 mb-5">
        <div className="mx-2">
            <header className="mb-4">
              <h1 className="fw-bolder mb-1">{error}</h1>
            </header>
        </div>
    </div>
  ) : (
    <>
      <div className="container mt-5">
        <div className="mx-2">
          <article>
            <header className="mb-4">
              <h1 className="fw-bolder mb-1">{blogData.title}</h1>
              <div className="text-muted fst-italic mb-2">
                Posted on {moment(blogData.createdAt).format('MMMM Do YYYY, h:mm:ss a')} by User
              </div>
              <span className="badge bg-secondary text-decoration-none link-light">
                {blogData.category}
              </span>
            </header>
            <section className="mb-5">
              <p className="fs-5 mb-4">
                {blogData.description}
              </p>
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default Blog;
