import React, { useState } from "react";
import { useSelector } from "react-redux";
const EditExpenseForm = ({ expense, onEdit }) => {
  const [editedExpense, setEditedExpense] = useState({ ...expense });

  const userId = useSelector((state) => state.auth.userId);

  const extracted = userId?.replace("@", "").replace(".", "");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense({ ...editedExpense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editUrl = `https://authentication-66cfd-default-rtdb.firebaseio.com/expenses/${extracted}/${editedExpense.id}.json`;

    fetch(editUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedExpense),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit expense details");
        }
        return response.json();
      })
      .then(() => {
        console.log("Expense details edited successfully");
        onEdit(editedExpense);
      })
      .catch((error) => {
        console.log("Error editing expense details", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={editedExpense.amount}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={editedExpense.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={editedExpense.category}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditExpenseForm;
