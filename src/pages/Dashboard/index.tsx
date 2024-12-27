import { useEffect, useState } from "react";
import Header from "../../components/Header";

interface atricleType {
  _id: string;
  title: string;
  content: string;
  author: any;
  status: string;
  favorites: boolean;
  history: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const Dashboard = () => {
  const [favorites, setFavorites] = useState<atricleType[]>([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchAllArticles();
  }, []);

  const fetchAllArticles = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId") as string);
      const response = await fetch(
        `http://localhost:5000/api/articles/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      console.log(data);
      const favorites = data.filter(
        (article: atricleType) => article.favorites
      );

      const history = data.filter((article: atricleType) => article.history);
      setFavorites(favorites);
      setHistory(history);
    } catch (error) {
      console.log("Error fetching articles", error);
    }
  };

  const fetchArticleDetails = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/articles/favorites/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch article details");
      }
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      }
      alert("Favourite added successfully");
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fetchHistoryArticleDetails = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/articles/history/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch article details");
      }
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      }
      alert("Favourite added successfully");
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-blue-500 text-2xl font-semibold">Dashboard</h2>

        <div className="mt-5">
          <h3 className="text-blue-500 text-xl font-medium">Favorites</h3>
          <ul className="list-disc pl-5">
            {favorites.map((article: atricleType) => (
              <li key={article._id} className="list-none p-2 rounded-md mt-2">
                {article.title}
                <button
                  className="ml-4 bg-blue-500 text-white p-2 rounded-md"
                  onClick={() => fetchHistoryArticleDetails(article._id)}
                >
                  AddTo History
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <h3 className="text-blue-500 text-xl font-medium">History</h3>
          <ul className="list-none pl-5">
            {history.map((article: any) => (
              <li key={article._id} className="mt-2">
                {article.title}
                <button
                  className="ml-4 bg-blue-500 text-white p-2 rounded-md"
                  onClick={() => fetchArticleDetails(article._id)}
                >
                  Add To Favorite
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
