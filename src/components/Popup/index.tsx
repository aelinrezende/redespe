import React, { memo } from 'react';

import { usePopup, PopupProps } from '../../hooks/popup';

import { Overlay, Container, CrossIcon, Content } from './styles';

const Popup: React.FC<PopupProps> = ({ title, body }) => {
	const { removePopup } = usePopup();
	return (
		<>
			<Overlay onClick={() => removePopup()} />
			<Container>
				<CrossIcon onClick={() => removePopup()} />

				<Content>
					<h1>{title}</h1>
					<p>{body}</p>
				</Content>
			</Container>
		</>
	);
};

Popup.defaultProps = {
	title: 'Nada aqui :|',
	body: '...',
};

export default memo(Popup);
