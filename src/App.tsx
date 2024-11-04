// import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { ThemeProvider } from '@aws-amplify/ui-react';
import Layout from './components/Layout/Layout';
import RecipeGenerator from './components/RecipeGenerator/RecipeGenerator';
import { amplifyTheme } from './styles/amplifyTheme';
import '@aws-amplify/ui-react/styles.css';
import './styles/main.css';

function App() {
  return (
    <ThemeProvider theme={amplifyTheme}>
      <Authenticator>
        {() => (
          <Layout>
            <RecipeGenerator />
          </Layout>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;