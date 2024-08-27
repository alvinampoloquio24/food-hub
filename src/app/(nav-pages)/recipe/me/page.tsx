// ./src/app/(nav-pages)/recipe/me/page.tsx

import { Suspense } from "react";

// Define the shape of your data
interface APIData {
  id: number;
  name: string;
  // ... other properties
}

async function getData(): Promise<APIData> {
  const res = await fetch("http://localhost:3001/getRecipesPages?page=1", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function RecipeMePage() {
  const data = await getData();

  return (
    <div>
      <h1>My Recipes</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <p>Data from API: {data.name}</p>
      </Suspense>
    </div>
  );
}
