import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function NFTCollections() {
	return (
		<Box>
			<Typography
				variant="h3"
				textAlign="center"
				m="1rem"
			>
				NFT Collections
			</Typography>
			<Box
				sx={{
					margin: { sm: '0 1rem', md: '0 5rem', lg: '0 10rem', xl: '0 15rem' }
				}}
			>
				<Typography
					variant="h5"
					textAlign="center"
					m="1rem"
				>
					The Cerulean System (coming soon)
				</Typography>

				<Typography
					variant="body1"
					paragraph={true}
					textAlign="center"
				>
					A future sci-fi world with a constantly unfolding story line, illustrated by a veteran NASA space artist. The genesis series (minting soon) will contain a very limited supply of 1-of-1 pieces.
				</Typography>

				<Grid container justifyContent="center" alignItems="center" direction="column">
					<Grid item key="zombie" justifyContent="center" alignItems="center">
						<img
							src='images/cerulean-1.jpg'
							alt="The Cerulean System"
							loading="lazy"
							style={{display:"block", width: "90%", height:"auto", margin:"0 auto"}}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

export default NFTCollections;