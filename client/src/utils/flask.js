export async function getRecommendations(userData) {
  try {
    const URL = import.meta.env.VITE_FLASK_ENV;
    const response = await fetch(`${URL}/get_recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
