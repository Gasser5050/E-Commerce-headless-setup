import axios from "axios";
import type { ActionFunctionArgs } from "react-router-dom";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const response = await axios.post("", "", {
      signal: request.signal
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Submission safely canceled mid-flight.");
      return;
    }
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || "Could not connect to server.";
      const errorStatus = error.response?.status || 500;
      console.error(errorMessage);

      return { error: errorMessage, status: errorStatus };
    }
    console.error("An unexpected application error occurred.");
    return { error: "An unexpected application error occurred.", status: 500 };
  }
}
