import { createSlice, CreateSliceOptions, Slice, SliceCaseReducers } from "@reduxjs/toolkit";

export default <State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
    options: CreateSliceOptions<State, CaseReducers, Name>
): Slice<State, CaseReducers, Name> => {
    return createSlice(options);
};
