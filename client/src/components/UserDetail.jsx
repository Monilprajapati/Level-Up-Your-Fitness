// UserDetailsForm.js
import React, { useState } from "react";
import InputBox from "./InputBox";
import Dropdown from "./InputDropdown";
import SuggestionsComponent from "./SuggestionsComponent";
import { getRecommendations } from "../utils/flask";
import { Blocks } from "react-loader-spinner";

const UserDetailsForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    veg_or_nonveg: "",
    disease: "",
    foodtype: "",
    allergics: "",
    region: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionData, setSuggestionData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSuggestion = () => {
    const { email, password, ...dataToSend } = formData;
    const data = dataToSend;
    console.log(data);
    setLoading(true);
    getRecommendations(data)
      .then((recommendations) => {
        console.log(recommendations);
        setSuggestionData(recommendations);
        setShowSuggestions(true);
        setLoading(false);
        // Here, you can update your frontend with the recommendations
      })
      .catch((error) => {
        console.error("Failed to get recommendations:", error);
      });
  };

  const handleSubmit = () => {
    setIsEditing(!isEditing);
    console.log(formData);
  };

  const roleOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const vegNonVegOptions = [
    { value: "veg", label: "Veg" },
    { value: "non-veg", label: "Non-Veg" },
  ];

  const diseaseOptions = [
    { value: "diabetes", label: "Diabetes" },
    { value: "hypertension", label: "Hypertension" },
    { value: "heart", label: "Heart" },
    { value: "kidney", label: "Kidney" },
    { value: "liver", label: "Liver" },
  ];

  const allergiesOptions = [
    { value: "lactose", label: "Lactose" },
    { value: "peanut", label: "Peanut" },
    { value: "seafood", label: "Seafood" },
    { value: "soy", label: "Soy" },
    { value: "wheat", label: "Wheat" },
  ];

  const regionOptions = [
    { value: "india", label: "India" },
    { value: "usa", label: "USA" },
    { value: "uk", label: "UK" },
    { value: "australia", label: "Australia" },
    { value: "canada", label: "Canada" },
  ];

  const foodOptions = [
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
  ];

  return (
    <div className="flex justify-center flex-col lg:flex-row w-full pt-4 px-10">
      <div className="flex flex-col ld:w-1/2 lg:px-10 items-center justify-center bg-gray-100">
        <h2 className="text-4xl mt-5 font-bold mb-6 text-center">
          User Details
        </h2>

        <div className="flex mt-4 flex-row gap-3 justify-center w-full">
          <div className="flex flex-row gap-3 justify-center w-full">
            <InputBox
              disable={!isEditing}
              name="email"
              type="email"
              id="email"
              value={formData.email}
              placeholder="Email"
              icon="email"
              handleChange={handleChange}
              className="w-[100vh]"
            />
          </div>
          <InputBox
            disable={!isEditing}
            name="password"
            type="password"
            id="password"
            value={formData.password}
            placeholder="Password"
            icon="password"
            handleChange={handleChange}
          />
        </div>

        <InputBox
          disable={!isEditing}
          name="age"
          type="number"
          id="age"
          value={formData.age}
          placeholder="Age"
          icon="age"
          handleChange={handleChange}
        />

        <div className="flex w-full gap-2 flex-row">
          <InputBox
            disable={!isEditing}
            name="weight"
            type="number"
            id="weight"
            value={formData.weight}
            placeholder="Weight (kg)"
            icon="weight"
            handleChange={handleChange}
          />
          <InputBox
            disable={!isEditing}
            name="height"
            type="number"
            id="height"
            value={formData.height}
            placeholder="Height (m)"
            icon="height"
            handleChange={handleChange}
          />
        </div>
        <div className="flex w-full gap-2">
          <Dropdown
            disable={!isEditing}
            id="region"
            name="region"
            value={formData.region}
            options={regionOptions}
            handleChange={handleChange}
          />
          <Dropdown
            disable={!isEditing}
            id="foodtype"
            name="foodtype"
            value={formData.foodtype}
            options={foodOptions}
            handleChange={handleChange}
          />
        </div>
        <div className="flex w-full flex-row gap-2">
          <Dropdown
            disable={!isEditing}
            id="gender"
            name="gender"
            value={formData.gender}
            options={roleOptions}
            handleChange={handleChange}
          />
          <Dropdown
            disable={!isEditing}
            id="veg_or_nonveg"
            name="veg_or_nonveg"
            value={formData.veg_or_nonveg}
            options={vegNonVegOptions}
            handleChange={handleChange}
          />
        </div>
        <Dropdown
          disable={!isEditing}
          id="disease"
          name="disease"
          value={formData.disease}
          options={diseaseOptions}
          handleChange={handleChange}
        />
        <Dropdown
          disable={!isEditing}
          id="allergics"
          name="allergics"
          value={formData.allergics}
          options={allergiesOptions}
          handleChange={handleChange}
        />
        {isEditing ? (
          <button onClick={handleSubmit} className="btn-dark mt-5 center">
            Save
          </button>
        ) : (
          <button onClick={handleSubmit} className="btn-dark mt-5 center">
            Edit
          </button>
        )}
      </div>
      <div className="lg:w-1/2">
        <h1>Get your personalized diet plan</h1>
        <button
          className="btn-dark mt-5 center"
          onClick={() => handleSuggestion()}
        >
          Get Diet Plan
        </button>
        {loading ? (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <Blocks
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
          </div>
        ) : (
          showSuggestions && <SuggestionsComponent data={suggestionData} />
        )}
      </div>
    </div>
  );
};

export default UserDetailsForm;
