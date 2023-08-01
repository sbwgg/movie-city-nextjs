import React from 'react';
import styles from './index.module.scss';
import {useTranslation} from 'next-i18next';

const Loader = () => {
	const {t} = useTranslation();

	return (
		<div className={styles.loaderContainer}>
			<div className={styles.loader}/>
			<p>{t('loader')}</p>
		</div>
	)
};

export default Loader;
