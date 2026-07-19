import axios from "axios";
import type { LoaderFunctionArgs } from "react-router-dom";

const categories = ["shirts", "hoodies", "pants", "shoes", "jackets"];
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function loadProductPage({ request, params }: LoaderFunctionArgs) {
  const { category, productId } = params;

  if (!category)
    throw new Response("Missing category parameter", {
      status: 400,
      statusText: "Bad Request"
    });

  if (!categories.includes(category.toLowerCase()))
    throw new Response(
      `The category ${category} is not included in the store`,
      {
        status: 404,
        statusText: "Not Found"
      }
    );

  if (!productId)
    throw new Response("Missing productId parameter", {
      status: 400,
      statusText: "Bad Request"
    });

  if (!UUID_REGEX.test(productId)) {
    throw new Response("The product ID provided is invalid.", {
      status: 400,
      statusText: "Bad Request"
    });
  }

  try {
    const response = await axios.get("/api/get-product-page", {
      signal: request.signal,
      params: {
        category: category.toLowerCase(),
        productId: productId
      }
    });

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Fetch safely canceled mid-flight.");
      return;
    }
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || "Could not connect to server.";
      const errorStatus = error.response?.status || 500;
      console.error(errorMessage);
      const errorStatusText = error.response?.statusText || "Server Error";

      throw new Response(errorMessage, {
        status: errorStatus,
        statusText: errorStatusText
      });
    } else {
      console.error("An unexpected application error occurred.");
      throw new Response("An unexpected application error occurred.", {
        status: 500,
        statusText: "Internal Server Error"
      });
    }
  }
}
