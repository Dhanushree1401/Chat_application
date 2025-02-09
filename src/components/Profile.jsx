import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <img src={user.photoURL || "https://via.placeholder.com/100"} alt="Profile" className="w-20 h-20 rounded-full mx-auto" />
        <h2 className="text-2xl font-bold mt-3">{user.displayName}</h2>
        <p className="text-gray-600">{user.email}</p>
        <button onClick={() => { logout(); navigate("/login"); }} className="mt-4 bg-red-500 text-white py-2 px-6 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
