import React, { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaSearchLocation,
  FaBicycle,
  FaMotorcycle,
  FaCar,
  FaBus,
  FaWalking,
} from "react-icons/fa";

const transportationMethods = [
  { id: "walking", label: "Walking", icon: <FaWalking /> },
  { id: "bicycle", label: "Bicycle", icon: <FaBicycle /> },
  { id: "motorcycle", label: "Motorcycle", icon: <FaMotorcycle /> },
  { id: "car", label: "Car", icon: <FaCar /> },
  { id: "publicTransport", label: "Public Transport", icon: <FaBus /> },
];

const VolunteerRegistration = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [step, setStep] = useState(1);

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [transportError, setTransportError] = useState(false);

  const [isAgreed, setIsAgreed] = useState(false);

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

  const handleNextStep = () => {
    if (step === 1) {
      if (!name) {
        setNameError(true);
        return;
      }
      if (!phone || phone.length < 10) {
        setPhoneError(true);
        return;
      }
    }
    if (step === 2) {
      if (!location) {
        alert("Please fill in your location.");
        return;
      }
      if (!selectedTransport) {
        setTransportError(true);
        return;
      }
    }

    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameError(false);
    setPhoneError(false);
    setTransportError(false);

    let isValid = true;

    if (!name) {
      setNameError(true);
      isValid = false;
    }

    if (!phone || isNaN(phone) || phone.length < 10) {
      setPhoneError(true);
      isValid = false;
    }

    if (!selectedTransport) {
      setTransportError(true);
      isValid = false;
    }

    if (isValid) {
      alert("Form Submitted!");
      setName("");
      setPhone("");
      setLocation("");
      setSelectedTransport(null);
      setIsAgreed(false);
      setStep(1);
    }
  };

  const isSubmitDisabled = !name || !phone || !location || !selectedTransport || !isAgreed;

  // ✅ Modified: Accept only 10 numeric digits
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(numericValue);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex items-center mb-6">
        <FaUser className="text-green-600 text-2xl mr-2" />
        <h2 className="text-2xl font-semibold">Volunteer Registration</h2>
      </div>

      {step === 1 && (
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
                className={`w-full outline-none bg-transparent ${nameError ? "border-red-500" : ""}`}
              />
            </div>
            {nameError && <p className="text-red-500 mt-2">Name is required.</p>}
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
                className={`w-full outline-none bg-transparent ${phoneError ? "border-red-500" : ""}`}
                maxLength="10"
              />
            </div>
            {phoneError && (
              <p className="text-red-500 mt-2">
                Please enter a valid phone number.
              </p>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Your Location</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Enter location address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none bg-transparent"
            />
            <button
              onClick={handleFindLocation}
              className="bg-gray-200 px-4 py-1 rounded-md text-gray-700 font-medium ml-2"
            >
              Find
            </button>
            <FaSearchLocation className="text-gray-400 ml-2 cursor-pointer" />
          </div>
          <p className="text-gray-500 text-sm mt-1">This helps us match you with nearby food donations.</p>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Transportation Method</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {transportationMethods.map((method) => (
                <button
                  key={method.id}
                  className={`flex items-center justify-center border w-full px-3 rounded-lg text-gray-700 transition ${
                    selectedTransport === method.id
                      ? "bg-green-500 text-white border-green-500"
                      : "border-gray-300 hover:bg-orange-500"
                  }`}
                  onClick={() => {
                    setSelectedTransport(method.id);
                    setTransportError(false);
                  }}
                >
                  <span className="mr-2">{method.icon}</span> {method.label}
                </button>
              ))}
            </div>
            {transportError && <p className="text-red-500 mt-2">Please select a transportation method.</p>}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">Additional Information (Optional)</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 h-24 outline-none"
            placeholder="Any additional details about your availability or preferences"
          ></textarea>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 flex items-start">
          <input
            type="checkbox"
            className="mt-1 scale-125"
            checked={isAgreed}
            onChange={() => setIsAgreed(!isAgreed)}
          />
          <p className="text-gray-700 ml-2 text-sm">
            I agree to the volunteer terms and conditions, including adherence to food safety guidelines and timely pickups.
          </p>
        </div>
      )}

      <div className="mt-6">
        {step < 3 ? (
          <button
            onClick={handleNextStep}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`w-full py-3 rounded-lg font-semibold ${isSubmitDisabled ? "bg-gray-400" : "bg-green-600 text-white"}`}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default VolunteerRegistration;
