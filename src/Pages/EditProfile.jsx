import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../store/User/userSliceReducers";
import {
  clearError,
  cleareUpdateProfileMessage,
} from "../store/User/userSlice";

const EditProfile = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const { user, isLoading, error, updateProfileMessage } = useSelector(
    (state) => state.auth
  );
  const data = user?.data;

  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    oldAvatarId: "",
  });

  const [avatar, setAvatar] = useState("/src/assets/profile.jpg");
  formData.avatar = avatar;
  const [preview, setPreview] = useState(
    data?.avatar?.url || "/src/assets/profile.jpg"
  );

  const handleUpdateProfileChange = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);

      formData.oldAvatarId = data?.avatar?.public_id;

      // console.log(reader.readAsDataURL(e.target.files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
      // console.log(signUpData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Dispatch(updateUserProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      Dispatch(clearError());
      Navigate("/sign-in", { replace: true });
    }

    if (updateProfileMessage) {
      toast.success(updateProfileMessage);
      Navigate("/user/profile", { replace: true });
      Dispatch(cleareUpdateProfileMessage());
    }
  }, [error]);

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center text-center text-navText bg-gradient-to-br from-primary via-accent to-primaryLight relative min-h-screen">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      <div className="container px-6 mt-10 py-12 relative z-10 flex flex-col lg:flex-row justify-between items-center w-full lg:w-[85%] xl:w-[65%]">
        {/* Left Side: Text Section */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
            Edit Your Profile <br />
            <span className="text-accent">{data?.name || "Authify"}</span>
          </h1>
          <p className="text-lg text-navText/80 text-center">
            Update your personal details below.
          </p>
        </div>

        {/* Right Side: Edit Profile Form */}
        <div className="lg:w-1/2 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleUpdateProfileChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleUpdateProfileChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg" />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleUpdateProfileChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
              />
            </div>

            {/* Avatar */}
            <div className="relative flex items-center">
              <input
                type="file"
                accept="image/*"
                name="avatar"
                onChange={handleUpdateProfileChange}
                className="hidden"
                id="avatarInput"
              />
              <label
                htmlFor="avatarInput"
                className="w-full pl-4  py-2 rounded-md bg-white/10 text-white cursor-pointer placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
              >
                <div className="flex items-center">
                  {preview && (
                    <img
                      src={preview}
                      alt="Avatar Preview"
                      className="w-12 h-12 object-cover rounded-full shadow-md mr-2"
                    />
                  )}
                  <span className="text-white/60"> Avatar</span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-sm bg-accent text-nevText rounded-md font-semibold  transition hover:bg-primary hover:scale-105 shadow-lg hover:text-accent hover:cursor-pointer ${
                isLoading && "opacity-50 hover:cursor-not-allowed"
              }`}
            >
              {isLoading && isLoading === true ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
