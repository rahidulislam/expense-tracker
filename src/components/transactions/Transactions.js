import React, {Fragment, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
    const {transactions, isLoading, isError, errorMessage} = useSelector(state=>state.transaction)
    const dispatch = useDispatch();

    // load initial data from server
    useEffect(()=>{
        dispatch(fetchTransactions())
    }, [dispatch])

    // show data from state
    let content = null;
    if (isLoading) content = <p>Loading...</p>
    if (!isLoading && isError) content = <p>{errorMessage}</p>
    if (!isLoading &&!isError && transactions.length === 0) content = <p>No Transactions</p>
    if (!isLoading && !isError && transactions.length >0 ){
        content = transactions.map(transaction=><Transaction key={transaction.id} transaction={transaction}/>)
    }
    return (
        <Fragment>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </Fragment>
    );
}
