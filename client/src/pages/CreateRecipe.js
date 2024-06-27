import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function CreateRecipe() {

  const userID = useGetUserID();
  const navigate = useNavigate();

  const [cookies,] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };


  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const removeIngredient = () => {
    const ingredients = recipe.ingredients;
    ingredients.pop();
    setRecipe({ ...recipe, ingredients: ingredients });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/recipes", recipe, {headers:{Authorization: cookies.access_token}});
      if (response.data.message === "posted") {
        toast.success("New Recipe Created!", { autoClose: 1500 });
        await delay(1500);
        navigate("/");
      } else {
        toast.error("Something Went Wrong!",{ autoClose: 1500 });
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' onChange={handleChange}/>
        <label htmlFor='ingredients'>Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input key={idx} type='text' name='ingredients' value={ingredient} onChange={(event) => handleIngredientChange(event, idx) }/>
        ))}
        <button onClick={addIngredient} type='button'>Add Ingredient</button>
        <button onClick={removeIngredient} type='button'>Remove Ingredient</button>
        <label htmlFor='instructions'>Instructions</label>
        <textarea id='instructions' name='instructions' onChange={handleChange}></textarea>
        <label htmlFor='imageUrl'>Image URL</label>
        <input type='text' id='imageUrl' name='imageUrl' onChange={handleChange} />
        <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
        <input type='number' id='cookingTime' name='cookingTime' onChange={handleChange} />
        <button type='submit'>Create Recipe</button>
      </form>
      
    </div>
  )
}

export default CreateRecipe
