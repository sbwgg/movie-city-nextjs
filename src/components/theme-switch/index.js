import React from 'react';
import {useTheme} from 'next-themes';

const ThemeSwitch = () => {
	const {systemTheme, theme, setTheme} = useTheme();
	const currentTheme = theme === 'system' ? systemTheme : theme;

	return (
		<input type="checkbox"
			   onChange={() => currentTheme === 'dark' ? setTheme('light') : setTheme('dark')}
		/>
	)
}

export default ThemeSwitch;
