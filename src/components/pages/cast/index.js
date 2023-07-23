import React from 'react';
import styles from './index.module.scss';
import PersonCard from '@/components/pages/cast/person-card';
import {useTranslation} from 'next-i18next';

const Cast = props => {
	const {
		castData = [],
		crewData = []
	} = props;

	const {t} = useTranslation();

	return (
		<section className={styles.castContainer}>
			<div className={styles.castContent}>
				<h2 className={styles.castContentTitle}>
					{t('cast.cast')}
					{castData.length > 0 && <span>{castData.length}</span>}
				</h2>
				<PersonCard person={castData}/>
			</div>
			<div className={styles.castContent}>
				<h2 className={styles.castContentTitle}>
					{t('cast.crew')}
					{crewData.length > 0 && <span>{crewData.length}</span>}
				</h2>
				<PersonCard person={crewData}/>
			</div>
		</section>
	)
};

export default Cast;
