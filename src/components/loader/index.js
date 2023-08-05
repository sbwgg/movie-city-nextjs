import React from 'react';
import {useTranslation} from 'next-i18next';
import styles from './index.module.scss';

const Index = () => {
	const {t} = useTranslation();

	return (
		<div className={styles.loaderContainer}>
			<div className={styles.loader}/>
			<p>{t('loader')}</p>
		</div>
	)
};

export default Index;
