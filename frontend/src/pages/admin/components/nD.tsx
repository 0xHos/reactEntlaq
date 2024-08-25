import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone = ({ onFileChange, initialImage }) => {
  const [files, setFiles] = useState(initialImage ? [initialImage] : []);
  const [uploadProgress, setUploadProgress] = useState({});

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    handleFileUpload(acceptedFiles);
    onFileChange([...files, ...acceptedFiles]);
  };

  const handleFileUpload = (acceptedFiles) => {
    const progress = {};
    acceptedFiles.forEach((file) => {
      progress[file.name] = 0; // Initial progress
      simulateUpload(file);
    });
    setUploadProgress((prevProgress) => ({ ...prevProgress, ...progress }));
  };

  const simulateUpload = (file) => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress[file.name] + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        return { ...prevProgress, [file.name]: Math.min(newProgress, 100) };
      });
    }, 500);
  };

  const removeFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    onFileChange(files.filter((file) => file !== fileToRemove));
    URL.revokeObjectURL(fileToRemove.preview);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*,video/*,application/pdf',
  });

  const renderPreviews = () =>
    files.map((file, index) => {
      const fileType = file.type ? file.type.split('/')[0] : '';
      let previewContent;

      if (fileType === 'image') {
        previewContent = <img src={file.preview} alt="Preview" style={styles.image} />;
      } else if (fileType === 'video') {
        previewContent = <video src={file.preview} controls style={styles.video} />;
      } else if (fileType === 'application') {
        previewContent = <embed src={file.preview} type="application/pdf" style={styles.pdf} />;
      }

      return (
        <div key={index} style={styles.preview}>
          {previewContent}
          {uploadProgress[file.name] !== undefined && (
            <div style={styles.progressContainer}>
              <div style={{ ...styles.progressBar, width: `${uploadProgress[file.name]}%` }} />
            </div>
          )}
          <button
            onClick={() => removeFile(file)}
            style={styles.deleteButton}
          >
            X
          </button>
        </div>
      );
    });

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (typeof file !== 'string') {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  return (
    <div>
      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div style={styles.previewContainer}>{renderPreviews()}</div>
    </div>
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#555555',
    backgroundColor: '#f9f9f9',
    marginTop: '20px',
  },
  previewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  preview: {
    marginRight: '10px',
    marginBottom: '10px',
    border: '1px solid #dddddd',
    padding: '10px',
    borderRadius: '4px',
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  pdf: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  progressContainer: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '5px',
    backgroundColor: '#f3f3f3',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  deleteButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '14px',
  },
};

export default MyDropzone;
