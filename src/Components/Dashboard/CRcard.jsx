import React from "react";
import { MapPin, Users, Clock } from "lucide-react";
import CNetwoks from "./CompostingNtwk"; // Importing the Composting Network component
const foodItems = [
  {
    id: 1,
    title: "Expired Restaurant Meals",
    location: "Downtown Restaurant",
    description: "Meals that have passed their consumption time but are suitable for composting.",
    servings: 15,
    expiredTime: "2 hours ago",
    type: "Prepared Meals",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  },
  {
    id: 2,
    title: "Expired Produce",
    location: "Local Market",
    description: "Fruits and vegetables past their prime, perfect for composting.",
    servings: 20,
    expiredTime: "5 hours ago",
    type: "Produce",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
  },
  {
    id: 3,
    title: "Expired Bakery Items",
    location: "Morning Bakery",
    description: "Bread and pastries that are no longer fresh but suitable for composting.",
    servings: 10,
    expiredTime: "1 day ago",
    type: "Bakery",
    image: "https://images.unsplash.com/photo-1606756791134-15206e5e0d4b",
  },
];

const Tag = () => (
  <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
    ⚠️ Expired
  </span>
);

const TypeTag = ({ text }) => (
  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
    {text}
  </span>
);

const ExpiredCard = ({ item }) => (
  <div className="relative bg-white border border-yellow-200 rounded-xl overflow-hidden shadow-sm transition hover:shadow-md w-80 shrink-0">
    <div className="relative h-48 overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
      />
      <Tag />
      <TypeTag text={item.type} />
    </div>
    <div className="p-4 space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">
        {item.title}
      </h3>
      <div className="flex items-center text-sm text-gray-500">
        <MapPin className="w-4 h-4 mr-1" />
        {item.location}
      </div>
      <p className="text-sm text-gray-600 leading-snug">
        {item.description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          {item.servings} servings
        </div>
        <div className="flex items-center text-yellow-600">
          <Clock className="w-4 h-4 mr-1" />
          Expired {item.expiredTime}
        </div>
      </div>
      <button className="mt-4 w-full bg-yellow-400 text-white font-semibold py-2 rounded-full hover:bg-yellow-500">
        Collect for Composting
      </button>
    </div>
  </div>
);

const ExpiredFoodList = () => {
  return (
    <>
    <div className="max-w-6xl mx-auto px-4 pt-2 pb-4 -mt-4">
      <div className="flex items-center justify-between mb-6 mt-0 pt-0">
        <h1 className="text-3xl font-bold text-gray-800 mt-0 pt-0">
          Expired Food for Composting
        </h1>
        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
          {foodItems.slice(0, 3).length} items
        </span>
      </div>
      
      {/* Flex row container */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar">
        {foodItems.slice(0, 3).map((item) => (
          <ExpiredCard key={item.id} item={item} />
        ))}
      </div>
    </div>
    <CNetwoks/>
    </>
  );
};

export default ExpiredFoodList;
