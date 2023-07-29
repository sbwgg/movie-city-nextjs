import React from 'react';
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
import styles from './index.module.scss';
import classNames from 'classnames';

const LanguageSwitch = () => {
	const router = useRouter();

	return(
		<ul className={styles.languageSwitchContainer}>
			{router.locales.map(locale => (
				<li key={locale}
					className={classNames([
						styles.languageSwitchItem,
						locale === router.locale && styles.languageSwitchItemActive
					])}
				>
					<button
						type="button"
						className="gradient-text"
						onClick={() => {
							router.push({
								pathname: router.pathname,
								query: router.query,
							}, null, { locale });

							Cookies.set('NEXT_LOCALE', locale, {expires: 14});
						}}
					>
						{locale.toUpperCase()}
					</button>
				</li>
			))}
		</ul>
	)
};

export default LanguageSwitch;
