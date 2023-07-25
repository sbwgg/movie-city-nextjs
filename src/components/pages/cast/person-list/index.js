import React from 'react';
import styles from './index.module.scss';
import PersonCard from '@/components/person-card';

const PersonList = props => {
	const {
		person = [],
		type = 'cast'
	} = props;

	// const categories = [];

	// person.forEach(item => {
	// 	if (!categories.includes(item.known_for_department)) {
	// 		categories.push(item.known_for_department)
	// 	}
	// });
	//
	// const personsGroupByCategory = categories.map(category => {
	// 	return {
	// 		category: category,
	// 		persons: person.filter(item => item.known_for_department === category)
	// 	}
	// });

	// console.log(personsGroupByCategory)


	const filteredCategories = person.reduce((current, updated) => {
		(current[updated.department] = current[updated.department] || [])
			.push(updated);

		return current;
	}, {});

	const categoriesNew = Object.keys(filteredCategories).sort();


	return (
		<>
			{type === 'crew' ? (
				<>{categoriesNew.map((category, index) => {
					return (
						<div key={`category-${index}`} className={styles.personWrapper}>
							<h4>{category}</h4>
							<ul>
								{filteredCategories[category].map((newPerson, key) => {
									return (
										<li key={`category-${index}-item-${key}`}
											className={styles.personItemContainer}>
											<PersonCard secondary member={newPerson}/>
										</li>
									)
								})}
							</ul>
						</div>
					)
				})}</>
			) : (
				<div className={styles.personWrapper}>
					<ul>
						{person.map(newPerson => {
							return (
								<li key={newPerson.id}
									className={styles.personItemContainer}>
									<PersonCard secondary member={newPerson}/>
								</li>
							)
						})}
					</ul>
				</div>
			)}
		</>
	)
}

export default PersonList;
