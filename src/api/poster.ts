import "dotenv/config";

const getPoster = {
  get: async () => {
    try {
      // const api = "http://localhost:3001";
      const api = " https://food-hub-backend-gzga.onrender.com";

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
      const api = " https://food-hub-backend-gzga.onrender.com";

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
      const api = " https://food-hub-backend-gzga.onrender.com";

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
      const api = `https://food-hub-backend-gzga.onrender.com/searhRecipe?name=${params}`;
      const response = await fetch(api, {
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
};

export default getPoster;
