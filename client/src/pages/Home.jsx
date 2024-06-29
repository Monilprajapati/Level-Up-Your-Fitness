import React, { useState } from 'react'
import Exercises from '../components/Exercises'

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  const [search, setSearch] = useState("");
  return (
    <div>
       <Exercises
        search={search}
        setExercises={setExercises}
        bodyPart={bodyPart}
        exercises={exercises}
      />
    </div>
  )
}

export default Home