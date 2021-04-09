import React, { memo } from 'react';

import Amount from '../../components/Amount/';
import Navbar from '../../components/Navbar/';

import { Container } from './styles';

const Total: React.FC = () => {
	return (
		<Container>
			<Amount route="/expenses" />
			<Navbar />
		</Container>
	);
};

export default memo(Total);
