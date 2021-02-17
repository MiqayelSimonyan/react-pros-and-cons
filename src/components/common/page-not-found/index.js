import React from 'react';
import { Link } from 'react-router-dom';

import pageNotFound from '../../../assets/images/404.gif';

import './style.scss';

const PageNotFound = () => {
	return (
		<div className='container not_found_wrap flex column horizontal-center vertical-center'>
			<img src={pageNotFound} alt='unknown page' title='notFound' />
			<br />
			<Link to='/'>Return To Homepage</Link>
		</div>
	)
}

export default PageNotFound;