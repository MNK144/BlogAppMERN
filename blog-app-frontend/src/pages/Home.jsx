import React, { useEffect, useState } from "react";
import { useBlogDelete, useBlogList } from "../services/blogService";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const initialListOptions = {
  page: 1,
  limit: 100, // Skipping Pagination for now
  sort_field: "createdAt",
  sort: "desc",
  search: "",
}

const Home = () => {
  const { blogListApi, isLoading } = useBlogList();
  const { blogDeleteApi } = useBlogDelete();
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortDropdown, setSortDropdown] = useState(false);
  const [listOptions, setListOptions] = useState(initialListOptions);

  useEffect(() => {
    getBlogs();
  },[listOptions]);

  const applyListOptions = (key, value) => {
    setListOptions({
      ...listOptions,
      page: initialListOptions.page,
      limit: initialListOptions.limit,
      [key]: value
    })
  }
  async function getBlogs() {
    const response = await blogListApi(listOptions);
    setBlogData(response.data);
  }
  const handleEdit = (slug) => {
    navigate('/update', { state: { slug } });
  };
  const handleDelete = async (id) => {
    await blogDeleteApi({
      id
    });
    await getBlogs();
  };
  const handleLoadMore = () => {
    console.log("Handle Load More Clicked");
    setListOptions({
      ...listOptions,
      page: listOptions.page + 1
    })
  }
  return (
    <>
      <header className="py-5 bg-light border-bottom mb-4">
        <div className="container">
          <div className="text-center my-5">
            <h1 className="fw-bolder">Welcome to Blog Home!</h1>
            <p className="lead mb-0">One stop solution for all your blog needs</p>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-header">Search</div>
              <div className="card-body">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter search term..."
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => applyListOptions("search", searchInput)}
                  >
                    Go!
                  </button>
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header">Sort</div>
              <div className="card-body">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    onClick={() => setSortDropdown(!sortDropdown)}
                  >
                    Sort by Date
                  </button>
                  <ul className={`dropdown-menu${sortDropdown ? ' show' : ''}`}>
                    <li role="button" onClick={() => applyListOptions("sort", "asc")}>
                      <span className="dropdown-item">Ascending</span>
                    </li>
                    <li role="button" onClick={() => applyListOptions("sort", "desc")}>
                      <span className="dropdown-item">Descending</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            {isLoading ? (<h3>Loading...</h3>) : blogData.map((data) => (
              <div
                className="card mb-4 cursor"
                role="button"
                onClick={() => {
                  console.log(`Blog ${data._id} Clicked`);
                  navigate(`/blog/${data.slug}`)
                }}
                key={data._id}
              >
                <div className="card-body position-relative">
                  <div className="d-flex justify-content-between">
                    <div className="small text-muted">{moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    <div>
                      <button
                        className="btn btn-sm btn-secondary me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(data.slug);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(data._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <h2 className="card-title">{data.title}</h2>
                  <p className="card-text">
                    {data.description}
                  </p>
                </div>
              </div>
            ))}
            <nav className="text-center" aria-label="Pagination">
              <hr className="my-0" />
              <button className="btn btn-outline-primary my-4" onClick={handleLoadMore}>
                Load More
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
