"use client";
import React, { use, useEffect, useState } from "react";
import { Eye, Edit3, X, Upload, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHttp } from "@/hooks/useHttp";
import { setProfilePicture } from "@/lib/slices/authSlice";
const ProfilePage = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [processedImages, setProcessedImages] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const { post, get } = useHttp();
  const dispatch = useDispatch();
  // Mock data for previously processed images
  useEffect(() => {
    async function fetchProcessedImages() {
      const response = await get("/image/user-images");
      setProcessedImages(response);
    }
    fetchProcessedImages();
  }, [get]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    async function uploadProfilePicture() {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await post("/image/profile-pic", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(setProfilePicture(response.secureURL));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    uploadProfilePicture();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={user?.secureURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hover Options */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 transform hover:scale-110"
                    title="View Profile Picture"
                  >
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setShowEditForm(true)}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 transform hover:scale-110"
                    title="Edit Profile Picture"
                  >
                    <Edit3 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              @{user?.username}
            </h1>
          </div>
        </div>

        {/* Previously Processed Images Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Previously Processed Images
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedImages.map((image) => (
              <div
                key={image._id}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={image.secureURL}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {processedImages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">No processed images yet</p>
              <p className="text-gray-400 mt-2">
                Your processed images will appear here
              </p>
            </div>
          )}
        </div>

        {/* Profile Picture Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-2xl max-h-full">
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors duration-200 z-10"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={user.secureURL}
                  alt="Profile Picture"
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile Picture Form */}
        {showEditForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Update Profile Picture
                </h3>
                <button
                  onClick={() => setShowEditForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
                    <img
                      src={user.secureURL}
                      alt="Current profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Current profile picture
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-300">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Click to upload new image
                    </p>
                    <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowEditForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
                  >
                    Choose File
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
