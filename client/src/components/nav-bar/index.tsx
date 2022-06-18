import React from "react";
import {
	Routes,
	Route,
	Link
  } from "react-router-dom";
import NFTJail from '../nft-jail';
import Home from '../home';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Menu as MenuIcon} from '@mui/icons-material'

const pages = [
	{
		link: '/',
		label: 'Home'
	},
	{
		link: '/nft-jail',
		label: 'NFT Jail'
	},
];

function NavBar() {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
  	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	return (
		<>
			<AppBar position="static">
				<Toolbar>
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="/"
					sx={{
					mr: 2,
					display: { xs: 'none', md: 'flex' },
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'inherit',
					textDecoration: 'none',
					}}
				>
					Neon Nacho Labs
				</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="hidden menu"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
							display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page.label} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">
										<Link to={page.link}>{page.label}</Link>
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Typography
					variant="h5"
					noWrap
					component="a"
					href=""
					sx={{
						mr: 2,
						display: { xs: 'flex', md: 'none' },
						flexGrow: 1,
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
					>
					Neon Nacho Labs
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							// <NavLink to={page.link}>{page.label}</NavLink>
							<Button
								key={page.label}
								href={page.link}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
							{page.label}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/nft-jail" element={<NFTJail />} />
			</Routes>
		</>
	);
}

export default NavBar;
