import React, { useEffect, useState } from "react";

const Meals = () => {
  const [meals, setMeals] = useState([]); // For storing meals data
  const [searchTerm, setSearchTerm] = useState(""); // For tracking the search input
  const [selectedMeal, setSelectedMeal] = useState(null); // For showing details in an iframe

  // Fetch data when the search term changes
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setMeals(data.meals || []));
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 text-gray-100">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md animate-fade-in">
          Explore Delicious Meals 
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-2">
          Search here 👇
        </p>
      </header>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Search meals (e.g., pasta, chicken)..."
            className="w-full p-3 rounded-lg text-gray-200 focus:ring-2 focus:ring-pink-400 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="meal-item bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedMeal(meal)}
            >
              {/* Meal Image */}
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover transition-opacity duration-300 hover:opacity-80"
              />
              {/* Meal Title */}
              <h3 className="text-center font-semibold text-gray-200 p-4 hover:text-pink-500 transition-colors">
                {meal.strMeal}
              </h3>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-300 text-lg">
            {searchTerm
              ? "❌ No meals found. Try searching for something else!"
              : "🍴 Start by searching for a delicious meal."}
          </p>
        )}
      </div>

      {/* Selected Meal Details */}
      {selectedMeal && (
        <div className="meal-details fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl relative animate-fade-in">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => setSelectedMeal(null)}
            >
              ✖️
            </button>

            {/* Meal Info */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-100 text-center mb-4">
                {selectedMeal.strMeal}
              </h2>

              {/* Video */}
              {selectedMeal.strYoutube && (
                <div className="w-full aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    title="Meal Instructions"
                    src={selectedMeal.strYoutube.replace("watch?v=", "embed/")}
                    className="w-full h-full rounded-lg"
                  />
                </div>
              )}

              {/* Instructions */}
              <p className="text-gray-300">{selectedMeal.strInstructions}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-300">
        <p className="text-sm">
          🍳 Made with love for foodies | Powered by{" "}
          <a
            href="https://www.themealdb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:underline"
          >
            TheMealDB API
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Meals;
