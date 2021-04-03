import React, { useState, useCallback } from 'react';

import {
	NavContainer,
	Nav,
	NavAnchor,
	NavButton,
	OptionsContainer,
	Option,
} from './styles';

export default function Navbar() {
	const [optionsVisible, setOptionsVisible] = useState(false);

	const handleOptionsVisibility = useCallback(() => {
		setOptionsVisible(!optionsVisible);
	}, [optionsVisible]);

	return (
		<NavContainer>
			<Nav>
				<NavAnchor to="#" />
				<NavButton onClick={() => handleOptionsVisibility()}>
					+
					<OptionsContainer>
						<Option type="button">Valor desse mês</Option>
						<Option type="button">Valor desse mês + comida + gás</Option>
					</OptionsContainer>
				</NavButton>
				<NavAnchor to="#" />
			</Nav>
		</NavContainer>
	);
}
