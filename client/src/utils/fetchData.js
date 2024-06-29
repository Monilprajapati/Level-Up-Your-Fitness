export const ExerciseOptions = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
    headers: {
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
    },
  };
  
  export const FetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data);
    return data;
  };
  