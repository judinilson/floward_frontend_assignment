import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "../helpers";

// create slice

const name = "countries";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const countriesActions = { ...slice.actions, ...extraActions };
export const countriesReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    countries: {},
    country: {},
  };
}

function createExtraActions() {
  const baseUrl = process.env.REACT_APP_COUNTRY_API_URL;

  return {
    getAll: getAll(),
    getCountry: getCountry(),
  };

  function getAll() {
    return createAsyncThunk(
      `${name}/getAll`,
      async () => await fetchWrapper.get(`${baseUrl}/all`)
    );
  }
  function getCountry() {
    return createAsyncThunk(
      `${name}/getCountry`,
      async ({ alphaCode }) =>
        await fetchWrapper.get(`${baseUrl}/alpha/${alphaCode}`)
    );
  }
}

function createExtraReducers() {
  return {
    ...getAll(),
    ...getCountry(),
  };

  function getAll() {
    var { pending, fulfilled, rejected } = extraActions.getAll;
    return {
      [pending]: (state) => {
        state.countries = { loading: true };
      },
      [fulfilled]: (state, action) => {
        state.countries = action.payload;
      },
      [rejected]: (state, action) => {
        state.countries = { error: action.error };
      },
    };
  }
  function getCountry() {
    var { pending, fulfilled, rejected } = extraActions.getCountry;
    return {
      [pending]: (state) => {
        state.country = { loading: true };
      },
      [fulfilled]: (state, action) => {
        state.country = action.payload;
      },
      [rejected]: (state, action) => {
        state.country = { error: action.error };
      },
    };
  }
}
