import React from 'react';
import { createTheme } from '@mui/material/styles';
import { LinkProps as RouterLinkProps, Link as RouterLink } from 'react-router-dom';

const LinkBehavior = React.forwardRef<
	any,
	Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
	const { href, ...other } = props;
	// Map href (MUI) -> to (react-router)
	return <RouterLink ref={ref} to={href} {...other} />;
});

// A custom theme for this app
const theme = createTheme({
	palette: {
		mode: 'dark'
	},
	components: {
		// MuiLink: {
		// 	defaultProps: {
		// 		component: LinkBehavior,
		// 	},
		// },
		MuiButtonBase: {
			defaultProps: {
				LinkComponent: LinkBehavior,
			},
		},
	},
});

export default theme;