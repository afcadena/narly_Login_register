import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContex';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log('User object:', user); // Verifica el contenido del objeto user

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-blue-600 text-white p-6 rounded-md shadow-md text-center">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.username || 'User'}!
        </h1>
      </div>
    </div>
  );
}

export default ProfilePage;
