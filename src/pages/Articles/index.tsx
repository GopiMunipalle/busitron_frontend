import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

function ArticleEditor() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [allArticles, setAllArticles] = useState([]);
  const [error, setError] = useState("");
  const [toggleStates, setToggleStates] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleCreateTask = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId") as string);
      const response = await fetch("http://localhost:5000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: body,
          author: userId,
        }),
      });
      if (response.ok) {
        alert("Article created successfully");
        return;
      }
      alert("Failed to create article");
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  const fetchAllArticles = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId") as string);
      const response = await fetch(
        `http://localhost:5000/api/articles/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      setAllArticles(data);
    } catch (error) {
      console.log("Error fetching articles", error);
    }
  };

  const handleToggle = (index: number) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      <Header />
      <div className="h-screen bg-gray-100 p-8 flex flex-col md:flex-row justify-center items-start gap-8">
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-center text-gray-800">
            Article Creator
          </h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <textarea
              placeholder="Write your article here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-60"
              required
            />
          </div>

          <button
            className="w-1/3 self-center bg-blue-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition"
            onClick={handleCreateTask}
          >
            Create
          </button>
        </div>
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-800">My Articles</h2>
          {allArticles.map((article: any, index: number) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <h3 className="text-xl font-bold text-gray-700">
                {article.title}
              </h3>
              <div className="flex items-center justify-center gap-4">
                <span className="text-lg">Publish Article</span>
                <div
                  className="cursor-pointer"
                  onClick={() => handleToggle(index)}
                >
                  {toggleStates[index] ? (
                    <FaToggleOn size={40} color="#007bff" />
                  ) : (
                    <FaToggleOff size={40} color="#808080" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ArticleEditor;
