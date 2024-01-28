import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFieldValue, setSubmitted, submitForm } from "../store/formSlice"; // Error: 'setErrors' is defined but never used.
import { FormData } from "../store/formSlice";
import { useNavigate } from "react-router-dom";

interface FormProps {}

const Form: React.FC<FormProps> = () => {
  const formData = useSelector((state: any) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  const [isFocusedFirstName, setIsFocusedFirstName] = useState(false);
  const [isFocusedLastName, setIsFocusedLastName] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPhone, setIsFocusedPhone] = useState(false);

  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);

  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
  };

  const handleFocusPhone = () => {
    setIsFocusedPhone(true);
  };

  const handleFocusFirstName = () => {
    setIsFocusedFirstName(true);
  };

  const handleFocusLastName = () => {
    setIsFocusedLastName(true);
  };

  const handleChange = async (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    dispatch(
      setFieldValue({
        field: event.target.id as keyof FormData,
        value: event.target.value,
      })
    );
    validateForm(formData);
    console.log("on change event", formData);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    validateForm(formData);
    if (isValidFirstName && isValidLastName && isValidEmail && isValidPhone) {
      // Mark form as submitted
      dispatch(submitForm(formData));
      dispatch(setSubmitted(true));
      navigate("/thank-you");
      console.log(
        "Form not valid yet",
        isValidFirstName,
        isValidLastName,
        isValidEmail,
        isValidPhone,
        formData
      );
    }
  };

  const handleInputChange = () => {
    validateForm(formData);
  };

  const validateForm = (data: FormData) => {
    // Required fields
    if (!data.firstName) {
      setIsValidFirstName(false);
    } else {
      setIsValidFirstName(true);
    }
    if (!data.lastName) {
      setIsValidLastName(false);
    } else {
      setIsValidLastName(true);
    }
    if (!data.email && !emailRegex.test(formData.email)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
    if (!data.phone && !phoneRegex.test(formData.phone)) {
      setIsValidPhone(false);
    } else {
      setIsValidPhone(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      {/* Form fields with Tailwind CSS classes */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* First Name and Last Name */}
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onInput={handleInputChange}
            onChange={handleChange}
            onFocus={handleFocusFirstName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="mt-4 text-red-500">
            {isFocusedFirstName && !formData.firstName && "First is required"}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onInput={handleInputChange}
            onChange={handleChange}
            onFocus={handleFocusLastName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="mt-4 text-red-500">
            {isFocusedLastName && !formData.lastName && "Last name is required"}
          </p>
        </div>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onInput={handleInputChange}
            onChange={handleChange}
            onFocus={handleFocusEmail}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="mt-4 text-red-500">
            {isFocusedEmail && !formData.email && "Email name is required"}
          </p>
          <p className="mt-4 text-red-500">
            {isFocusedEmail &&
              !emailRegex.test(formData.email) &&
              "Invalid email format"}
          </p>
        </div>
        {/* Address */}
        <div className="mb-4">
          <label
            htmlFor="address1"
            className="block text-gray-700 font-bold mb-2"
          >
            Address 1
          </label>
          <input
            type="text"
            id="address1"
            value={formData.address1}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* City, State, Zip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 font-bold mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-gray-700 font-bold mb-2"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="zip" className="block text-gray-700 font-bold mb-2">
              Zip
            </label>
            <input
              type="text"
              id="zip"
              value={formData.zip}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone: {`(enter phone number in this format "###-###-####")`}
          </label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onInput={handleInputChange}
            onChange={handleChange}
            onFocus={handleFocusPhone}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="mt-4 text-red-500">
            {isFocusedPhone && !formData.phone && "Phone is required"}
          </p>
          <p className="mt-4 text-red-500">
            {isFocusedPhone &&
              !phoneRegex.test(formData.phone) &&
              "Invalid phone format"}
          </p>
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <label
            htmlFor="jobTitle"
            className="block text-gray-700 font-bold mb-2"
          >
            Job Title
          </label>
          <select
            id="jobTitle"
            value={formData.jobTitle}
            onChange={
              handleChange
            } /* Error: Type '(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void' is not assignable to type 'ChangeEventHandler<HTMLSelectElement>'. */
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="">Select Job Title</option>
            <option value="engineer-lead">Engineer - Lead</option>
            <option value="engineer-mid-level">Engineer - Mid Level</option>
            <option value="engineer-junion">Engineer - Junior</option>
            <option value="engineer-front-end-focused">
              Engineer - Front End Focused
            </option>
            <option value="engineer-backend-focused">
              Engineer - Backend Focused
            </option>
            <option value="engineer-full-stack">Engineer - Full Stack</option>
          </select>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label
            htmlFor="reason"
            className="block text-gray-700 font-bold mb-2"
          >
            Describe why you are a good fit for the job you are applying for.
          </label>
          <textarea
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={Object.keys(formErrors).length > 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
