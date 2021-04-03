import React from 'react';

import Amount from '../../components/Amount/';
import Navbar from '../../components/Navbar/';

import { Container } from './styles';

const Total: React.FC = () => {
	return (
		<Container>
			<Amount route="/redespe/expenses" />
			<Navbar />
		</Container>
	);
};

export default Total;
