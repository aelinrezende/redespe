import React, { useState, useCallback, memo } from 'react';
import { useMotionValue } from 'framer-motion';

import { useExpense } from '../../hooks/expense';
import { usePopup } from '../../hooks/popup';

import { nav } from './motion.variants';

import {
	NavContainer,
	Nav,
	NavAnchor,
	NavButton,
	OptionsContainer,
	Option,
	OptionsIcon,
} from './styles';

const Navbar: React.FC = () => {
	const [optionsVisible, setOptionsVisible] = useState(false);
	const { totals } = useExpense();
	const { addPopup } = usePopup();

	const toggleOptionsVisibility = useCallback(() => {
		setOptionsVisible(!optionsVisible);
	}, [optionsVisible]);

	const addMonthlyValuePopup = useCallback(() => {
		addPopup('Valor Mensal', 'R$' + totals.monthly.toFixed(2));
	}, [optionsVisible]);

	return (
		<NavContainer>
			<Nav>
				<NavAnchor to="#" />
				<NavButton onClick={() => toggleOptionsVisibility()}>
					<OptionsIcon />
					<OptionsContainer
						variants={nav.container}
						animate={optionsVisible ? 'visible' : 'hidden'}
					>
						<Option variants={nav.child} onClick={() => addMonthlyValuePopup()}>
							Valor desse mês
						</Option>
						<Option variants={nav.child}>Valor desse mês + comida + gás</Option>
						<Option variants={nav.child}>Criar</Option>
					</OptionsContainer>
				</NavButton>
				<NavAnchor to="#" />
			</Nav>
		</NavContainer>
	);
};

export default memo(Navbar);
