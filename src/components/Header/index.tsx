import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <header className="bg-blue-600 p-4 shadow-md mb-[23vh]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">My Website</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="/dashboard"
                className="text-white text-lg hover:text-blue-300 transition-colors"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/articles"
                className="text-white text-lg hover:text-blue-300 transition-colors"
              >
                Articles
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-lg hover:text-blue-300 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
