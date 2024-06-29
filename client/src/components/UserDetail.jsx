// UserDetailsForm.js
import React, { useState } from "react";
import InputBox from "./InputBox";

const UserDetailsForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        weight: "",
        height: "",
        goals: "",
        health: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="flex justify-center items-center pt-4">

            <div className="flex flex-col items-center justify-center bg-gray-100 w-[70vh]">

                <h2 className="text-3xl font-bold mb-6 text-center">User Details</h2>

                <div className="flex flex-row gap-3 justify-center w-full">

                    <InputBox
                        name="email"
                        type="email"
                        id="email"
                        value={formData.email}
                        placeholder="Email"
                        icon="email"
                        handleChange={handleChange}
                        className='w-[100vh]'
                    />

                </div>

                <div className="flex flex-row gap-3 justify-center w-full">

                    <InputBox
                        name="password"
                        type="password"
                        id="password"
                        value={formData.password}
                        placeholder="Password"
                        icon="password"
                        handleChange={handleChange}
                    />
                    <InputBox
                        name="Confirm Password"
                        type="password"
                        id="password"
                        value={formData.password}
                        placeholder="Password"
                        icon="password"
                        handleChange={handleChange}
                    />
                </div>

                <InputBox
                    name="age"
                    type="number"
                    id="age"
                    value={formData.age}
                    placeholder="Age"
                    icon="age"
                    handleChange={handleChange}
                />
                <InputBox
                    name="gender"
                    type="text"
                    id="gender"
                    value={formData.gender}
                    placeholder="Gender"
                    icon="gender"
                    handleChange={handleChange}
                />
                <InputBox
                    name="weight"
                    type="number"
                    id="weight"
                    value={formData.weight}
                    placeholder="Weight (kg)"
                    icon="weight"
                    handleChange={handleChange}
                />
                <InputBox
                    name="height"
                    type="number"
                    id="height"
                    value={formData.height}
                    placeholder="Height (cm)"
                    icon="height"
                    handleChange={handleChange}
                />
                <InputBox
                    name="goals"
                    type="text"
                    id="goals"
                    value={formData.goals}
                    placeholder="Fitness Goals"
                    icon="goals"
                    handleChange={handleChange}
                />
                <InputBox
                    name="health"
                    type="text"
                    id="health"
                    value={formData.health}
                    placeholder="Health Conditions"
                    icon="health"
                    handleChange={handleChange}
                />
                <button
                    type="submit"
                    className="py-3 px-4 bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 transition-colors"
                >
                    Submit
                </button>

            </div>

        </div>

    );
};

export default UserDetailsForm;
