import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
} from "./transactionAPI";

// initialize
const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    editing: {},
};

// create thunks
export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions",
    async () => {
        const transactions = await getTransactions();
        return transactions;
    }
);

export const createTransaction = createAsyncThunk(
    "transaction/createTransaction",
    async (data) => {
        const transaction = await addTransaction(data);
        return transaction;
    }
);

export const changeTransaction = createAsyncThunk(
    "transaction/changeTransaction",
    async ({ id, data }) => {
        const transaction = await editTransaction(id, data);
        return transaction;
    }
);

export const removeTransaction = createAsyncThunk(
    "transaction/removeTransaction",
    async (id) => {
        const transaction = await deleteTransaction(id);
        return transaction;
    }
);

// create slice
const TransactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        editActive:(state, action)=>{
            state.editing = action.payload;
        },
        editInactive:(state)=>{
            state.editing = {};
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = action.payload;
                state.isError = false;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error?.errorMessage;
                state.transactions = [];
            })
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error?.errorMessage;
            })
            .addCase(changeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const transactionId = state.transactions.findIndex(
                    (transaction) => transaction.id === action.payload.id
                );
                state.transactions[transactionId] = action.payload;
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error?.errorMessage;
            })
            .addCase(removeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions = state.transactions.filter(
                    (transaction) => transaction.id !== action.meta.arg
                );
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error?.errorMessage;
            });
    },
});

export default TransactionSlice.reducer;
export const {editActive, editInactive} = TransactionSlice.actions