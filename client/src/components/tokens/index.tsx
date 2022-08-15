import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Tokens() {
	return (
		<Box>
			<Typography
				variant="h3"
				noWrap
				textAlign="center"
				m="1rem"
			>
				Tokens
			</Typography>
			<Box
				sx={{
					margin: { sm: '0 1rem', md: '0 5rem', lg: '0 10rem', xl: '0 15rem' }
				}}
			>
				<Typography
					variant="body1"
					paragraph={true}
					textAlign="center"
				>
					Coming soon
				</Typography>
			</Box>
		</Box>
	);
}

export default Tokens;