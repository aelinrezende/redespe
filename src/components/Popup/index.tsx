import React, { memo } from 'react';

import { usePopup, PopupProps } from '../../hooks/popup';
import { overlay, container } from './motion.variants';

import { Overlay, Container, CrossIcon, Content } from './styles';

const Popup: React.FC<PopupProps> = ({ title, body, ...rest }) => {
	const { removePopup } = usePopup();

	return (
		<>
			<Overlay
				animate={overlay.visible}
				exit={overlay.exit}
				transition={{ duration: 0.1 }}
				onClick={() => removePopup()}
			/>
			<Container
				animate={container.visible}
				exit={container.exit}
				transition={{ duration: 0.5 }}
				onClick={() => removePopup()}
			>
				<CrossIcon />

				<Content>
					<h1>{title}</h1>
					<p>{body}</p>
				</Content>
			</Container>
		</>
	);
};

export default memo(Popup);
