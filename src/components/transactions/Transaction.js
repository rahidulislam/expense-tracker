import React from "react";
import editImage from "../../assets/images/edit.svg";
import deleteImage from "../../assets/images/delete.svg";
import { useDispatch } from "react-redux";
import { editActive, removeTransaction } from "../../features/transaction/transactionSlice";
export default function Transaction({ transaction }) {
    const { name, amount, type, id } = transaction || {};
    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(editActive(transaction));
    };
    const handleDelete = () => {
        dispatch(removeTransaction(id))
    }
    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {amount}</p>
                <button className="link" onClick={handleEdit}>
                    <img className="icon" src={editImage} alt="edit" />
                </button>
                <button className="link" onClick={handleDelete}>
                    <img className="icon" src={deleteImage} alt="delete" />
                </button>
            </div>
        </li>
    );
}
