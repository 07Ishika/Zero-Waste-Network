import React, { useState } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt, FaSearchLocation, FaBuilding, FaEnvelope } from "react-icons/fa";

const ComposterReg = () => {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const [errors, setErrors] = useState({});

  const handleFindLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setLocation(data.display_name);
          } else {
            alert("Could not retrieve address.");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          alert("Failed to fetch address.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!phone || phone.length < 10) newErrors.phone = "Valid phone number is required";
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Valid email is required";
    if (!location) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        name,
        businessName,
        phone,
        email,
        location
      };
      
      const res = await fetch('http://localhost:5000/api/composter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to register');
      }
      
      alert("Composter Registered Successfully!");
      setName("");
      setBusinessName("");
      setPhone("");
      setEmail("");
      setLocation("");
      setErrors({});
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(numericValue);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex items-center mb-6">
        <FaBuilding className="text-green-600 text-2xl mr-2" />
        <h2 className="text-2xl font-semibold">Compost Retailer Registration</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full outline-none bg-transparent ${errors.name ? "border-red-500" : ""}`}
              />
            </div>
            {errors.name && <p className="text-red-500 mt-2 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Business Name (Optional)</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <FaBuilding className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <FaPhone className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Your phone number"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full outline-none bg-transparent ${errors.phone ? "border-red-500" : ""}`}
                maxLength="10"
              />
            </div>
            {errors.phone && <p className="text-red-500 mt-2 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full outline-none bg-transparent ${errors.email ? "border-red-500" : ""}`}
              />
            </div>
            {errors.email && <p className="text-red-500 mt-2 text-sm">{errors.email}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Location Address</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Enter location address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full outline-none bg-transparent ${errors.location ? "border-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={handleFindLocation}
              className="bg-gray-200 px-4 py-1 rounded-md text-gray-700 font-medium ml-2 cursor-pointer hover:bg-gray-300 transition"
            >
              Find
            </button>
            <FaSearchLocation className="text-gray-400 ml-2 cursor-pointer" />
          </div>
          {errors.location && <p className="text-red-500 mt-2 text-sm">{errors.location}</p>}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 transition text-white"
          >
            Register as Compost Retailer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposterReg;
