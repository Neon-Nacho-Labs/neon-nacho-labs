import React from "react";
import {
	Routes,
	Route,
	Link
  } from "react-router-dom";
import NFTJail from '../nft-jail';
import Home from '../home';
import Coins from '../coins';
import NFTCollections from '../nft-collections';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Menu as MenuIcon} from '@mui/icons-material'
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import MUILink from '@mui/material/Link';

const pages = [
	{
		link: '/',
		label: 'WTF'
	},
	{
		link: '/nft-jail',
		label: 'NFT Jail'
	},
	{
		link: '/coins',
		label: 'Coins'
	},
	{
		link: '/nft-collections',
		label: 'NFT Collections'
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
							fontFamily: 'Consolas,"Liberation Mono","Courier New",monospace;',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: '#16E951',
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
								<MenuItem key={page.label} onClick={handleCloseNavMenu} sx={{
									padding:0,
									margin:0,
									display: 'block',
									width: '100%'
								}}>
									<Typography textAlign="left">
										<Link to={page.link} style={{
											textDecoration: 'none',
											color: 'white',
											padding: '.5rem',
											display: 'block',
											width: '100%'
										}}>
											{page.label}
										</Link>
									</Typography>
								</MenuItem>
							))}
							<MenuItem key="twitter" onClick={handleCloseNavMenu} sx={{
								padding:0,
								margin:0,
								display: 'block',
								width: '100%'
							}}>
								<Typography textAlign="left">
									<MUILink href="https://twitter.com/traviswalter" sx={{
											textDecoration: 'none',
											color: 'white',
											padding: '.5rem',
											display: 'block',
											width: '100%',
										}}>
										<TwitterIcon /> Twitter
									</MUILink>
								</Typography>
							</MenuItem>
							<MenuItem key="github" onClick={handleCloseNavMenu} sx={{
								padding:0,
								margin:0,
								display: 'block',
								width: '100%'
							}}>
								<Typography textAlign="left">
									<MUILink href="https://github.com/Neon-Nacho-Labs" sx={{
											textDecoration: 'none',
											color: 'white',
											padding: '.5rem',
											display: 'block',
											width: '100%',
										}}>
										<GitHubIcon /> Github
									</MUILink>
								</Typography>
							</MenuItem>
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
							color: '#16E951',
							textDecoration: 'none',
						}}
					>
						Neon Nacho Labs
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
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

					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton size="large" color="inherit" href="https://twitter.com/traviswalter" LinkComponent="a">
							<TwitterIcon />
						</IconButton>
						<IconButton size="large" color="inherit" href="https://github.com/Neon-Nacho-Labs" LinkComponent="a">
							<GitHubIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/nft-jail" element={<NFTJail />} />
				<Route path="/coins" element={<Coins />} />
				<Route path="/nft-collections" element={<NFTCollections />} />
			</Routes>
		</>
	);
}

export default NavBar;
