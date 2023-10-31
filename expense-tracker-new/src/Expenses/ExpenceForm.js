import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import './ExpenseForm.css';
import authReducer from "../Store/authReducer";
import { useDispatch } from 'react-redux';
import { addExpenseS } from '../Store/ExpenseReducer'; 
import { useSelector } from "react-redux";
const ExpenceForm = ({ addExpense }) => {
  const userId = useSelector((state) => state.auth.userId);

  const extracted =  userId?.replace('@', '').replace('.', '');
  console.log(userId)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  console.log(isLoggedIn)
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Choose...");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const StoreUrl = `https://authentication-66cfd-default-rtdb.firebaseio.com/expenses/${extracted}.json`;

    const expense = {
      amount: parseFloat(amount),
      description,
      category,
    };
console.log(expense)
    fetch(StoreUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to store expense details');
        }
        return response.json();
      })
      .then(responseData => {
        // console.log('response data is ' , responseData)
        // console.log('Expense details stored successfully', responseData);
        const id = responseData.name;
        console.log('this is id - ' , id);
        console.log('this is expense object '  , expense)
        console.log(addExpenseS)
        dispatch(addExpenseS({ id, ...expense }));
        
       // addExpense({ id, ...expense });
      })
      .catch(error => {
        console.log('Error updating user details', error);
      });

    setAmount("");
    setDescription("");
    setCategory("Choose...");
  };


  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            value={description}
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Category:</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Choose...</option>
            <option>Food</option>
            <option>Petrol</option>
            <option>Rent</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Add Expense
        </Button>
      </Form>
    </div>
  );
};

export default ExpenceForm;
