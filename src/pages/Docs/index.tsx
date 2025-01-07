import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const onFileUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUploadedFileUrl(data.fileUrl); // Save the file URL to state
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  // Open the file (this will trigger download or view, depending on browser)
  const openFile = () => {
    if (uploadedFileUrl) {
      window.open(uploadedFileUrl, "_blank");
    }
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadedFileUrl && (
        <div>
          <button onClick={openFile}>Open File</button>
          {/* Optional: You can also provide a download link */}
          <a href={uploadedFileUrl} download>
            Download File
          </a>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
