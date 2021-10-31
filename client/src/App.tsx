import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import { Layout } from './pages/Layout';

export const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          {routes.map(item => (
            <Route exact path={item.path} key={item.path}>
              {item.page}
            </Route>
          ))}
        </Switch>
      </Layout>
    </Router>
  );
};
