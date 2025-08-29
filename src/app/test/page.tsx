"use client";

import { useUser } from "@/app/provider/currentUserProvider";

const TestUserProvider = () => {
  const { user, loading, error } = useUser();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Current User</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {user?.profile ? <p>Profile exists ✅</p> : <p>No profile ❌</p>}
    </div>
  );
};
export default TestUserProvider;
