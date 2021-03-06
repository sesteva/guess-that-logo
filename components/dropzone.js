import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ index, handleFileUpload, img }) {
  const [loading, setLoading] = useState(false)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: async acceptedFile => {
      setLoading(true);
      const data = new FormData()
      data.append('file', acceptedFile[0])
      data.append('upload_preset', 'rczbjmvi')
      const res = await fetch('	https://api.cloudinary.com/v1_1/vishaag/image/upload',
        {
          method: 'POST',
          body: data
        })
      const uploadedFile = await res.json()
      handleFileUpload(uploadedFile.secure_url, index)
      setLoading(false);
    }
  });

  return (
    <>
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })} className="dropzone-div">
        <input type="file" required name="fileUpload" {...getInputProps()} />

        {!img && !loading && <p>Upload Image</p>}
        {loading && <img src="/loader.svg" className="no-border loading"/>}
        {img && !loading && <img src={img} className="no-border"/>}
      </div>
    </section>
    <style jsx>{`
      section {
          display: flex;
          justify-content: center;
          align-items: center;
      }

      p {
        text-align: center;
        height: 150px; 
        width: 150px;
        border: 4px dotted grey;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }

      img {
        height: 150px;
      }
    `}
    </style>
  </>
  );

}
