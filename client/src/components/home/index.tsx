import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function Home() {
	return (
		<Box>
			<Typography
				variant="h3"
				textAlign="center"
				m="1rem"
			>
				WTF
			</Typography>
			<Box
				sx={{
					margin: { sm: '0 1rem', md: '0 5rem', lg: '0 10rem', xl: '0 15rem' }
				}}
			>
				<Typography
					variant="body1"
					paragraph={true}
				>
					Hi, my name is Travis Walter and I've been in the software development field, mainly web2, for many years. I got into crypto in 2017 and then into web3 and Solidity development in the end of 2021. I'm fascinated with everything web3, blockchain, and crypto and continue to go deeper into the rabbit hole. Neon Nacho Labs is my place to experiment with web3 projects. It's a playground for random ideas. A place to learn and build as I venture deep into the heart of this brave new web.
				</Typography>
				<Typography
					variant="body1"
					paragraph={true}
				>
					Everything on this site is experimental and most likely in an early in-progress-proof-of-concept stage. You'll find very little polish and more than likely a few bugs. Everything here is open source so feel free to take a look at <Link href="https://github.com/Neon-Nacho-Labs">the code</Link>, and use anything that you find useful.
				</Typography>
				<Typography
					variant="body1"
					paragraph={true}
				>
					Thanks for visiting and feel free to reach out on <Link href="https://twitter.com/traviswalter">Twitter</Link> or <Link href="https://www.linkedin.com/in/travispwalter/">LinkedIn</Link>.
				</Typography>
			</Box>
		</Box>
	);
}

export default Home;