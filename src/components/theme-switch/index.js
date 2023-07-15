import React from 'react';
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();
	return (
		<div>
			<input type="checkbox"
				   onChange={() => theme === "dark"? setTheme('light'): setTheme("dark")}
			/>
		</div>
	)
}

export default ThemeSwitch;
