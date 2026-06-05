import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <h2>Please Login</h2>;
  }

  return (
    <div>
      <h1>Profile</h1>

      <p>Name: {user.name}</p>

      <p>Email: {user.email}</p>

      <p>Role: {user.role}</p>
    </div>
  );
}

export default Profile;
