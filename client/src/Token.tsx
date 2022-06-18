import { useParams } from 'react-router-dom';

export default function Token() {
	const { tokenid } = useParams();
	console.log(tokenid);

	// let tokenObject = {};
	switch(tokenid) {
		case '1':
			window.location.href='/token-' + tokenid + '.json';
			break;
		default:
	}

	return <></>;
}