import Box from '@mui/material/Box';

const DevNotes = () => {
	return (
		<Box
			sx={theme => ({
				backgroundColor: theme.palette.grey['900'],
				borderRadius: theme.shape.borderRadius,
				padding: theme.spacing(2),
				margin: theme.spacing(1),
				color: theme.palette.text.secondary,
			})}
		>
			<p>Neon Nacho Labs is my place to experiment with Ethereum and web3 projects. It's a testing ground for random ideas. Bugs and needed improvements are a certainty.</p>
			<p><strong>Idea & Background</strong></p>
			<p>With this proof-of-concept project, I'm playing around with the idea of augmenting an existing NFT by creating a "child" NFT based on it.</p>
			<p>The image that gets generated is somewhat arbitrary, and secondary to the idea of creating NFTs from other NFTs. But I thought an NFT in jail would be a fun example.</p>
			<p>The goal was to keep it super simple, so some trade-offs were made that I believe are okay for this project. Had this been a production ready project meant for a large audience then I'd likely have made some different decisions.</p>
			<p><strong>Tech Stack</strong></p>
			<p>This uses the Moralis SDK to comunicate with the Ethereum network in order to authenticate the user, pull a list of their NFTs, upload data to IPFS, then ultimately call a mint function in a custom smart contract.</p>
			<p>The image generation is done from a custom backend API running Node.js and Express.js that takes the image of an existing NFT taken from the token ID and address that's passed in, and using a Node.js based implementation of the Canvas API, overlays a separate transparent image of jail bars, then finally uploads the image and the metadata for the token to IPFS.</p>
			<p>The frontend is a React app written in Typescript using the MUI component library</p>
			<p><strong>Trade-offs & Considerations</strong></p>
			<p>The current implementation generates the image before mint and sends the IPFS hash of the token metadata directly from the fron frontend. Because of this it's possible for a user to manipulate that data and essentially mint a token using the IPFS has of anything they want. Again, because this is an experimental project, I decided that that was an okay tradeoff.</p>
			<p>Another approach that I explored was to serve the metadata and image from a custom API, which would allow that data to be manipulated freely by me and would remove that ability for the user to mint any IPFS has they want. However, because maintaining a API long term might not be feasible for such an experimental project I went with the current implementation. I'd much rather allow the minted tokens to be available directly from IPFS immediately to increase decentralization.</p>
			<p>Yet another approach that could be considered would be to use an oracle and a custom API to handle the image generation after a successful mint.</p>
			<p>If there's any interest in this project then perhaps I'll continue iterating on it.</p>
			<p>Thanks for reading, and feel free to reach out on <a href="https://twitter.com/traviswalter" target="_blank">Twitter</a>.</p>
		</Box>
	)
}

export default DevNotes;