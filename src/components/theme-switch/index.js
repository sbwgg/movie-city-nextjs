import React from 'react';
import classNames from 'classnames';
import {useTheme} from 'next-themes';
import styles from './index.module.scss';

const ThemeSwitch = () => {
	const {systemTheme, theme, setTheme} = useTheme();
	const currentTheme = theme === 'system' ? systemTheme : theme;

	return (
		<div>
			<input type="checkbox" id="theme-switcher" className="hidden"
				   onChange={() => currentTheme === 'dark' ? setTheme('light') : setTheme('dark')}
			/>
			<label htmlFor="theme-switcher" className={classNames([styles.toggleButton, 'theme-switcher'])}>
				<span/>
			</label>
		</div>
	)
}

export default ThemeSwitch;
