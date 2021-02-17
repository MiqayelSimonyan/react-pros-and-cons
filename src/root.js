import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router';

const Home = lazy(() => import(/* webpackChunkName: "home" */ './components/home'));
const PageNotFound = lazy(() => import(/* webpackChunkName: "page-not-found" */ './components/common/page-not-found'));
import Loader from './components/common/loader';

const Root = () => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path="/" exact={true} component={Home} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Suspense>
        </>
    )
}

export default Root;