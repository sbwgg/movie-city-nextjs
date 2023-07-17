import React from 'react';
import classNames from 'classnames';
import {useTheme} from 'next-themes';
import styles from './index.module.scss';

const ThemeSwitch = () => {
	const {systemTheme, theme, setTheme} = useTheme();
	const currentTheme = theme === 'system' ? systemTheme : theme;

	const changeCurrentTheme = () => {
		return currentTheme === 'dark' ? setTheme('light') : setTheme('dark');
	};

	return (
		<div className={styles.toggleContainer}>
			<input type="checkbox" id="theme-switcher"
				   className="hidden" onChange={changeCurrentTheme}
			/>
			<label htmlFor="theme-switcher" className={classNames([styles.toggleButton, 'theme-switcher'])}>
				<span/>
			</label>
		</div>
	)
}

export default ThemeSwitch;
