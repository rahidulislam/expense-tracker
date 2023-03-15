import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../features/transaction/transactionSlice";
export default function Form() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const dispatch = useDispatch();
    const {isLoading, isError, errorMessage} = useSelector(state=>state.transaction)
    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(
            createTransaction({
                name,
                type,
                amount:Number(amount),
            })
        );
    };
    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={handleCreate}>
                <div className="form-group">
                    <label for="transaction_name">Name</label>
                    <input
                        type="text"
                        name="transaction_name"
                        required
                        placeholder="My Salary"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label for="transaction_type">Type</label>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="income"
                            name="transaction_type"
                            checked={type === "income"}
                            onChange={(e) => setType("income")}
                        />
                        <label for="transaction_type">Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="transaction_type"
                            placeholder="Expense"
                            checked={type === "expense"}
                            onChange={(e) => setType("expense")}
                        />
                        <label for="transaction_type">Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label for="transaction_amount">Amount</label>
                    <input
                        type="number"
                        placeholder="300"
                        name="transaction_amount"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button className="btn" type="submit" disabled={isLoading}>Add Transaction</button>
                {!isLoading && isError && <p className="error">{errorMessage}</p>}
            </form>
            <button className="btn cancel_edit">Cancel Edit</button>
        </div>
    );
}
