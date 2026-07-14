import axios from "axios";

export async function POST(request: Request) {
  console.log("🟢 Backend triggered! URL is:", request.url);

  try {
    return new Response(JSON.stringify(""), {
      status: 200,
      headers: {
        "Content-type": "application/json"
      }
    });
  } catch (error) {
    let errorStatus = 500;
    let errorMessage = "Internal Server Error";

    if (axios.isAxiosError(error)) {
      errorStatus = error.response?.status || 500;
      errorMessage = error.response?.data?.message || error.message;
      console.error(`❌ Backend Axios Error (${errorStatus}):`, errorMessage);
    } else if (error instanceof Error) {
      console.error(`Secure Server Log: ${error.message}`);
      errorMessage = "Invalid JSON payload sent to server.";
      errorStatus = 400;
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
