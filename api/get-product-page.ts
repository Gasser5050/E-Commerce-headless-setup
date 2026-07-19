import axios from "axios";
import type { Product } from "../src/types/Types.js";

const categories = ["shirts", "hoodies", "pants", "shoes", "jackets"];
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(request: Request) {
  console.log("🟢 Backend triggered! URL is:", request.url);

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const productId = searchParams.get("productId");

  if (!category)
    return new Response(
      JSON.stringify({ error: "Missing category parameter" }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: { "Content-Type": "application/json" }
      }
    );

  if (!categories.includes(category)) {
    return new Response(
      JSON.stringify({
        error: `The category ${category} is not included in the store`
      }),
      {
        status: 404,
        statusText: "Not Found",
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  if (!productId)
    return new Response(
      JSON.stringify({ error: "Missing productId parameter" }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: { "Content-Type": "application/json" }
      }
    );

  if (!UUID_REGEX.test(productId)) {
    return new Response(
      JSON.stringify({ error: "The product ID provided is invalid." }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    const projectID = process.env.SANITY_PROJECT_ID;
    const dataset = process.env.SANITY_DATASET || "production";
    const sanityURL = `https://${projectID}.api.sanity.io/v2026-07-01/data/query/${dataset}`;

    const query = `*[_type == "product" && _id == $productId && category == $category && !isArchived][0]`;

    const response = await axios.get(sanityURL, {
      params: {
        query: query,
        $productId: `"${productId}"`,
        $category: `"${category}"`
      }
    });

    const product: Product = response.data.result;

    const colorVariants = product.colorVariants?.map(variant => {
      const variantImages = variant?.variantImages.map(img => {
        const imgRef = img.asset?._ref;
        let url = "";

        if (imgRef) {
          const [, id, dimensions, extension] = imgRef.split("-");

          url = `https://cdn.sanity.io/images/${projectID}/${dataset}/${id}-${dimensions}.${extension}?w=600&auto=format&q=75`;
        }

        return { ...img, url };
      });

      return { ...variant, variantImages };
    });

    return new Response(JSON.stringify({ ...product, colorVariants }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    let errorStatus = 500;
    let errorMessage = "Internal Server Error";
    let errorStatusText = "Bad Gateway";

    if (axios.isAxiosError(error)) {
      errorStatus = error.response?.status || 500;
      errorMessage = error.response?.data?.message || error.message;
      errorStatusText = error.response?.statusText || "Bad Gateway";
      console.error(`❌ Backend Axios Error (${errorStatus}):`, errorMessage);
    } else if (error instanceof Error) {
      console.error(`Secure Server Log: ${error.message}`);
    } else {
      console.error("Secure Server Log: An unknown error type was caught.");
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: errorStatus,
      statusText: errorStatusText,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
