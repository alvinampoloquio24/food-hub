import * as dotenv from "dotenv";

dotenv.config();
const api = process.env.NEXT_PUBLIC_LOCALHOST;
const getPoster = {
  get: async () => {
    try {
      // const api = "http://localhost:3001";
      // const api = " https://food-hub-backend-gzga.onrender.com";

      console.log(api, "assda");
      const response = await fetch(
        `${api}/getPosters`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const sendTo = {
          response: responseData,
          status: true,
        };
        return sendTo;
      }
      throw new Error("Something went Wrong! ");
    } catch (error) {
      throw error;
    }
  },
  getRecipe: async (id: string) => {
    try {
      // const api = "http://localhost:3001";
      // const api = " https://food-hub-backend-gzga.onrender.com";

      const response = await fetch(`${api}/findRecipeByDishId/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        const sendTo = {
          response: responseData,
          status: true,
        };
        return sendTo;
      }
      throw new Error("Something went Wrong! ");
    } catch (error) {
      throw error;
    }
  },
  getArticle: async () => {
    try {
      // const api = "http://localhost:3001";
      // const api = " https://food-hub-backend-gzga.onrender.com";

      const response = await fetch(`${api}/getArticles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        const sendTo = {
          response: responseData,
          status: true,
        };
        return sendTo;
      }
      throw new Error("Something went Wrong! ");
    } catch (error) {
      throw error;
    }
  },
  searchRecipe: async (params: string) => {
    try {
      // const api = `http://localhost:3001/searhRecipe?name=${params}`;
      const getAPi = `${api}/searhRecipe?name=${params}`;
      const response = await fetch(getAPi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        const sendTo = {
          response: responseData,
          status: true,
        };
        return sendTo;
      }
      throw new Error("Something went Wrong! ");
    } catch (error) {
      throw error;
    }
  },
  getGeneratedRecipe: async (data: string) => {
    try {
      const response = await fetch(`${api}/getGeneratedRecipe`, {
        method: "POST", // Changed from GET to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Stringify the body
          search: data,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      return {
        response: responseData,
        status: true,
      };
    } catch (error) {
      throw error;
    }
  },
  searchRecipeSpooncular: async (params: string) => {
    try {
      // const api = `http://localhost:3001/searhRecipe?name=${params}`;
      const getAPi = `${api}/findRecipeSpoonacular/${params}`;
      const response = await fetch(getAPi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        const sendTo = {
          response: responseData,
          status: true,
        };
        return sendTo;
      }
      throw new Error("Something went Wrong! ");
    } catch (error) {
      throw error;
    }
  },
  createAccount: async (params: Record<string, any>) => {
    try {
      const createAccountApi = `${api}/createAccount`;
      const response = await fetch(createAccountApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      let responseData = await response.json();
      if (!response.ok) {
        responseData.error = true;
      }

      console.log(responseData);

      return {
        response: responseData,
        status: true,
      };
    } catch (error) {
      console.error("Error creating account:", error);
      return {
        response: null,
        status: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
  verifyEmail: async (params: string) => {
    try {
      const createAccountApi = `${api}/verifyEmail/${params}`;
      const response = await fetch(createAccountApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let responseData = await response.json();
      if (!response.ok) {
        responseData.error = true;
      }

      console.log(responseData, "respose dattttta");

      return {
        response: responseData,
        status: true,
      };
    } catch (error) {
      console.error("Error creating account:", error);
      return {
        response: null,
        status: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
  login: async (params: string) => {
    try {
      const createAccountApi = `${api}/login`;
      const response = await fetch(createAccountApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      let responseData = await response.json();
      if (!response.ok) {
        responseData.error = true;
      }

      console.log(responseData, "respose dattttta");
      localStorage.setItem("authToken", responseData.token);
      return {
        response: responseData,
        status: true,
      };
    } catch (error) {
      console.error("Error creating account:", error);
      return {
        response: null,
        status: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
  uploadRecipe: async (formData: Record<string, any>) => {
    try {
      const createAccountApi = `${api}/addPoster`;

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("calories", formData.calories);
      data.append("type", formData.type);
      data.append("time", formData.time);

      formData.ingredients.forEach((ingredient: any, index: any) => {
        data.append(`ingredients[${index}][name]`, ingredient.name);
        data.append(`ingredients[${index}][quantity]`, ingredient.quantity);
        data.append(`ingredients[${index}][unit]`, ingredient.unit);
      });

      formData.directions.forEach((direction: any, index: any) => {
        data.append(`directions[${index}][title]`, direction.title);
        data.append(`directions[${index}][description]`, direction.description);
      });

      if (formData.selectedImage) {
        data.append("image", formData.selectedImage);
      }

      const token = localStorage.getItem("authToken"); // or wherever you store your token

      const response = await fetch(createAccountApi, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Add this line
        },
        body: data,
      });

      let responseData = await response.json();
      if (!response.ok) {
        responseData.error = true;
      }

      console.log(responseData);

      return {
        response: responseData,
        status: true,
      };
    } catch (error) {
      console.error("Error creating account:", error);
      return {
        response: null,
        status: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
};

export default getPoster;
