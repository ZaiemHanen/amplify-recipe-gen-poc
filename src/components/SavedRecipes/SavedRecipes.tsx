import React, { useState, useEffect } from 'react';
import styles from './SavedRecipes.module.css';
import RecipeModal from './RecipeModal';

interface Recipe {
  RecipeId: string;
  Title: string;
  Ingredients: string[];
  Instructions: string[];
  PrepTime: string;
  CookTime: string;
}

interface SavedRecipesProps {
  userId?: string;
}

const SavedRecipes: React.FC<SavedRecipesProps> = ({ userId }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const fetchSavedRecipes = async () => {
    if (!userId) {
      setError('User ID is not available');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://gev1wevaub.execute-api.us-west-2.amazonaws.com/dev/recipe/get-recipes?userId=${encodeURIComponent(userId)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to load recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, [userId]);

  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  return (
    <div className={styles.savedRecipesContainer}>
      <h2>Saved Recipes</h2>
      {recipes.length === 0 ? (
        <p>No saved recipes found.</p>
      ) : (
        <div className={styles.recipeGrid}>
          {recipes.map((recipe) => (
            <div key={recipe.RecipeId} className={styles.recipeCard}>
              <h3>{recipe.Title}</h3>
              <p><strong>Prep Time:</strong> {recipe.PrepTime}</p>
              <p><strong>Cook Time:</strong> {recipe.CookTime}</p>
              <p><strong>Ingredients:</strong> {recipe.Ingredients.length}</p>
              <p><strong>Instructions:</strong> {recipe.Instructions.length} steps</p>
              <button className={styles.viewButton} onClick={() => openRecipeModal(recipe)}>
                View Recipe
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeRecipeModal} />
      )}
    </div>
  );
};

export default SavedRecipes;