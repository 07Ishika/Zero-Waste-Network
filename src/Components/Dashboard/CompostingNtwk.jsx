import React from "react";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";

const CompostingNetwork = () => {
  return (
    <div className="p-10 bg-white rounded-2xl shadow-md max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Join our Composting Network</h1>
      <p className="text-gray-600 text-lg mb-8">
        As a compost retailer, you play a crucial role in our food cycle ecosystem.
        By composting expired food, you help turn waste into valuable resources for gardening and farming.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benefits of Joining */}
        <div className="bg-green-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 ml-2">Benefits of Joining</h2>
          <ol className="list-decimal list-inside text-gray-800 space-y-2">
            <li>🍀 Regular supply of compostable materials</li>
            <li>🍀 Real-time notifications when food expires</li>
            <li>🍀 Reduce environmental impact of food waste</li>
            <li >🍀 Connect with local businesses and communities</li>
          </ol>
        </div>


        {/* How It Works */}
        <div className="bg-green-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside text-gray-800 space-y-2">
            <li>Register as a compost retailer on our platform</li>
            <li>Receive notifications when food items expire</li>
            <li>Browse available expired items in your area</li>
            <li>Schedule pickups for items you want to collect</li>
            <li>Turn food waste into valuable compost</li>
          </ol>
        </div>
      </div>

      <div className="flex justify-center mt-8">
  <Link
    to="/composter-registration"
    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full text-lg shadow text-center transition"
  >
    Apply to Join
  </Link>
</div>
    </div>
  
  );
};

export default CompostingNetwork;
