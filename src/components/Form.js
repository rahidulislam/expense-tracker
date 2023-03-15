import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    changeTransaction,
    createTransaction,
} from "../features/transaction/transactionSlice";
export default function Form() {
    const dispatch = useDispatch();
    const { isLoading, isError, errorMessage } = useSelector(
        (state) => state.transaction
    );
    const {editing} = useSelector(state=>state.transaction) || {}
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [editMode, setEditMode] = useState(false);
    console.log(editMode)
    const resetForm = () => {
        setName("");
        setType("");
        setAmount("");
    };
    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(
            createTransaction({
                name,
                type,
                amount: Number(amount),
            })
        );
        resetForm();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(
            changeTransaction({
                id: editing.id,
                data: {
                    name,
                    type,
                    amount: Number(amount),
                },
            })
        );
        setEditMode(false);
        resetForm();
    };
    const cancelEditMode = () => {
        setEditMode(false);
        resetForm();
    };

    useEffect(() => {
        const { id, name, type, amount } = editing || {};

        if (id) {
            setEditMode(true);
            setName(name);
            setAmount(amount);
            setType(type);
        } else {
            setEditMode(false);
            resetForm();
        }
    }, [editing]);

    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={editMode ? handleUpdate : handleCreate}>
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

                <button className="btn" type="submit" disabled={isLoading}>
                    {editMode ? "Update Transaction" : "Add Transaction"}
                </button>
                {!isLoading && isError && (
                    <p className="error">{errorMessage}</p>
                )}
            </form>
            {editMode && 
                <button className="btn cancel_edit" onClick={cancelEditMode}>
                    Cancel Edit
                </button>
            }
        </div>
    );
}
