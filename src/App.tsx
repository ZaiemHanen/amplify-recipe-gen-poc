import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { ThemeProvider } from '@aws-amplify/ui-react';
import Layout from './components/Layout/Layout';
import RecipeGenerator from './components/RecipeGenerator/RecipeGenerator';
import SavedRecipes from './components/SavedRecipes/SavedRecipes';
import Ingredients from './components/Ingredients/Ingredients';
// import Profile from './components/Profile/Profile';
import { amplifyTheme } from './styles/amplifyTheme';
import '@aws-amplify/ui-react/styles.css';
import './styles/main.css';

function App() {
  return (
    <ThemeProvider theme={amplifyTheme}>
      <Authenticator>
        {({ signOut, user }) => (
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<RecipeGenerator userId={user?.username} />} />
                <Route path="/ingredients" element={<Ingredients userId={user?.username} />} />
                <Route path="/saved-recipes" element={<SavedRecipes userId={user?.username} />} />
                {/* <Route path="/profile" element={<Profile userId={user?.username} />} /> */}
              </Routes>
            </Layout>
          </Router>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;