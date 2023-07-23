import React from 'react';
import styles from './index.module.scss';
import ImageComponent from '@/components/UI/image-component';
import NextLink from '@/components/UI/NextLink';
import classNames from 'classnames';

const PersonCard = props => {
	const {
		person = []
	} = props;

	return (
		<div className={styles.personWrapper}>
			<ul className={styles.personList}>
				{person.map((newPerson, key) => {
					return (
						<li key={key} className={classNames([styles.personItemContainer, 'card-label-hover'])}>
							<NextLink href="/" className={styles.personItem}>
								<ImageComponent
									src={`https://image.tmdb.org/t/p/h632/${newPerson.profile_path}`}
									alt={newPerson.name}
									width={90}
									height={135}
									quality={80}
								/>
								<div className={styles.personInfo}>
									<p>{newPerson.name}</p>
									<span>{newPerson.character ? newPerson.character : newPerson.job}</span>
								</div>
							</NextLink>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default PersonCard;
