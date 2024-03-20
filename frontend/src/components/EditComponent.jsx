import React, { useRef, useState } from "react";
import axios from "axios";

import { useAuth } from "../context/UserContext";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useChat } from "../context/ChatContext";
import AvatarImg from "@images/default-avatar.jpg";
import { updateUser } from "../services/apiServices";
import { updateGroup } from "../services/groupServices";
import Loading from "./ui/Loading";
import FancyBox from "./FancyBox";

const EditComponent = ({ user, selectedChat }) => {
  const { user: currentUser, updateUserDetails } = useAuth();
  const { updateGroupDetails } = useChat();
  //   const { selectedChat } = useChat();
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState(
    user
      ? {
          name: user?.name || "",
          phone: user?.phone || "",
          //   imgUrl: user?.imageUrl || "",
        }
      : {
          chatName: selectedChat.chatName,
          //   imgUrl: selectedChat.imageUrl,
          chatId: selectedChat.id,
        }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeImage = e => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imgUrl = URL.createObjectURL(selectedImage);
      setImage(selectedImage);
      setPreviewImage(imgUrl);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (user) {
      if (userData.name.trim() && userData.phone) {
        setIsLoading(true);
        if (image) {
          const imgUrl = await uploadImageToCloudinary();
          if (imgUrl) {
            setImageUrl(imgUrl);
            setUserData({ ...userData, imgUrl: imgUrl });
            const user = await updateUser({ ...userData, imgUrl });
            updateUserDetails(user);
          }
        } else if (
          user.name !== userData.name ||
          user.phone !== userData.phone
        ) {
          const user = await updateUser(userData);
          updateUserDetails(user);
        }
        setIsLoading(false);
      }
    } else {
      if (userData.chatName.trim()) {
        setIsLoading(true);
        if (image) {
          const imgUrl = await uploadImageToCloudinary();
          if (imgUrl) {
            setImageUrl(imgUrl);
            setUserData({ ...userData, imgUrl: imgUrl });
            const group = await updateGroup({ ...userData, imgUrl });
            updateGroupDetails(group);
          }
        } else if (selectedChat.chatName !== userData.chatName) {
          const group = await updateGroup(userData);
          updateGroupDetails(group);
        }
        setIsLoading(false);
      }
    }
    setImage(null);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const uploadImageToCloudinary = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      delete axios.defaults.headers.common["Authorization"];

      const { data } = await axios.post(
        import.meta.env.VITE_CLOUDINARY_API,
        formData
      );
      return data?.url;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex flex-col text-center">
      <div className="img-wrapper relative mx-auto">
        {!isEdit ? (
          <FancyBox>
            <a
              data-fancybox="gallery"
              href={selectedChat?.imageUrl || user?.imageUrl || AvatarImg}
            >
              <img
                src={selectedChat?.imageUrl || user?.imageUrl || AvatarImg}
                alt=""
                className={`h-32 w-32 rounded-full overflow-hidden border  object-cover bg-white ${
                  isEdit ? "cursor-pointer" : ""
                }`}
                onClick={isEdit && handleClick}
              />
            </a>
          </FancyBox>
        ) : (
          <img
            src={
              previewImage ||
              selectedChat?.imageUrl ||
              user?.imageUrl ||
              AvatarImg
            }
            alt=""
            className={`h-32 w-32 rounded-full overflow-hidden border  object-cover bg-white ${
              isEdit ? "cursor-pointer" : ""
            }`}
            onClick={isEdit && handleClick}
          />
        )}
        {(user?.id === currentUser.user.id ||
          selectedChat?.groupAdminId.includes(currentUser.user.id)) && (
          <button
            className="absolute bottom-0 right-0 rounded-full bg-gray-300 flex justify-center items-center h-8 w-8 outline-none shadow"
            onClick={() => setIsEdit(!isEdit)}
            title="Edit"
          >
            {!isEdit ? (
              <i className="fa-solid fa-pen text-gray-700 text-sm"></i>
            ) : (
              <i className="fa-solid fa-xmark text-gray-700"></i>
            )}
          </button>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleChangeImage}
      />
      {!selectedChat?.isGroup && (
        <div className={isEdit ? "hidden" : "block"}>
          <h3 className="mt-5 text-gray-900 text-2xl">{user.name}</h3>

          <p className="mt-3 text-sm text-gray-500 flex gap-4 justify-center">
            <a href={`mailto:${user.email}`}>{user.email}</a>
            <a href={`tel:${user.phone}`}>{user.phone}</a>
          </p>
        </div>
      )}

      <div
        className={`form-wrapper ${
          isEdit ? "block" : "hidden"
        } h-40 overflow-y-auto`}
      >
        <form onSubmit={handleSubmit}>
          {!selectedChat?.isGroup ? (
            <>
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
            </>
          ) : (
            <Input
              value={userData.chatName}
              onChange={handleChange}
              name="chatName"
            />
          )}
          {isLoading ? (
            <Loading />
          ) : (
            <Button className="!bg-green-200 !text-green-700 text-xs py-1 px-4 rounded-lg mt-5 max-w-max mx-auto">
              Save
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditComponent;
