import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone = ({ onFileChange, initialImage}) => {

  const [images, setImages] = useState(initialImage ? [initialImage] : []);
  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages(newImages);
    onFileChange(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const renderPreviews = () =>
    images.map((file, index) => (
      <div key={index} style={styles.preview}>
        <img
          src={typeof file === 'string' ? file : file.preview}
          alt="Preview"
          style={styles.image}
        />
      </div>
    ));

  useEffect(() => {
    return () => {
      images.forEach((file) => {
        if (typeof file !== 'string') {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [images]);

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
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

export default MyDropzone;
