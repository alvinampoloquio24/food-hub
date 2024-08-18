import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { FaSave, FaUpload } from "react-icons/fa";
import { TbPencilCancel } from "react-icons/tb";
import { ImCancelCircle } from "react-icons/im";
import { LiaExchangeAltSolid } from "react-icons/lia";

interface ModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: RecipeFormData) => void;
}

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface Direction {
  title: string;
  description: string;
}

interface RecipeFormData {
  _id: string;
  name: string;
  description: string;
  cal: string;
  dishType: string;
  time: string;
  ingredients: Ingredient[];
  directions: Direction[];
  img: any;
}
interface Recipe {
  img: File | string | null;
  _id: string;
  name: string;
  description: string;
  cal: string;
  dishType: string;
  time: string;
  ingredients: Ingredient[];
  directions: Direction[];
}

const Modal: React.FC<ModalProps> = ({ recipe, isOpen, onClose, onSubmit }) => {
  console.log(recipe._id, "====================");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    _id: string;
    name: string;
    description: string;
    cal: string;
    dishType: string;
    time: string;
    ingredients: Ingredient[];
    directions: Direction[];
    img: any;
  }>({
    _id: recipe._id,
    name: recipe.name,
    description: recipe.description,
    cal: recipe.cal,
    dishType: recipe.dishType,
    time: recipe.time,
    ingredients: recipe.ingredients || [{ name: "", quantity: "", unit: "" }],
    directions: recipe.directions || [{ title: "", description: "" }],
    img: recipe.img,
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        _id: recipe._id,
        img: recipe.img,
        name: recipe.name,
        description: recipe.description,
        cal: recipe.cal,
        dishType: recipe.dishType,
        time: recipe.time,
        ingredients: recipe.ingredients.length
          ? recipe.ingredients
          : [{ name: "", quantity: "", unit: "" }],
        directions: recipe.directions.length
          ? recipe.directions
          : [{ title: "", description: "" }],
      });
    }
  }, [recipe]);
  if (!isOpen) return null;

  const handleFormInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = {
        ...newIngredients[index],
        [name]: value,
      };
      return {
        ...prev,
        ingredients: newIngredients,
      };
    });
  };

  const handleDirectionChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const newDirections = [...prev.directions];
      newDirections[index] = {
        ...newDirections[index],
        [name]: value,
      };
      return {
        ...prev,
        directions: newDirections,
      };
    });
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }],
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleAddDirection = () => {
    setFormData((prev) => ({
      ...prev,
      directions: [...prev.directions, { title: "", description: "" }],
    }));
  };

  const handleRemoveDirection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      directions: prev.directions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    console.log(formData);
    setCurrentSlide(0);
    onSubmit(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Create a local preview URL
      const imageUrl = URL.createObjectURL(file);

      // Update local preview and formData with the actual file
      setImagePreview(imageUrl); // Store the preview URL for display
      setFormData((prev) => ({
        ...prev,
        img: file, // Keep the file for submission
      }));
    }
  };

  const slides = [
    // Slide 1: Basic Info
    <div key="basic-info" className="">
      <h2 className="md:text-2xl text-lg font-bold text-center mb-6 ">
        Basic Recipe Information
      </h2>
      <div className="flex flex-col gap-4 md:text-lg text-sm lg:h-96 lg:pr-4  overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="flex flex-col">
          <p>Name</p>
          <input
            type="text"
            name="name"
            required
            onChange={handleFormInputChange}
            placeholder="Recipe name"
            value={formData.name}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          {imagePreview || formData.img ? (
            <div className="flex flex-col gap-1">
              <p>Image</p>
              <div className="relative h-40 w-40">
                {/* Show the preview image if available, otherwise the original image */}
                <img
                  src={imagePreview || formData.img}
                  alt="Image"
                  className="h-40 w-40"
                />

                {/* Replace button triggers the hidden file input */}
                <button
                  onClick={() => document.getElementById("imageInput")?.click()} // Trigger the file input on click
                  className="absolute top-0 m-1 shadow right-0 bg-blue-400 hover:bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  type="button"
                >
                  <LiaExchangeAltSolid />
                </button>
              </div>
            </div>
          ) : (
            <>
              <p>Choose Image</p>
              <input
                type="file"
                required
                className="border p-2"
                accept="image/*"
                onChange={handleImageChange} // Call handleImageChange to update the file and preview
              />
            </>
          )}

          {/* Hidden input to trigger file replacement */}
          <input
            id="imageInput"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange} // Same file input handler to replace the image
          />

          {/* Hidden input to trigger file replacement */}
          <input
            id="imageInput"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange} // Same file input handler to replace the image
          />
        </div>
        <div className="flex gap-4 flex-col lg:justify-between lg:flex-row w-full ">
          <div className="flex flex-col ">
            <p>Cook time</p>
            <input
              type="number"
              name="time"
              required
              onChange={handleFormInputChange}
              placeholder="In minutes"
              value={formData.time}
              className="border p-2 lg:w-52"
            />
          </div>
          <div className="flex flex-col ">
            <p>Type</p>
            <input
              type="text"
              name="dishType"
              required
              onChange={handleFormInputChange}
              placeholder="Type"
              value={formData.dishType}
              className="border p-2"
            />
          </div>
          <div className="flex flex-col ">
            <p>Calories</p>
            <input
              type="number"
              name="cal"
              required
              onChange={handleFormInputChange}
              placeholder="Calories"
              value={formData.cal}
              className="border p-2 "
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <p>Description</p>
          <textarea
            className="border p-2 custom-scrollbar"
            name="description"
            required
            onChange={handleFormInputChange}
            value={formData.description}
            placeholder="Enter your description..."
            rows={3}
          ></textarea>
        </div>
      </div>
    </div>,

    // Slide 2: Ingredients
    <div key="ingredients" className="">
      <h2 className="md:text-2xl text-lg font-bold text-center mb-6">
        Ingredients
      </h2>
      <div className="flex flex-col  gap-2 pb-8  lg:h-96 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {formData.ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="grid grid-cols-12 w-full gap-2 justify-center md:text-lg text-sm"
          >
            <div className="flex flex-col justify-center col-span-5">
              <p>Name</p>
              <input
                type="text"
                required
                className="border p-2"
                name="name"
                value={ingredient.name}
                onChange={(event) => handleIngredientChange(index, event)}
              />
            </div>
            <div className="flex flex-col justify-center col-span-3">
              <p>Quantity</p>
              <input
                type="text"
                required
                className="border p-2"
                name="quantity"
                value={ingredient.quantity}
                onChange={(event) => handleIngredientChange(index, event)}
              />
            </div>
            <div className="flex flex-col justify-center col-span-3">
              <p>Unit</p>
              <input
                type="text"
                className="border p-2"
                name="unit"
                required
                value={ingredient.unit}
                onChange={(event) => handleIngredientChange(index, event)}
              />
            </div>
            <div className="flex flex-col justify-between col-span-1">
              <p className="md:flex hidden"></p>
              <button
                type="button"
                className="p-2 rounded md:border"
                onClick={() => handleRemoveIngredient(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <div className="flex gap-4 items-center mt-4">
          <button
            type="button"
            className="p-1 px-3 rounded border"
            onClick={handleAddIngredient}
          >
            + Add Ingredient
          </button>
        </div>
      </div>
    </div>,

    // Slide 3: Directions
    <div key="directions">
      <h2 className="md:text-2xl text-sm font-bold text-center mb-6 ">
        Directions
      </h2>
      <div className="flex flex-col gap-2 lg:h-96 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {formData.directions.map((direction, index) => (
          <div
            key={index}
            className="grid grid-cols-12 w-full gap-2 justify-center md:text-lg text-sm"
          >
            <div className="flex flex-col justify-center col-span-4">
              <p>Title</p>
              <input
                type="text"
                required
                className="border p-2"
                name="title"
                value={direction.title}
                onChange={(event) => handleDirectionChange(index, event)}
              />
            </div>
            <div className="flex flex-col justify-center col-span-7">
              <p>Description</p>
              <input
                required
                type="text"
                className="border p-2"
                name="description"
                value={direction.description}
                onChange={(event) => handleDirectionChange(index, event)}
              />
            </div>
            <div className="flex flex-col justify-between col-span-1">
              <p className="hidden md:flex"></p>
              <button
                type="button"
                className="p-2 rounded md:border"
                onClick={() => handleRemoveDirection(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <div className="flex gap-4 items-center mb-4">
          <button
            type="button"
            className="p-1 px-3 rounded border"
            onClick={handleAddDirection}
          >
            + Add Direction
          </button>
        </div>
      </div>
    </div>,
  ];

  const SlideIndicator = ({
    currentSlide,
    totalSlides,
  }: {
    currentSlide: number;
    totalSlides: number;
  }) => {
    return (
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalSlides }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
              index === currentSlide
                ? "bg-base-dark scale-125"
                : "bg-gray-300 scale-100"
            }`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
        onClick={() => {
          setCurrentSlide(0), onClose();
        }}
      />
      <div className="relative z-10 bg-white overflow-auto rounded-lg md:p-6 p-4 md:px-12 lg:w-3/5 md:w-11/12 w-screen h-90p max-w-6xl ">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="h-90p flex flex-col justify-between"
        >
          <div className="flex flex-col w-full gap-6 mt-4">
            {slides[currentSlide]}
          </div>
          <div>
            <div className="flex gap-3 mt-6">
              {currentSlide > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentSlide(currentSlide - 1)}
                  className="p-2 px-3 bg-gray-200 rounded gap-2 flex items-center transition duration-200 ease-in-out hover:scale-110"
                >
                  <GrCaretPrevious />
                  Previous
                </button>
              )}
              {currentSlide < slides.length - 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentSlide(currentSlide + 1)}
                  className="p-2 px-3 hover:shadow-lg bg-base-dark text-white flex gap-2 items-center rounded transition duration-200 ease-in-out hover:scale-110"
                >
                  Next <GrCaretNext />
                </button>
              )}
              {currentSlide === slides.length - 1 && (
                <div className="flex justify-between w-full">
                  <button
                    type="submit"
                    className="p-2 flex items-center px-3 gap-2 bg-blue-500 text-white rounded transition duration-200 ease-in-out hover:scale-110"
                  >
                    Save
                    <FaSave />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSlide(0), onClose();
                    }}
                    className="p-2 flex items-center px-3 gap-2 bg-red-500 text-white rounded transition duration-200 ease-in-out hover:scale-110"
                  >
                    Discard
                    <ImCancelCircle />
                  </button>
                </div>
              )}
            </div>
            <SlideIndicator
              currentSlide={currentSlide}
              totalSlides={slides.length}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
