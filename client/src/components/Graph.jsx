import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AiOutlineEye } from 'react-icons/ai';

const Graph = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let temp = [
            {
                name: 'Calories Intake',
                value: 2000,
                unit: 'kcal',
                goal: 2500,
                goalUnit: 'kcal',
            },
            {
                name: 'Sleep',
                value: 8,
                unit: 'hrs',
                goal: 8,
                goalUnit: 'hrs',
            },
            {
                name: 'Steps',
                value: 50,
                unit: 'steps',
                goal: 10000,
                goalUnit: 'steps',
            },
            {
                name: 'Water',
                value: 2000,
                unit: 'ml',
                goal: 3000,
                goalUnit: 'ml',
            },
            {
                name: 'Weight',
                value: 75,
                unit: 'kg',
                goal: 70,
                goalUnit: 'kg',
            },
            {
                name: 'Workout',
                value: 2,
                unit: 'days',
                goal: 6,
                goalUnit: 'days',
            },
        ];
        setData(temp);
        console.log(temp);
    };

    function simplifyFraction(numerator, denominator) {
        function gcd(a, b) {
            return b === 0 ? a : gcd(b, a % b);
        }
        const commonDivisor = gcd(numerator, denominator);
        const simplifiedNumerator = numerator / commonDivisor;
        const simplifiedDenominator = denominator / commonDivisor;
        return [simplifiedNumerator, simplifiedDenominator];
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data?.length > 0 && data.map((item, index) => (
                <div
                    key={index}
                    className="bg-[#ddf2fe] shadow-lg rounded-lg p-4 flex flex-col items-center transform transition-transform duration-300 hover:-translate-y-2"
                >
                    <div className="relative flex items-center justify-center mb-2">
                        <CircularProgress
                            color="inherit"
                            variant="determinate"
                            value={(item.value / item.goal) * 100}
                            size={80}
                        />
                        <span className="absolute text-gray-800 font-bold">
                            {simplifyFraction(item.value, item.goal)[0]} / {simplifyFraction(item.value, item.goal)[1]}
                        </span>
                    </div>
                    <div className="flex flex-row mb-4 gap-4 w-full">
                        <div className="bg-white shadow-md rounded-lg p-2 w-full flex flex-col items-center">
                            <div className="text-xs font-bold">{item.name}</div>
                            <div className="text-sm text-gray-800">{item.value} {item.unit}</div>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-2 w-full flex flex-col items-center">
                            <div className="text-xs font-bold">Target</div>
                            <div className="text-sm text-gray-800">{item.goal} {item.goalUnit}</div>
                        </div>
                    </div>

                     
                </div>
            ))}
        </div>
    );
};

export default Graph;
