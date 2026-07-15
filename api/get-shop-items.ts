import axios from "axios";

export async function GET(request: Request) {
  console.log("🟢 Backend triggered! URL is:", request.url);

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    // const response = axios.get("");
  } catch (error) {
    let errorStatus = 500;
    let errorMessage = "Internal Server Error";

    if (axios.isAxiosError(error)) {
      errorStatus = error.response?.status || 500;
      errorMessage = error.response?.data?.message || error.message;
      console.error(`❌ Backend Axios Error (${errorStatus}):`, errorMessage);
    } else if (error instanceof Error) {
      console.error(`Secure Server Log: ${error.message}`);
    } else {
      console.error("Secure Server Log: An unknown error type was caught.");
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: errorStatus,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
