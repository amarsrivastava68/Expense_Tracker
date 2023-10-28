import React, { useState } from "react";





const Expenseform = ({ addExpense }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Choose...");


  const handleSubmit = (e) => {
    alert('i will do noting now ')
  
  }
    // const StoreUrl = 'https://expance-tracker-3483a-default-rtdb.firebaseio.com/expenses.json';

    // const expense = {
    //   amount: parseFloat(amount),
    //   description,
    //   category,
    // };

//     fetch(StoreUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(expense),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to store expense details');
//         }
//         return response.json();
//       })
//       .then(responseData => {
//         console.log('Expense details stored successfully', responseData);
//         const id = responseData.name;
//         console.log(id);
//         dispatch(addExpense(expense));
//         addExpense({ id, ...expense });
//       })
//       .catch(error => {
//         console.log('Error updating user details', error);
//       });

//     setAmount("");
//     setDescription("");
//     setCategory("Choose...");
//   };


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <form className="mb-3">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </form>

        <form className="mb-3">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>

        <form >
          <label>Category:</label>
          <option
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Choose...</option>
            <option>Food</option>
            <option>Petrol</option>
            <option>Rent</option>
          </option>
        </form>
        <button variant="primary" type="submit" className="submit-btn">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Expenseform;
