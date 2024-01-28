import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  jobTitle: string;
  reason: string;
  submitted: boolean;
  errors: { [field: string]: string };
}

const initialState: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  address1: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  jobTitle: "",
  reason: "",
  submitted: false,
  errors: {},
};

interface SetFieldValueAction<K extends keyof FormData>
  extends PayloadAction<{ field: K; value: FormData[K] }> {}

interface SetSubmittedAction extends PayloadAction<boolean> {}

interface SetErrorsAction extends PayloadAction<{ [field: string]: string }> {}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state = action.payload as FormData;
    },
    setFieldValue: (state, action: SetFieldValueAction<keyof FormData>) => {
      state = { ...state, [action.payload.field]: action.payload.value };
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        errors: {
          ...state.errors,
          [action.payload.field]: "", // Clear the error for the changed field
        },
      };
    },
    setSubmitted: (state, action: SetSubmittedAction) => {
      state.submitted = action.payload;
    },
    submitForm: (state) => {
      // Optionally persist form data elsewhere if needed
      localStorage.setItem("formData", JSON.stringify(state));
      // Clear form state
      state = initialState;
    },
    setErrors: (state, action: SetErrorsAction) => {
      state.errors = action.payload;
    },
  },
});

export const {
  setFormData,
  submitForm,
  setFieldValue,
  setSubmitted,
  setErrors,
} = formSlice.actions;
export default formSlice.reducer;
