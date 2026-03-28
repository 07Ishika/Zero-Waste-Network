import React from "react";
import { FaLeaf, FaHandsHelping, FaGlobeAmericas, FaArrowRight } from "react-icons/fa";
import Footer from "../Homepage/Footer";
import HeroImage from "../../about_hero.png";
import StoryImage from "../../about_story.png";

const About = () => {
  return (
    <div className="bg-gray-50 font-sans">
      
      {/* 1. Stunning Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HeroImage} 
            alt="Volunteers organizing fresh food" 
            className="w-full h-full object-cover object-top transform scale-105 hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-black/50"></div>
        </div>

        {/* Glassmorphism Title Box */}
        <div className="relative z-10 p-10 md:p-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl max-w-4xl text-center mx-4 mt-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
            Our Mission is <span className="text-green-400">Zero Waste.</span>
          </h1>
          <p className="text-lg md:text-xl text-green-50 leading-relaxed font-light">
            WasteNot Connect was built on a simple premise: edible food should feed people, not landfills. 
            We bridge the gap between surplus food and communities in need through technology and compassion.
          </p>
        </div>
      </section>

      {/* 2. Impact Cards (No overlap) */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-green-500 transform hover:-translate-y-3 transition duration-500 group">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
              <FaLeaf />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Environmental Impact</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              By redirecting food waste, we significantly reduce greenhouse gas emissions associated with landfills and agricultural overproduction.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-orange-400 transform hover:-translate-y-3 transition duration-500 group">
            <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
              <FaHandsHelping />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Community First</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              We empower local businesses, volunteers, and composters to work together. It takes a village to ensure no one goes hungry.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-500 transform hover:-translate-y-3 transition duration-500 group">
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <FaGlobeAmericas />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">A Global Vision</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              What starts locally scales globally. We are building the blueprint for a sustainable food network that can be replicated anywhere.
            </p>
          </div>

        </div>
      </section>

      {/* 3. The Story Split Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Left */}
          <div className="lg:w-1/2">
            <h2 className="text-green-600 font-bold tracking-wide uppercase text-sm mb-2">Our Origin</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
              Why We Started <br/>This Journey
            </h3>
            
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Every day, perfectly good food is thrown away simply because of logistics. Restaurants produce extra, bakeries have day-old bread, and catered events have untouched trays. Meanwhile, local shelters and families struggle to put food on the table.
              </p>
              <p>
                WasteNot Connect is the logistical bridge. We provide the platform for donors to easily signal they have food, for volunteers to securely transport it, and for composters to handle what can't be eaten. Together, we are creating a circular food economy.
              </p>
            </div>

            <button className="mt-10 flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-colors duration-300 shadow-lg">
              Meet the Team <FaArrowRight />
            </button>
          </div>

          {/* Image Right */}
          <div className="lg:w-1/2 w-full relative">
            <div className="absolute inset-0 bg-green-200 rounded-3xl transform translate-x-4 translate-y-4 shadow-xl z-0 -rotate-3"></div>
            <img 
              src={StoryImage} 
              alt="Hands sharing a crate of fresh produce" 
              className="relative z-10 rounded-3xl shadow-2xl object-cover w-full h-[400px]"
            />
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
