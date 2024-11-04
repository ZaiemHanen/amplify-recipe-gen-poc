import React, { useState } from 'react';
import styles from './RecipeGenerator.module.css';

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  servings: number;
  prepTime: string;
  cookTime: string;
}

const RecipeGenerator: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', amount: '', unit: 'g' }]);
  const [dietary, setDietary] = useState<string>('none');
  const [loading, setLoading] = useState<boolean>(false);
  // const [recipe, setRecipe] = useState<Recipe | null>(null);
  // const [error, setError] = useState<string | null>(null);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: 'g' }]);
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = ingredients.map((ing, i) => 
      i === index ? { ...ing, [field]: value } : ing
    );
    setIngredients(newIngredients);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    setLoading(true);
    // setError(null);
    // setRecipe(null);

    // Prepare the data to send to the API
    const requestData = {
      ingredients: ingredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name}`).filter(ing => ing.trim() !== ''),
      dietary_restrictions: dietary !== 'none' ? dietary : undefined
    };
    console.log(requestData);
    try {
      const response = await fetch('https://mc5u8otqm6.execute-api.eu-west-1.amazonaws.com/dev/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers here, such as authentication tokens
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("response", response)
      const data = await response.json();
      console.log("data", data);
      // setRecipe(data);
    } catch (e) {
      // console.error('Error generating recipe:', e);
      // setError('Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputSection}>
        <h2 className={styles.title}>Recipe Generator</h2>
        <div className={styles.ingredients}>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientRow}>
              <input
                type="text"
                placeholder="Ingredient name"
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                className={styles.input}
              />
              <select
                value={ingredient.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                className={styles.select}
              >
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="pcs">pcs</option>
                <option value="tbsp">tbsp</option>
                <option value="tsp">tsp</option>
                <option value="cup">cup</option>
              </select>
              <button
                onClick={() => removeIngredient(index)}
                className={styles.removeButton}
                aria-label="Remove ingredient"
              >
                ×
              </button>
            </div>
          ))}
          <button onClick={addIngredient} className={styles.addButton}>
            + Add Ingredient
          </button>
        </div>
        <div className={styles.dietarySection}>
          <label htmlFor="dietary" className={styles.label}>Dietary Restrictions:</label>
          <select
            id="dietary"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
            className={styles.select}
          >
            <option value="none">None</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="dairy-free">Dairy-Free</option>
          </select>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={styles.generateButton}
        >
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>
      </div>
      <div className={styles.previewSection}>
        <h2 className={styles.title}>Recipe Preview</h2>
        {/* {loading && <p>Generating your recipe...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {recipe && (
          <div className={styles.recipePreview}>
            <h3>{recipe.title}</h3>
            <p>Servings: {recipe.servings}</p>
            <p>Prep Time: {recipe.prepTime}</p>
            <p>Cook Time: {recipe.cookTime}</p>
            <h4>Ingredients:</h4>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h4>Instructions:</h4>
            <ol>
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )} */}
        <p>Your generated recipe will appear here.</p>
      </div>
    </div>
  );
};

export default RecipeGenerator;