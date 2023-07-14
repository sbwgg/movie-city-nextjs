import React from 'react';
import {useRouter} from 'next/router';

const LanguageSwitch = () => {
	const router = useRouter()

	return(
		<div>
			<ul>
				{router.locales.map(locale => (
					<li key={locale}>
						<button
							type="button"
							onClick={() => {
								router.push({
									pathname: router.pathname,
									query: router.query,
								}, null, { locale })
							}}
						>
							{locale.toUpperCase()}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
};

export default LanguageSwitch;
