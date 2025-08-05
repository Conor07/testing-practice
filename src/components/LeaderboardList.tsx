import React, { useState } from "react";

type User = {
  id: number;
  name: string;
  score: number;
  avatar?: string;
  date?: Date;
  badges?: string[];
};

type Props = {
  users: User[];
  sortBy: "score" | "name";
  search: string;
  onEdit: (id: number, updated: Partial<User>) => void;
  onRemove: (id: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  maxUsersPerPage: number;
};

const LeaderboardList: React.FC<Props> = ({
  users,
  sortBy,
  search,
  onEdit,
  onRemove,
  currentPage,
  setCurrentPage,
  maxUsersPerPage,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<
    Partial<User> & { badgesInput?: string }
  >({});

  return (
    <ul className="LeaderboardList" data-testid="leaderboard-list-root">
      {users
        .slice(
          (currentPage - 1) * maxUsersPerPage,
          currentPage * maxUsersPerPage
        )
        .map((user) => {
          const isTopScorer =
            user.score === Math.max(...users.map((u) => u.score));
          const matchesSearch = user.name
            .toLowerCase()
            .includes(search.toLowerCase());
          if (!matchesSearch) return null;

          const isEditing = editingId === user.id;

          return (
            <li
              key={user.id}
              className={`${isTopScorer ? "TopScorer" : ""}`}
              data-testid={`leaderboard-user-${user.id}`}
            >
              <div className="UserInfo" data-testid={`user-info-${user.id}`}>
                {user.avatar && !isEditing && (
                  <img
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    data-testid={`user-avatar-${user.id}`}
                  />
                )}
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={editValues.name ?? user.name}
                      onChange={(e) =>
                        setEditValues((vals) => ({
                          ...vals,
                          name: e.target.value,
                        }))
                      }
                      className="EditUserName"
                      data-testid={`edit-user-name-${user.id}`}
                    />
                    <input
                      type="number"
                      value={editValues.score ?? user.score}
                      onChange={(e) =>
                        setEditValues((vals) => ({
                          ...vals,
                          score: Number(e.target.value),
                        }))
                      }
                      className="EditUserScore"
                      data-testid={`edit-user-score-${user.id}`}
                    />
                    <input
                      type="text"
                      value={editValues.avatar ?? user.avatar ?? ""}
                      onChange={(e) =>
                        setEditValues((vals) => ({
                          ...vals,
                          avatar: e.target.value,
                        }))
                      }
                      className="EditUserAvatar"
                      placeholder="Avatar URL"
                      data-testid={`edit-user-avatar-${user.id}`}
                    />
                    <input
                      type="text"
                      value={
                        editValues.badgesInput ??
                        (user.badges ? user.badges.join(", ") : "")
                      }
                      onChange={(e) =>
                        setEditValues((vals) => ({
                          ...vals,
                          badgesInput: e.target.value,
                        }))
                      }
                      className="EditUserBadges"
                      placeholder="Badges (comma separated)"
                      data-testid={`edit-user-badges-${user.id}`}
                    />
                  </>
                ) : (
                  <>
                    <span
                      className="UserName"
                      data-testid={`user-name-${user.id}`}
                    >
                      {user.name}
                    </span>
                    <span
                      className="UserScore"
                      data-testid={`user-score-${user.id}`}
                    >
                      {user.score}
                    </span>
                    {user.badges && user.badges.length > 0 && (
                      <span
                        className="UserBadges"
                        data-testid={`user-badges-${user.id}`}
                      >
                        {user.badges.join(", ")}
                      </span>
                    )}
                    <span
                      className="UserDate"
                      data-testid={`user-date-${user.id}`}
                    >
                      {user.date ? user.date.toLocaleDateString() : "N/A"}
                    </span>
                  </>
                )}
              </div>
              <div
                className="UserActions"
                data-testid={`user-actions-${user.id}`}
              >
                {isEditing ? (
                  <>
                    <button
                      onClick={() => {
                        const updated = { ...editValues };
                        if (editValues.badgesInput !== undefined) {
                          updated.badges = editValues.badgesInput
                            .split(",")
                            .map((b) => b.trim())
                            .filter((b) => b);
                          delete updated.badgesInput;
                        }
                        onEdit(user.id, updated);
                        setEditingId(null);
                        setEditValues({});
                      }}
                      className="SaveEditBtn"
                      data-testid={`save-edit-btn-${user.id}`}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditValues({});
                      }}
                      className="CancelEditBtn"
                      data-testid={`cancel-edit-btn-${user.id}`}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(user.id);
                        setEditValues({
                          name: user.name,
                          score: user.score,
                          avatar: user.avatar,
                          badges: user.badges,
                        });
                      }}
                      className="EditBtn"
                      disabled={editingId !== null}
                      data-testid={`edit-btn-${user.id}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onRemove(user.id)}
                      className="RemoveBtn"
                      //   disabled={editingId !== null}
                      data-testid={`remove-btn-${user.id}`}
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default LeaderboardList;
