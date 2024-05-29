import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Form from "./pages/Form";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/create" element={<Form key={"create"} type={"create"}/>} />
          <Route path="/update" element={<Form key={"update"} type={"update"}/>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
