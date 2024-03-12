import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../utils/helper";
import { useAuth } from "../../context/UserContext";
import Button from "./Button";
import AvatarImg from "@images/default-avatar.jpg";
import Input from "./Input";
import axios from "axios";
import { updateUser } from "../../services/apiServices";

export default function UserDetail({ users }) {
  const user = getUser(users);
  const { user: currentUser, logout, updateUserDetails } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    phone: user.phone,
    imgUrl: user.imgUrl,
  });

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChangeImage = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imgUrl = URL.createObjectURL(selectedImage);
      setImage(selectedImage);
      setPreviewImage(imgUrl);
    }
  };

  const uploadImageToCloudinary = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("cloud_name", "dlkfae1fs");
      formData.append("upload_preset", "chathub");
      delete axios.defaults.headers.common["Authorization"];

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dlkfae1fs/image/upload",
        formData
      );
      return data?.url;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.name.trim() && userData.phone) {
      if (image) {
        const imgUrl = await uploadImageToCloudinary();
        if (imgUrl) {
          setImageUrl(imgUrl);
          setUserData({ ...userData, imgUrl: imgUrl });
          const user = await updateUser({ ...userData, imgUrl });
          updateUserDetails(user);
        }
      } else {
        const user = await updateUser(userData);
        updateUserDetails(user);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col text-center">
      <div className="img-wrapper relative mx-auto">
        {!isEdit ? (
          <img
            src={user.imageUrl || AvatarImg}
            alt=""
            className={`h-32 w-32 rounded-full overflow-hidden  shadow-md object-cover bg-white ${
              isEdit ? "cursor-pointer" : ""
            }`}
            onClick={isEdit && handleClick}
          />
        ) : (
          <img
            src={previewImage || user.imageUrl || AvatarImg}
            alt=""
            className={`h-32 w-32 rounded-full overflow-hidden  shadow-md object-cover bg-white ${
              isEdit ? "cursor-pointer" : ""
            }`}
            onClick={isEdit && handleClick}
          />
        )}

        <button
          className="absolute bottom-0 right-0 rounded-full bg-green-300 py-2 px-3 outline-none"
          onClick={() => setIsEdit(!isEdit)}
        >
          <i class="fa-solid fa-pen text-green-700"></i>
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleChangeImage}
      />
      <div className={isEdit ? "hidden" : "block"}>
        <h3 className="mt-5 text-gray-900 text-2xl">{user.name}</h3>

        <p className="mt-3 text-sm text-gray-500 flex gap-4 justify-center">
          <a href={`mailto:${user.email}`}>{user.email}</a>
          <a href={`tel:${user.phone}`}>{user.phone}</a>
        </p>
      </div>

      {/* <p className="mt-3 text-md text-gray-500"></p> */}

      <div
        className={`form-wrapper ${
          isEdit ? "block" : "hidden"
        } h-40 overflow-y-auto`}
      >
        <form onSubmit={handleSubmit}>
          <Input
            value={userData.name}
            icon={"fa-regular fa-user"}
            type="text"
            onChange={handleChange}
            name="name"
          />
          <Input
            value={userData.phone}
            icon={"fa-regular fa-phone"}
            type="number"
            onChange={handleChange}
            name="phone"
          />

          <Button className="!bg-green-200 !text-green-700 text-xs py-1 px-4 rounded-lg mt-5 max-w-max mx-auto">
            {/* <i className="fa-solid fa-upload bg-green-200 text-green-500 p-2 rounded-full "></i> */}
            Save
          </Button>
        </form>
      </div>

      {user.id === currentUser.user.id && (
        // <button className="bg-red-200 text-red-500 p-2 mt-2 rounded-lg border border-red-300 ho">
        //   Logout
        // </button>
        <div className="fixed bottom-6 left-0 right-0 px-6">
          <Button
            className={"bg-red-200 !text-red-600  w-full"}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
