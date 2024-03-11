import MyModal from "@components/ui/Modal";
import React, { useRef, useState } from "react";

const ImageInput = ({ setPreviewImage }) => {
  const imageRef = useRef();
  //   const [previewImage, setPreviewImage] = useState(null);

  const handleClick = () => {
    imageRef.current.click();
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      // Set the selected file as the preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(image);
    }
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={imageRef}
        onChange={handleImageChange}
      />
      <button type="button" onClick={handleClick} title="Select Image">
        <i className="fa-solid fa-image text-green-800 text-2xl"></i>
      </button>
    </div>
  );
};

export default ImageInput;
