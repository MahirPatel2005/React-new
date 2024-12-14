import React, { useEffect, useState } from "react";

const Potter = () => {
  const [data, setData] = useState([]); // To store fetched data
  const [endpoint, setEndpoint] = useState("characters"); // Default endpoint
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const BASE_URL = "https://potterapi-fedeperin.vercel.app/en"; // API Base URL

  // Fetch data from the selected endpoint
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]); // Re-fetch data when the endpoint changes

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-10 text-purple-500 animate-pulse">
           Harry Potter API Explorer
        </h1>

        {/* Dropdown Selector */}
        <div className="flex justify-center mb-8">
          <select
            className="p-4 rounded-lg bg-purple-600 text-white focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-300"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          >
            <option value="books">Books</option>
            <option value="characters">Characters</option>
            <option value="houses">Houses</option>
            <option value="spells">Spells</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-purple-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <p className="text-center text-red-600 mt-6 text-lg font-semibold">
            ⚠️ Error: {error}
          </p>
        )}

        {/* Display Data */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-400 text-center uppercase">
            {endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.length > 0 &&
              data.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-purple-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300"
                >
                  {/* Dynamic Content */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name || "Unnamed"}
                      className="w-full h-auto object-cover rounded-lg mb-4"
                    />
                  )}

                  {/* Only display book details if the endpoint is 'books' */}
                  {endpoint === "books" && (
                    <>
                      {item.title && (
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Title: {item.title}
                        </h3>
                      )}
                      {item.originalTitle && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Original Title:</span> {item.originalTitle}
                        </p>
                      )}
                      {item.releaseDate && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Release Date:</span> {item.releaseDate}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-gray-200 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Description:</span> {item.description}
                        </p>
                      )}
                      {item.pages && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Pages:</span> {item.pages}
                        </p>
                      )}
                      {item.cover && (
                        <img
                          src={item.cover}
                          alt={item.title || "Book Cover"}
                          className="w-full h-auto object-contain rounded-lg mb-4"
                        />
                      )}
                    </>
                  )}

                  {/* Display character details if the endpoint is 'characters' */}
                  {endpoint === "characters" && (
                    <>
                      {item.nickname && (
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Name: {item.nickname}
                        </h3>
                      )}
                      {item.hogwartsHouse && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Hogwarts House:</span> {item.hogwartsHouse}
                        </p>
                      )}
                      {item.birthdate && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Birthdate:</span> {item.birthdate}
                        </p>
                      )}
                      {item.interpretedBy && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Interpreted By:</span> {item.interpretedBy}
                        </p>
                      )}
                    </>
                  )}

                  {/* Display house details if the endpoint is 'houses' */}
                  {endpoint === "houses" && (
                    <>

                      {item.house && (
                        <h3 className="text-xl font-semibold text-white mb-2">
                          House: {item.house}
                        </h3>
                      )}
                      {item.emoji && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">symbol</span> {item.emoji}
                        </p>
                      )}
                      {item.founder && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Founder:</span> {item.founder}
                        </p>
                      )}
                      {item.animal && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">animal:</span> {item.animal}
                        </p>
                      )}
                      {item.colors && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Colors:</span> {item.colors.join(', ')}
                        </p>
                      )}
                      
                    </>
                  )}
                  {endpoint === "spells" &&
                    <>
                    {item.spell && (
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Spell: {item.spell}
                      </h3>
                    )}
                    {item.use && (
                      <p className="text-gray-300 text-sm mt-2">
                        <span className="font-bold text-yellow-400">Usage:</span> {item.use}
                      </p>
                    )}
                    </>
                    }
                </div>
              ))}
          </div>

          {!loading && data.length === 0 && (
            <p className="text-center text-gray-400 mt-6">
              No data available for the selected category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Potter;
