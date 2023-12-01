import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Clients = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover='content' />}>
      <Switch>
        <Route
          path={`${match.url}/user-list`}
          component={lazy(() => import(`./user-list`))}
        />
        <Route
          path={`${match.url}/:id/edit-profile`}
          component={lazy(() => import(`./edit-profile`))}
        />
        <Redirect exact from={`${match.url}`} to={`${match.url}/clients`} />
      </Switch>
    </Suspense>
  );
};

export default Clients;
