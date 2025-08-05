import React, { useState } from "react";

type Props = {
  onAdd: (user: { name: string; score: number }) => void;
};

const AddUserForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, score });
    setName("");
    setScore(0);
  };

  return (
    <form onSubmit={handleSubmit} className="AddUserForm">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Score"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
