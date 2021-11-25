/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { storage } from './utils';
import { privetRoutes, publicRoutes } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH } from './redux/types';
import { setUser } from './redux/actions/authActions';

export const App: React.FC = () => {
  const dispatch = useDispatch()
  const user: any = useSelector<any>(state => state.authReducer.authData)
  const [routes, setRoutes] = useState(publicRoutes);
  
  useEffect(() => {
    const userFromStorage = storage.get('profile');
    if (user) {
      setRoutes(privetRoutes);
    } else if (userFromStorage?.token) {
      dispatch(setUser(userFromStorage));
    } else {
      setRoutes(publicRoutes)
    }
  }, [user]);

  
3
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
