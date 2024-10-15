import {IUser} from "../../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "./api";

type IUserState = {
    users: IUser[]
    isLoading: boolean
    error: string
}

const initialState: IUserState = {
    users: [],
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        // usersFetching(state) {
        //     state.isLoading = true
        // },
        // usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
        //     state.isLoading = false
        //     state.error = ''
        //     state.users = action.payload
        // },
        // usersFetchingError(state, action: PayloadAction<string>) {
        //     state.isLoading = true
        //     state.error = action.payload
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending.type, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled.type, (state, action: PayloadAction<IUser[]>) => {
                state.isLoading = false;
                state.error = '';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
            // [fetchUsers.fulfilled.type]: (state: IUserState, action: PayloadAction<IUser[]>) => {
            // state.isLoading = false
            // state.error = ''
            // state.users = action.payload
    }
})

export default userSlice.reducer