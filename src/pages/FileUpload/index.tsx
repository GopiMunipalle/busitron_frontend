import React, { useState } from "react";

const FileUpload = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<{ name: string } | null>(null);
  const [error, setError] = useState<null | string>(null);

  // Handle drag events to manage the drag state
  const handleDragEnter = (event: React.FormEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.FormEvent) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    setDragging(false);

    // Get the file from the drop event
    const droppedFile = event.dataTransfer.files[0];

    // Validate the file (optional)
    if (droppedFile) {
      if (droppedFile.size > 10 * 1024 * 1024) {
        setError("File size should be less than 10MB");
        return;
      }

      if (
        !["image/jpeg", "image/png", "application/pdf"].includes(
          droppedFile.type
        )
      ) {
        setError("Invalid file type. Only JPG, PNG, and PDF are allowed.");
        return;
      }

      setError(null); // Clear previous errors
      setFile(droppedFile);
      uploadFile(droppedFile);
    }
  };

  // Handle file selection via file input
  const handleFileInput = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      uploadFile(selectedFile);
    }
  };

  // Simulate file upload to the server
  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    // Use fetch or axios to send the file to the server
    // Here's an example using fetch:
    fetch("/upload-endpoint", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File uploaded successfully", data);
        // You can handle the uploaded file response here
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });
  };

  return (
    <div>
      <div
        style={{
          border: "2px dashed #008cba",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "20px",
          backgroundColor: dragging ? "#f0f0f0" : "#fff",
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>Drag & drop a file here, or click to select a file</p>
        <input
          type="file"
          onChange={handleFileInput}
          style={{ display: "none" }}
        />
        <button
          onClick={() =>
            (document.querySelector(
              'input[type="file"]'
            ) as HTMLInputElement)!.click()
          }
          style={{ marginTop: "10px" }}
        >
          Choose File
        </button>
      </div>

      {file && <p>File selected: {file.name}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
