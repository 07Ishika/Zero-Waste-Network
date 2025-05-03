import { useState, useRef } from "react";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import Footer from "../Homepage/Footer";

const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

const UpdateFoodForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    servings: "",
    description: "",
    location: "",
    foodType: "",
    expiresIn: "",
    phone: "",
    email: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const refs = {
    title: useRef(),
    servings: useRef(),
    description: useRef(),
    location: useRef(),
    foodType: useRef(),
    expiresIn: useRef(),
    phone: useRef(),
    email: useRef(),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^[0-9]*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setErrors({ ...errors, image: "" });
  };

  const getAddressFromCoordinates = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      return data.display_name || "Location not found";
    } catch (error) {
      console.error("Error fetching location:", error);
      return "Location not found";
    }
  };

  const handleFindLocation = () => {
    if (!API_KEY) {
      alert("API Key is missing. Please check your .env file.");
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await getAddressFromCoordinates(latitude, longitude);
          setFormData((prev) => ({ ...prev, location: address }));
          setErrors({ ...errors, location: "" });
        },
        (error) => {
          console.error("Geolocation Error:", error);
          setFormData((prev) => ({ ...prev, location: "Unable to get location" }));
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const validateAndFocus = (e) => {
    const inputs = Object.keys(formData);
    for (let i = 0; i < inputs.length - 1; i++) {
      const key = inputs[i];
      if (!formData[key] || (key === "image" && formData[key] === null)) {
        setErrors((prev) => ({ ...prev, [key]: "Please fill this field" }));
        refs[key]?.current?.focus();
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value || (key === "image" && value === null)) {
        newErrors[key] = "This field is required";
      }
    });

    if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be valid";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form Submitted:", formData);
    setErrors({});
  };

  const handlePhoneKeyDown = (e) => {
    // Block non-numeric key presses
    if (
      ["e", "E", "+", "-", ".", ","].includes(e.key) ||
      (!/\d/.test(e.key) && e.key.length === 1 && !e.ctrlKey)
    ) {
      e.preventDefault();
    }
  };

  const handlePhonePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (!/^\d+$/.test(paste)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-2">Update Surplus Food</h2>
        <p className="text-center text-gray-600 mb-6">
          Report food that would otherwise go to waste. Local volunteers will help distribute it to those in need.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" onBlur={validateAndFocus}>
          {/* Title & Servings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                ref={refs.title}
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Catered Event Leftovers"
                className={`w-full p-3 border shadow-sm rounded-lg focus:outline-green-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <input
                ref={refs.servings}
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                placeholder="Estimated Servings"
                className={`w-full p-3 border shadow-sm rounded-lg focus:outline-green-500 ${errors.servings ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.servings && <p className="text-red-500 text-sm mt-1">{errors.servings}</p>}
            </div>
          </div>

          {/* Description */}
          <label htmlFor="description" className="font-bold block mb-2">Description</label>
          <textarea
            ref={refs.description}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the food items, packaging, and any other relevant details"
            className={`w-full p-3 border shadow-sm rounded-lg focus:outline-green-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            rows="3"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}

          {/* Location */}
          <div className="flex items-center space-x-2">
            <input
              ref={refs.location}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location address"
              className={`w-full p-3 border shadow-sm rounded-lg focus:outline-green-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
              type="button"
              onClick={handleFindLocation}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Find
            </button>
          </div>
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}

          {/* Food Type & Expiry */}
          <label htmlFor="foodType" className="font-bold block mb-2">Food Type & Expires In</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                ref={refs.foodType}
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                className={`w-full p-3 border shadow-sm rounded-lg focus:outline-green-500 ${errors.foodType ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select food type</option>
                <option>Baked</option>
                <option>Canned Food</option>
                <option>Prepared Food</option>
                <option>Dairy Products</option>
                <option>Others</option>
              </select>
              {errors.foodType && <p className="text-red-500 text-sm mt-1">{errors.foodType}</p>}
            </div>

            <div>
              <input
                ref={refs.expiresIn}
                type="datetime-local"
                name="expiresIn"
                value={formData.expiresIn}
                onChange={handleChange}
                className={`w-full p-3 border shadow-sm rounded-lg focus:outline-green-500 ${errors.expiresIn ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.expiresIn && <p className="text-red-500 text-sm mt-1">{errors.expiresIn}</p>}
            </div>
          </div>

          {/* Image Upload */}
          <label htmlFor="image" className="font-bold block mb-2">Food Image</label>
          <div className="border p-4 shadow-sm rounded-lg flex flex-col items-center">
            <label className="cursor-pointer">
              <FaUpload className="text-gray-500 text-2xl mb-2" />
              <input type="file" onChange={handleImageChange} className="hidden" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop (PNG, JPG, GIF up to 5MB)</p>
            </label>
          </div>
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

          {/* Guidelines */}
          <div className="p-4 border-l-4 border-yellow-500 bg-orange-100 text-sm text-gray-700 rounded-lg">
            🛑 Ensure food is properly packaged and hasn't been sitting at room temperature for more than 2 hours.
            High-risk foods (meat, dairy, prepared meals) should be refrigerated. Include any allergen information.
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                ref={refs.phone}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onKeyDown={handlePhoneKeyDown}
                onPaste={handlePhonePaste}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10} // Limiting phone number to 10 digits
                placeholder="Phone Number"
                className={`w-full p-3 border shadow-sm rounded-lg focus:outline-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <input
                ref={refs.email}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full p-3 border shadow-sm rounded-lg focus:outline-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
            >
              <FaCheckCircle />
              Submit Donation
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UpdateFoodForm;
