import React, { useState } from "react";
import { useEffect } from "react";

interface atricle {}

function ArticleEditor() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [allArticles, setAllAtricles] = useState([]);

  const handleSaveDraft = () => {
    // onSave({ title, body, status: 'draft' });
  };

  const handlePublish = () => {
    // onPublish({ title, body, status: 'published' });
  };

  useEffect(() => {
    fetchAllAtricles();
  });

  const fetchAllAtricles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/articles");
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      setAllAtricles(data);
    } catch (error) {
      console.log("Error fetching articles", error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Article Editor
        </h1>

        {/* Title Input */}
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

        {/* Body Textarea */}
        <div className="mb-6">
          <textarea
            placeholder="Write your article here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-60"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleSaveDraft}
            className="w-1/3 bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Save as Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={status === "published"}
            className={`w-1/3 p-3 rounded-lg transition ${
              status === "published"
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleEditor;
