import React from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import Seo from '@/components/UI/Seo';
import {dynamicBackground} from '@/helpers';
import styles from './index.module.scss';

const Header = dynamic(() => import('@/components/header/index'));
const Footer = dynamic(() => import('@/components/footer'));

const Index = props => {
	const {
		title,
		description,
		children,
		image,
		backgroundPoster,
		className
	} = props;

	return (
		<>
			<Seo title={title} description={description} image={image}/>
			<main>
				<Header/>
				<div className={classNames(['page', backgroundPoster && 'fixed-background'])}
					 style={backgroundPoster && dynamicBackground(backgroundPoster)}
				>
					<div className={classNames([styles.containerWrapper, className])}>
						<div className={classNames([
							'page-container', styles.container
						])}>
							{children}
						</div>
					</div>
				</div>
				<Footer/>
			</main>
		</>
	)
};

export default Index;
