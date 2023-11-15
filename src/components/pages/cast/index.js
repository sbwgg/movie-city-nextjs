import React from 'react';
import {useTranslation} from 'next-i18next';
import PersonList from '@/components/pages/cast/person-list';
import styles from './index.module.scss';

const Index = props => {
	const {
		castData = [],
		crewData = []
	} = props;

	const {t} = useTranslation();

	const totalCrewMembers = Object.values(crewData).reduce((total, department) => total + department.length, 0);

	return (
		<section className={styles.castContainer}>
			<div className={styles.castContent}>
				<h2 className={styles.castContentTitle}>
					{t('cast.cast')}
					{castData.length > 0 && <span>{castData.length}</span>}
				</h2>
				<PersonList key="cast-members" person={castData}/>
			</div>
			<div className={styles.castContent}>
				<h2 className={styles.castContentTitle}>
					{t('cast.crew')}
					{totalCrewMembers > 0 && <span>{totalCrewMembers}</span>}
				</h2>
				<PersonList key="crew-members" person={crewData} type="crew"/>
			</div>
		</section>
	)
};

export default Index;
