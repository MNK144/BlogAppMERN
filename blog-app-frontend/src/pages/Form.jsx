import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBlogGetBySlug, useBlogUpsert } from "../services/blogService";

const Form = ({ type }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blogGetBySlugApi, isLoading } = useBlogGetBySlug();
  const { blogUpsertApi, isLoading: upsertLoading } = useBlogUpsert();

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    description: "",
  });
  useEffect(() => {
    console.log("location", location);
    async function getBlogData() {
      const { data, error } = await blogGetBySlugApi({ slug: location.state.slug });
      if (!error) {
        console.log("blogData", data);
        setBlogData({
          id: data._id,
          title: data.title,
          category: data.category,
          description: data.description,
        });
      }
    }
    if (type == "update" && location.state?.slug) {
      getBlogData();
    }
  }, []);

  const handleSubmit = async () => {
    console.log("blogData", blogData);
    const { data } = await blogUpsertApi(blogData);
    navigate(`/blog/${data.slug}`);
  }
  console.log("blogData", blogData);
  return (
    <div className="container mt-5">
      <div className="mx-2 mb-5">
        <h2>{type == "create" ? "Create" : "Update"} Blog</h2>
        <div className="my-4">
          <div className="input-group my-2">
            <input
              className="form-control"
              type="text"
              placeholder="Enter Title"
              onChange={(e) =>
                setBlogData({ ...blogData, title: e.target.value })
              }
              value={blogData.title}
            />
          </div>
          {/* Make this categories field a dropdown */}
          <div className="input-group my-2">
            <select
              className="form-select"
              onChange={(e) =>
                setBlogData({ ...blogData, category: e.target.value })
              }
              value={blogData.category}
            >
              <option value="" defaultValue={true}>
                Select Category
              </option>
              <option value="Food">Food</option>
              <option value="Education">Education</option>
              <option value="Businessman">Businessman</option>
              <option value="Position">Position</option>
            </select>
          </div>
          <div className="input-group my-2">
            {/* Make this rich text editor (future work) */}
            <textarea
              className="form-control"
              placeholder="Enter Description"
              rows={20}
              onChange={(e) =>
                setBlogData({ ...blogData, description: e.target.value })
              }
              value={blogData.description}
            />
          </div>
          <div className="d-flex justify-content-end mt-1">
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
