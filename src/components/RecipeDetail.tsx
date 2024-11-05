import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Recipe {
  RecipeId: string;
  Title: string;
  Servings: string;
  PrepTime: string;
  CookTime: string;
  Ingredients: string[];
  Instructions: string[];
}

const RecipeDetail: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`YOUR_API_ENDPOINT/get-recipes?userId=current-user-id`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
      }
      const recipes = await response.json();
      const selectedRecipe = recipes.find((r: Recipe) => r.RecipeId === id);
      if (selectedRecipe) {
        setRecipe(selectedRecipe);
      } else {
        setError('Recipe not found');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setError('Failed to load recipe details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.Title}</h1>
      <div className="recipe-meta">
        <p>Servings: {recipe.Servings}</p>
        <p>Prep Time: {recipe.PrepTime}</p>
        <p>Cook Time: {recipe.CookTime}</p>
      </div>
      <div className="recipe-content">
        <div className="ingredients">
          <h2>Ingredients:</h2>
          <ul>
            {recipe.Ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="instructions">
          <h2>Instructions:</h2>
          <ol>
            {recipe.Instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;