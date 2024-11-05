import React, { useState, useEffect } from 'react';
import styles from './Ingredients.module.css';
import AddIngredientModal from './AddIngredientModal';
import { Ingredient, NewIngredient } from '../types';

interface IngredientsProps {
  userId?: string;
}

const Ingredients: React.FC<IngredientsProps> = ({ userId }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // fetchIngredients();
  }, [userId]);

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://your-api-endpoint.com/ingredients?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch ingredients');
      const data = await response.json();
      setIngredients(data);
    } catch (err) {
      setError('Failed to load ingredients. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addIngredient = async (newIngredient: NewIngredient) => {
    try {
      const response = await fetch('https://your-api-endpoint.com/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newIngredient, userId }),
      });
      if (!response.ok) throw new Error('Failed to add ingredient');
      const addedIngredient = await response.json();
      setIngredients([...ingredients, addedIngredient]);
    } catch (err) {
      setError('Failed to add ingredient. Please try again.');
      console.error(err);
    }
  };

  const deleteIngredient = async (id: string) => {
    try {
      const response = await fetch(`https://your-api-endpoint.com/ingredients/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete ingredient');
      setIngredients(ingredients.filter(ing => ing.id !== id));
    } catch (err) {
      setError('Failed to delete ingredient. Please try again.');
      console.error(err);
    }
  };

//   if (loading) return <div className={styles.loading}>Loading ingredients...</div>;
//   if (error) return <div className={styles.error}>{error}</div>;

return (
    <div className={styles.ingredientsContainer}>
      <div className={styles.headerContainer}>
        <h2>My Ingredients Inventory</h2>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          Add Ingredient
        </button>
      </div>
      {/* {ingredients.length === 0 ? (
        <p>No ingredients in your inventory. Start by adding some!</p>
      ) : (
        <div className={styles.ingredientGrid}>
          {ingredients.map((ingredient) => (
            <div key={ingredient.id} className={styles.ingredientCard}>
              <h3>{ingredient.name}</h3>
              <p>Quantity: {ingredient.quantity} {ingredient.unit}</p>
              <p>Expiration: {new Date(ingredient.expirationDate).toLocaleDateString()}</p>
              <p>Category: {ingredient.category}</p>
              <button 
                className={styles.deleteButton} 
                onClick={() => deleteIngredient(ingredient.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )} */}
      {isModalOpen && (
        <AddIngredientModal
          onClose={() => setIsModalOpen(false)}
          onAdd={addIngredient}
        />
      )}
    </div>
  );
};

export default Ingredients;