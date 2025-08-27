import axios from "axios";

const testEndpoint = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:4200/profile/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("ACTUAL API RESPONSE:", response.data);
  } catch (error) {
    console.error("API ERROR:", error);
  }
};
