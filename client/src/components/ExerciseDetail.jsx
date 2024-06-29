import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {
  FetchData,
  ExerciseOptions,
} from "../utils/fetchData";
import Detail from "../components/Detail";
import Loader from "../components/Loader";
const ExerciseDetail = () => {
  const [exerciseDetail, setExercisesDetail] = useState({});
  const [exercseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDBURL = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchURl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const ExerciseDetailData = await FetchData(
        `${exerciseDBURL}/exercises/exercise/${id}`,
        ExerciseOptions
      );
      setExercisesDetail(ExerciseDetailData);


      const targetMuscleExercisesData = await FetchData(
        `${exerciseDBURL}/exercises/target/${ExerciseDetailData.target}`,
        ExerciseOptions
      );
      setTargetMuscleExercises(targetMuscleExercisesData);
      const equipmentExercisesData = await FetchData(
        `${exerciseDBURL}/exercises/equipment/${ExerciseDetailData.equipment}`,
        ExerciseOptions
      );
      setEquipmentExercises(equipmentExercisesData);
    };
    fetchExercisesData();

    window.scrollTo(0, -250);
  }, [id]);

  useEffect(() => {
    let timer = setTimeout(() => setLoaded(false), 4000);
    return () => {
      setLoaded(true);
      clearTimeout(timer);
    };
  }, [id]);

  return (
    <div>
      {loaded ? (
        <Loader />
      ) : (
        <Box>
          <Detail exerciseDetail={exerciseDetail} />
          {/* <ExerciseVideos
            exerciseVideos={exerciseVideos}
            name={exerciseDetail.name}
          /> */}
          {/* <SimilarExercises
            targetMuscleExercises={targetMuscleExercises}
            equipmentExercises={equipmentExercises}
          /> */}
        </Box>
      )}
    </div>
  );
};

export default ExerciseDetail;
