/* eslint-disable react-hooks/rules-of-hooks */
import * as dotenv from "dotenv";
import { AbsoluteString } from "next/dist/lib/metadata/types/metadata-types";

dotenv.config();
const api = process.env.NEXT_PUBLIC_LOCALHOST;

const getPoster = {
  get: async () => {
    try {
      const response = await fetch(
        `${api}/getRecipes`,

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
  getSelf: async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${api}/getSelfRecipes`,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let sendTo;
      if (response.ok) {
        const responseData = await response.json();
        sendTo = {
          response: responseData,
          status: true,
        };
        return sendTo;
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user-storage");
        return (sendTo = {
          error: true,
        });
      }
    } catch (error) {
      throw error;
    }
  },
  getRecipe: async (id: string) => {
    try {
      const response = await fetch(`${api}/findRecipeId/${id}`, {
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
      const getAPi = `${api}/getRecipeByName?name=${params}`;
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
      localStorage.setItem("token", responseData.token);
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
      const createAccountApi = `${api}/postRecipe`;

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

      const token = localStorage.getItem("token"); // or wherever you store your token

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
  EditRecipe: async (formData: Record<string, any>) => {
    try {
      const editRecipe = `${api}/editRecipe/${formData._id}`;

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("cal", formData.cal);
      data.append("dishType", formData.dishType);
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

      if (formData.img && formData.img instanceof File) {
        data.append("image", formData.img); // Add new image only if it's a file
      }

      const token = localStorage.getItem("token"); // or wherever you store your token

      const response = await fetch(editRecipe, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Add this line
        },
        body: data,
      });

      if (response.ok) {
        const responseData = await response.json();

        const sendTo = {
          response: responseData,
          status: true,
        };
        return sendTo;
      } else {
        const errorData = await response.json();

        return {
          response: errorData,
          status: false,
          message: errorData.message,
        };
      }
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
  getUser: async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${api}/getUser`,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add this line
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
  deleteRecipe: async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${api}/deleteRecipe/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const sendTo = {
          response: responseData,
          status: true,
        };
        return sendTo;
      } else {
        // Return an error message or a custom response if the deletion fails
        const errorData = await response.json();
        return {
          response: errorData,
          status: false,
          message: errorData.message,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: "Something went wrong during the deletion.",
      };
    }
  },
  editUser: async (formData: Record<string, any>) => {
    try {
      const editUser = `${api}/updateUser`;

      const data = new FormData();
      data.append("name", formData.name);

      // Debugging log
      console.log("Profile:", formData.profile);
      console.log("Cover Photo:", formData.coverPhoto);

      // Add profile photo only if it's a new file
      if (formData.profile && formData.profile instanceof File) {
        data.append("profile", formData.profile); // Must match what the backend expects
      }

      // Add cover photo only if it's a new file
      if (formData.coverPhoto && formData.coverPhoto instanceof File) {
        data.append("coverPhoto", formData.coverPhoto); // Must match what the backend expects
      }

      const token = localStorage.getItem("token");

      const response = await fetch(editUser, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // No need to add Content-Type for FormData
        },
        body: data,
      });

      if (response.ok) {
        const responseData = await response.json();

        return {
          response: responseData,
          status: true,
        };
      } else {
        const errorData = await response.json();

        return {
          response: errorData,
          status: false,
          message: errorData.message,
        };
      }
    } catch (error) {
      console.error("Error editing user:", error);
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
