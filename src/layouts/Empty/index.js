import React from 'react';
import classNames from 'classnames';
import Seo from '@/components/UI/Seo';
import Header from '@/components/header/index';
import Footer from '@/components/footer';
import {dynamicBackground} from '@/helpers';
import styles from './index.module.scss';

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
