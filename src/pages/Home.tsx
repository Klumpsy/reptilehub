import React, { useState, useEffect } from "react";

const Home: React.FunctionComponent = () => {
  const [reptiles, setReptiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState("1");
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = "https://api.inaturalist.org/v1";

    const params = new URLSearchParams({
      taxon_id: "26036",
      per_page: "30",
      page,
      order: "desc",
      order_by: "created_at",
      photos: "true",
    });

    const url = `${baseUrl}/observations?${params.toString()}`;
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReptiles(data.results);
        console.log(reptiles);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          error instanceof Error ? error.message : "something went wrong"
        );
        console.error("Error fetching reptile data:", error);
      });
  }, [page]);

  return (
    <div className="text-4xl">
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red">{error}</div>}
      {!isLoading && !error && (
        <div>
          {reptiles.map((reptile) => (
            <div>
              <img src={reptile.photos[0].url ?? ""} className="w-50 h-50" />
              <h2 key={reptile.id}>{reptile.species_guess}</h2>
            </div>
          ))}
        </div>
      )}
      <button
        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setPage(Math.floor(Math.random() * 10 + 1).toString())}
      >
        Next page
      </button>
    </div>
  );
};

export default Home;
