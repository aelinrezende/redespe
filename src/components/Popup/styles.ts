import styled from 'styled-components';
import { motion } from 'framer-motion';

import { CgClose } from 'react-icons/cg';

export const Overlay = styled(motion.div)`
	position: absolute;

	height: 100%;
	width: 100%;
	background: rgb(0 0 0 / 60%);
`;

export const Container = styled(motion.div)`
	position: absolute;

	min-width: 20rem;
	max-width: 35rem;
	background: #d4d5e4;
	padding: 2rem;
	border-radius: 10px;
	box-shadow: 0 15px 20px -5px rgb(0 0 0 / 50%);
`;
export const CrossIcon = styled(CgClose)`
	position: absolute;
	transform: translateY(50%);
	bottom: 100%;
	right: 1rem;

	background: #e00c0c;
	color: #070723;
	border-radius: 50%;
	height: 3.5rem;
	width: 3.5rem;
	padding: 0.7rem;
	box-shadow: 0 10px 15px -5px rgb(224 12 12 / 75%);
	cursor: pointer;
`;
export const Content = styled(motion.div)`
	h1 {
		font-size: 2.4rem;
		text-align: left;
	}

	p {
		font-size: 2rem;
		text-align: justify;
	}
`;
