import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/users/search?q=${search}`
      );
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (search.trim()) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [search]);

  return (
    <div className="w-[100vw] min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl">
        <div className="relative">
          <div className="bg-white rounded-2xl p-4 border-2 border-transparent focus-within:border-blue-300 transition-shadow focus-within:shadow-lg">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search For a User..."
                className="flex-grow text-gray-700 placeholder-gray-400 text-lg bg-transparent outline-none px-2 py-3"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          {user && user.users && user.users.length > 0 ? (
            <div className="space-y-3">
              {user.users.map((u) => (
                <div
                  key={`result-${u.id}`}
                  className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border"
                >
                  <img
                    src={u.image}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {u.firstName} {u.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{u.email}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 bg-white rounded-xl p-6 shadow-lg text-center text-gray-400 border">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
