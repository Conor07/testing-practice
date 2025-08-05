import React, { useState } from "react";

import LeaderboardList from "../components/LeaderboardList";
import AddUserForm from "../components/AddUserForm";

type LeaderboardProps = {
  initialUsers?: User[];
};

type User = {
  id: number;
  name: string;
  score: number;
  avatar?: string;
  date?: Date;
  badges?: string[];
};

const MAX_USERS_PER_PAGE = 10;

const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: "Alice",
    score: 120,
    avatar: "",
    date: new Date(),
    badges: [],
  },
  {
    id: 2,
    name: "Bob",
    score: 100,
    avatar: "",
    date: new Date(),
    badges: [],
  },
  {
    id: 3,
    name: "Charlie",
    score: 80,
    avatar: "",
    date: new Date(),
    badges: [],
  },
  {
    id: 4,
    name: "Diana",
    score: 60,
    avatar: "",
    date: new Date(),
    badges: [],
  },
  {
    id: 5,
    name: "Ethan",
    score: 40,
    avatar: "",
    date: new Date(),
    badges: [],
  },
  {
    id: 6,
    name: "Fiona",
    score: 20,
    avatar: "",
    date: new Date(),
    badges: [],
  },
  {
    id: 7,
    name: "George",
    score: 10,
    avatar: "",
    date: new Date(),
    badges: [],
  },
  {
    id: 8,
    name: "Hannah",
    score: 5,
    avatar: "",
    date: new Date(),
    badges: [],
  },
  {
    id: 9,
    name: "Ian",
    score: 3,
    avatar: "",
    date: new Date(),
    badges: [],
  },
  {
    id: 10,
    name: "Jane",
    score: 1,
    avatar: "",
    date: new Date(),
    badges: [],
  },
  {
    id: 11,
    name: "Kyle",
    score: 0,
    avatar: "",
    date: new Date(),
    badges: [],
  },
];

const Leaderboard: React.FC<LeaderboardProps> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers ?? INITIAL_USERS);
  const [sortBy, setSortBy] = useState<"score" | "name">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleAddUser = (user: { name: string; score: number }) => {
    setUsers((prev) => [
      ...prev,
      { id: Date.now(), ...user, avatar: "", date: new Date(), badges: [] },
    ]);
  };

  const handleEditUser = (id: number, updated: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              ...updated,
              badges: updated.badges ?? user.badges,
              avatar: updated.avatar ?? user.avatar,
              name: updated.name ?? user.name,
              score: updated.score ?? user.score,
            }
          : user
      )
    );
  };

  const handleRemoveUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const sortUsers = (sortType: "score" | "name", order: "asc" | "desc") => {
    setUsers((prev) =>
      [...prev].sort((a, b) => {
        let result = 0;
        if (sortType === "score") {
          result = a.score - b.score;
        } else {
          result = a.name.localeCompare(b.name);
        }
        return order === "asc" ? result : -result;
      })
    );
  };

  // Toggle sort order when clicking the same sort type, otherwise set to descending by default
  const handleSortChange = (newSort: "score" | "name") => {
    if (sortBy === newSort) {
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newOrder);
      sortUsers(newSort, newOrder);
    } else {
      setSortBy(newSort);
      setSortOrder("desc");
      sortUsers(newSort, "desc");
    }
  };

  return (
    <div
      className={
        "LeaderboardPage Page" + (theme === "dark" ? " DarkTheme" : "")
      }
    >
      <h1>Leaderboard</h1>
      <div className="ThemeSwitcher">
        <button
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>

      <AddUserForm onAdd={handleAddUser} />
      <div className="SortControls">
        <button
          data-testid="sort-by-score"
          onClick={() => handleSortChange("score")}
        >
          Sort by Score ({sortBy === "score" ? sortOrder : "desc"})
        </button>
        <button
          data-testid="sort-by-name"
          onClick={() => handleSortChange("name")}
        >
          Sort by Name ({sortBy === "name" ? sortOrder : "desc"})
        </button>
      </div>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="SearchInput"
      />

      <LeaderboardList
        users={users}
        sortBy={sortBy}
        search={search}
        onEdit={handleEditUser}
        onRemove={handleRemoveUser}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxUsersPerPage={MAX_USERS_PER_PAGE}
      />

      <div className="PaginationControls">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(users.length / MAX_USERS_PER_PAGE)
                ? prev + 1
                : prev
            )
          }
          disabled={currentPage >= Math.ceil(users.length / MAX_USERS_PER_PAGE)}
        >
          Next
        </button>
        <span>
          Page {currentPage} of{" "}
          {Math.max(1, Math.ceil(users.length / MAX_USERS_PER_PAGE))}
        </span>
      </div>
    </div>
  );
};

export default Leaderboard;
