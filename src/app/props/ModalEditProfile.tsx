import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { TbPhotoEdit } from "react-icons/tb";

interface ModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: User) => void;
}

interface User {
  _id: string | undefined;
  name: string | null | undefined;
  coverPhoto: any;
  profile: any;
}

const Modal: React.FC<ModalProps> = ({ user, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<User>({
    _id: user._id,
    name: user.name,
    coverPhoto: user.coverPhoto,
    profile: user.profile,
  });
  const [imagePreviewProfile, setImagePreviewProfile] = useState<string | null>(
    null
  );
  const [imagePreviewCover, setImagePreviewCover] = useState<string | null>(
    null
  );

  const handleFormInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      if (field === "profile") {
        console.log("profile");
        setImagePreviewProfile(imageUrl);
        setFormData((prev) => ({
          ...prev,
          profile: file, // Store the file for submission
        }));
      } else if (field === "coverPhoto") {
        console.log("cover");
        setImagePreviewCover(imageUrl);
        setFormData((prev) => ({
          ...prev,
          coverPhoto: file, // Store the file for submission
        }));
      }
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
    setImagePreviewCover(null);
    setImagePreviewProfile(null);
    setFormData({
      _id: "",
      name: "",
      coverPhoto: null,
      profile: null,
    });
  };

  useEffect(() => {
    if (user) {
      setFormData({
        _id: user._id,
        name: user.name,
        profile: user.profile,
        coverPhoto: user.coverPhoto,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
        onClick={() => {
          onClose(),
            setFormData({
              _id: "",
              name: "",
              coverPhoto: null,
              profile: null,
            });
          setImagePreviewCover(null);
          setImagePreviewProfile(null);
        }}
      />
      <div className="relative z-10 bg-base-white overflow-auto rounded-t-xl lg:w-4/5 md:w-full w-screen h-[95vh] max-w-6xl">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="h-full flex flex-col"
        >
          {/* Cover photo section */}
          <div className="relative top-0 h-1/2 group">
            <img
              src={imagePreviewCover || formData.coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover group-hover:blur-sm transition-all duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
              <div className="flex gap-2 items-center justify-center text-white">
                <label htmlFor="coverPhoto" className="flex gap-2 items-center">
                  <CiImageOn className="text-6xl" />
                  <p>Change Cover</p>
                  <input
                    type="file"
                    id="coverPhoto"
                    name="coverPhoto"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, "coverPhoto")}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Profile section */}
          <div className="relative flex items-center justify-center md:-top-28 -top-16  flex-col gap-3">
            <div className="relative">
              <img
                src={imagePreviewProfile || formData.profile}
                alt="Profile"
                className="object-cover md:h-44 md:w-44 w-24 h-24 rounded-full border-2 border-white"
              />
              <label
                htmlFor="profile"
                className="absolute right-2 p-1 bg-base-white rounded-full top-4 shadow text-3xl cursor-pointer"
              >
                <BiEdit className="md:text-2xl text-sm" />
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "profile")}
                  accept="image/*"
                />
              </label>
            </div>

            {/* Name section */}
            <div className="flex gap-2 items-center relative">
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleFormInputChange}
                className="text-2xl font-bold bg-transparent border-b-2 text-center border-gray-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Save/Discard buttons */}
          <div className="absolute bottom-0 right-1/2 left-1/2 mb-6 flex items-center justify-center gap-5">
            <button
              type="submit"
              className="px-7 py-3 shadow bg-blue-500 hover:to-blue-600 transition-all duration-300 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="px-7 py-3 shadow rounded bg-base-mid transition-all hover:bg-slate-300"
              onClick={onClose}
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
