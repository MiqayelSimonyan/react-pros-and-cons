import React, { lazy } from 'react';

const ProsAndCons = lazy(() => import(/* webpackChunkName: "pros-and-cons" */ '../pros-and-cons'));

const Home = () => {
    return (
        <div className='container'>
            <ProsAndCons title='Should I eat at McDonalds?' />
        </div>
    );
};

export default Home;