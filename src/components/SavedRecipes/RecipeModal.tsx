import React from 'react';
import styles from './RecipeModal.module.css';

interface Recipe {
  RecipeId: string;
  Title: string;
  Ingredients: string[];
  Instructions: string[];
  PrepTime: string;
  CookTime: string;
}

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h2 className={styles.recipeTitle}>{recipe.Title}</h2>
        <div className={styles.recipeInfo}>
          <p><strong>Prep Time:</strong> {recipe.PrepTime}</p>
          <p><strong>Cook Time:</strong> {recipe.CookTime}</p>
        </div>
        <div className={styles.recipeDetails}>
          <div className={styles.ingredientsSection}>
            <h3>Ingredients</h3>
            <ul>
              {recipe.Ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className={styles.instructionsSection}>
            <h3>Instructions</h3>
            <ul>
              {recipe.Instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;