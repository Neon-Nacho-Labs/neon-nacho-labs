import { useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DialogActions, DialogContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Link from '@mui/material/Link';

import { API_BASE_URL } from '../../config/constants';
import Step from '../step';
import DevNotes from './dev-notes';

function NFTJail() {
	const { authenticate, isAuthenticated, isAuthenticating, user, logout, Moralis } = useMoralis();
	const Web3Api = useMoralisWeb3Api();
	const ETH_CHAIN = 'eth'; // eth = mainnet
	// const NFTJAIL_CONTRACT_ADDRESS = '0x0D71CF48ef18652f585B26cC435343387BFB8EdC'; // goerli
	// const NFTJAIL_ETHERSCAN_URL = "https://goerli.etherscan.io/address/" + NFTJAIL_CONTRACT_ADDRESS;
	const NFTJAIL_CONTRACT_ADDRESS = '0xF8a826586ee2bd9F1Fdd286F9E5099fd01096BC7';
	const NFTJAIL_ETHERSCAN_URL = "https://etherscan.io/address/" + NFTJAIL_CONTRACT_ADDRESS;

	// TODO: Move to separate interfaces file
	interface INFT {
		metadata: string;
		name: string;
		token_address: string;
		token_id: string;
	};

	interface IGeneratedImage {
		metadata: {
			image: string,
		};
		metadataHash: string;
	};

	// TODO: combine state into a single object.
	const [ nfts, setNfts ] = useState<INFT[]>( [] );
	const [ selectedNft, setSelectedNft ] = useState<INFT>();
	const [ selectedNftURL, setSelectedNftURL ] = useState<string>();
	const [ generatedNft, setGeneratedNft ] = useState<IGeneratedImage>();
	const [ isNftDialogOpen, setIsNftDialogOpen ] = useState<boolean>(false);
	const [ mintComplete, setMintComplete ] = useState<boolean>(false);
	const [ isGenerateImageRunning, setIsGenerateImageRunning ] = useState<boolean>(false);
	const [ isMintRunning, setIsMintRunning ] = useState<boolean>(false);
	const [ ethValue, setEthValue ] = useState<number>(0);
	const [ isSnackBarOpen, setIsSnackBarOpen ] = useState<boolean>(false);
	const [ snackBarMessage, setSnackBarMessage ] = useState<string>();

	const ethers = Moralis.web3Library;

	useEffect(() => {
		if (isAuthenticated) {
			// Fixes intermittent error about a missing web3 instance
			enableWeb3();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	const enableWeb3 = async () => {
		Moralis.enableWeb3({ provider: "metamask" })
			.then(result => console.log('enableWeb3 then', result))
			.catch(result => console.log('enableWeb3 catch', result));
	}

	const login = async () => {
		if ( ! isAuthenticated ) {

			await authenticate( {signingMessage: "Log in to Neon Nacho Labs" } )
				.then( function (user) {
					console.log("logged in user: ", user!.get("ethAddress"));
				} )
				.catch( function ( error ) {
					console.log( error );
				} );
		}
	}

	const logOut = async () => {
		await logout();
		console.log("logged out");
	}

	const getNFTs = async () => {
		console.log('getting NFTs...');
		let userNFTs = await Web3Api.account.getNFTs({
			chain: ETH_CHAIN,
			address: user!.get('ethAddress'),
		});

		if ( ! userNFTs || ! userNFTs.result ) {
			console.log('Could not find NFTs :(');
			return;
		}

		setNfts( userNFTs.result as INFT[] );
		toggleOpenDialog();
	}

	const renderNFTs = () => {
		const NFTImages: any[] = [];
		nfts.map( ( userNFT, index ) => {
			let metadata = JSON.parse(userNFT.metadata as string);
			let imageUrl = metadata?.image ? updateImageURL( metadata.image ) : '';
			let name = metadata?.name ?? '';

			NFTImages.push(
				<NFTImage
					src={imageUrl}
					key={index}
					index={index}
					name={name}
					contractName={userNFT.name}
					tokenId={userNFT.token_id}
					handleOnClick={selectNft}
					handleRefreshMetadata={refreshMetaData}
				/>
			);

			return true;
		} );

		return NFTImages;
	}

	const renderNFTsinDialog = () => {
		const NFTItems: any[] = [];
		nfts.map( ( userNFT, index ) => {
			let metadata = JSON.parse(userNFT.metadata as string);
			let imageUrl = metadata?.image ? updateImageURL( metadata.image ) : '';
			let name = metadata?.name ?? '';

			NFTItems.push(
				<NFTItem
					src={imageUrl}
					key={index}
					index={index}
					name={name}
					contractName={userNFT.name}
					tokenId={userNFT.token_id}
					handleOnClick={selectNft}
					handleRefreshMetadata={refreshMetaData}
				/>
			);

			return true;
		} );

		return NFTItems;
	}

	const selectNft = (selectedIndex: number) => {
		let metadata = JSON.parse( nfts[selectedIndex]?.metadata as unknown as string );
		setSelectedNft( nfts[selectedIndex] );
		setSelectedNftURL( updateImageURL(metadata.image) );

		toggleOpenDialog();
	}

	const mint = async () => {
		console.log( 'initiating mint...' );

		const ethValueInWei = ethers.utils.parseEther(String(ethValue)).toString();

		const { abi } = require('../../contracts/NFTJail.json');

		const options = {
			chain: ETH_CHAIN,
			contractAddress: NFTJAIL_CONTRACT_ADDRESS,
			functionName: "mint",
			abi: abi,
			msgValue: ethValueInWei,
			params: {
				parentContractAddress: selectedNft?.token_address,
				parentTokenId: selectedNft?.token_id,
				_tokenURI: generatedNft?.metadataHash
			},
		};

		setIsMintRunning(true);

		Moralis.executeFunction(options)
		.then(result => {
			console.log( 'done', result );
			setIsMintRunning(false);
			setMintComplete(true);
		}).catch(result => {
			console.log( result );
			setSnackBarMessage(result?.error?.message || 'Error minting token. See browser console for more details.');
			setIsSnackBarOpen(true);
			setIsMintRunning(false);
		});
	}

	const generateImage = async () => {
		if ( ! selectedNft || ! selectedNft.token_address || ! selectedNft.token_id ) {
			console.log( 'missing data :(' );
			return;
		}
		console.log( 'generating image...' );
		setIsGenerateImageRunning(true);
		setGeneratedNft(undefined);

		axios.post( API_BASE_URL + '/create-jailed-token', {
				user_address: user!.get( 'ethAddress' ),
				token_address: selectedNft.token_address,
				token_id: selectedNft.token_id
		}).then( response => {
			setIsGenerateImageRunning(false);
			setGeneratedNft( {
				metadata: response.data.metadata,
				metadataHash: response.data.metadataHash
			} );
		}).catch( result => {
			setIsGenerateImageRunning(false);
			console.log(result);
			setSnackBarMessage(result?.message || 'Error generating image. See browser console for more details.');
			setIsSnackBarOpen(true);
		});
	}

	const updateImageURL = ( imageUrl: string ) : string => {
		if ( imageUrl.search('ipfs://') > -1) {
			imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/');
		}
		return imageUrl;
	}

	const refreshMetaData = (selectedIndex: number) => {
		console.log('Refreshing metadata...');
		Web3Api.token.reSyncMetadata({
			address: nfts[selectedIndex].token_address,
			token_id: nfts[selectedIndex].token_id,
			flag: "metadata",
			chain: ETH_CHAIN,
		});
	}

	const toggleOpenDialog = () => {
		setIsNftDialogOpen(!isNftDialogOpen);
	}

	return (
		<Box>
			<Typography
				variant="h3"
				textAlign="center"
				m="1rem"
			>
				NFT Jail
			</Typography>

			<Typography
				paragraph={true}
				textAlign="center"
			>
				Mint a new NFT by putting your existing NFT behind bars (original NFT is unaffected). Free mint and donations accepted.
			</Typography>

			<Grid container justifyContent="center" spacing={{ xs: 0.5, sm: 2, md: 3 }}>
				<Grid item key="baby-gob">
					<img
						src='images/baby-gob-jail-s-min.jpeg'
						alt="Baby Gob in jail"
						loading="lazy"
						style={{height: 100, width: 100}}
					/>
				</Grid>
				<Grid item key="zombie-hobo">
					<img
						src='images/hobo-jail-s-min.jpeg'
						alt="Zombie Hobo in jail"
						loading="lazy"
						style={{height:100, width: 100}}
					/>
				</Grid>
				<Grid item key="chain-runner">
					<img
						src='images/runner-in-jail-s-min.jpeg'
						alt="Chain Runner in jail"
						loading="lazy"
						style={{height:100, width: 100}}
					/>
				</Grid>
				<Grid item key="zombie" sx={{display: {xs:'none', sm: 'inline'}}}>
					<img
						src='images/zombie-jail-s-min.jpeg'
						alt="Zombie in jail"
						loading="lazy"
						style={{height:100, width: 100}}
					/>
				</Grid>
        	</Grid>

			{/* TODO: Delete once using mainnet */}
			{/* <Alert severity="error">Currently running on testnet: {ETH_CHAIN}</Alert> */}

			<Grid container spacing={2}>
				<Grid item xs={12} sm={8}>
					<Step
						stepNumber = "1"
						description = "Connect with Metamask"
						button1Text = "Connect"
						button1ClickHandler = {login}
						button1Disabled = {isAuthenticating || isAuthenticated}
						button2Text = "Logout"
						button2ClickHandler = {logOut}
						button2Disabled = {isAuthenticating || !isAuthenticated}
						isDone = {isAuthenticated}
					/>

					<Step
						stepNumber = "2"
						description = "Choose your NFT to put in jail"
						button1Text = "Choose NFT"
						button1ClickHandler = {getNFTs}
						button1Disabled = {!isAuthenticated}
						isDone = {!!selectedNft}
						hasImage = {true}
						imgSrc = {selectedNftURL}
						isLoading = {isMintRunning}
					/>

					<Step
						stepNumber = "3"
						description = "Generate the new image based on your NFT"
						button1Text = "Generate image"
						button1ClickHandler = {generateImage}
						button1Disabled = {!selectedNft || isGenerateImageRunning}
						isDone = {!!generatedNft}
						hasImage = {true}
						imgSrc = {updateImageURL( generatedNft?.metadata.image || '' )}
						isLoading = {isGenerateImageRunning}
						buttonSubText = "This might take some time"
						hasIPFSHash = {true}
						IPFSHash = {generatedNft?.metadataHash}
					/>

					<Step
						stepNumber = "4"
						description = "Mint your new NFT – It's free but you can send ETH if you like what you see"
						button1Text = "Mint"
						button1ClickHandler = {mint}
						button1Disabled = {!generatedNft || isGenerateImageRunning}
						isDone = {mintComplete}
						showSlider = {true}
						ethValue = {ethValue}
						setEthValue = {setEthValue}
					/>

					<Alert severity="info">If you'd like to mint directly from <Link href={NFTJAIL_ETHERSCAN_URL}>the contract</Link>, you'll need to get the IPFS hash from the 'Generate Image' step and enter it as the '_tokenURI' argument in the 'mint' function.</Alert>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography
						variant="h5"
						noWrap
						textAlign="center"
					>
						Dev Notes
					</Typography>
					<DevNotes/>
				</Grid>
			</Grid>

			<Dialog
				open={isNftDialogOpen}
				onClose={toggleOpenDialog}
				fullWidth
				maxWidth="lg"
				scroll="paper"
			>
				<DialogTitle>Select your NFT</DialogTitle>
				<DialogContent dividers>
					<Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={1} justifyContent="center">
							{renderNFTsinDialog()}
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={toggleOpenDialog}>Close</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={isSnackBarOpen}
				autoHideDuration={6000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={() => setIsSnackBarOpen(false)}
			>
				<Alert
					severity="error"
					sx={{ width: '100%' }}
					onClose={() => setIsSnackBarOpen(false)}
				>
					{snackBarMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
}

interface NFTImageProps {
	index: number;
	src: string;
	name: string;
	contractName: string ;
	tokenId: string;
	handleOnClick(selectedIndex: number): any;
	handleRefreshMetadata(selectedIndex: number): any;
}

function NFTImage(props: NFTImageProps) {
	return (
		<li>
			<div onClick={() => props.handleOnClick(props.index)}>
				<img
					src={props.src}
					width={200}
					height={200}
					alt=""
					onClick={() => props.handleOnClick(props.index)}
				/>
				<div>{props.name || props.contractName + ' #' + props.tokenId}</div>
			</div>
			<button onClick={() => props.handleRefreshMetadata(props.index)}>Refresh metadata</button>
		</li>
	);
}

interface NFTItemProps {
	index: number;
	src: string;
	name: string;
	contractName: string ;
	tokenId: string;
	handleOnClick(selectedIndex: number): any;
	handleRefreshMetadata(selectedIndex: number): any;
}

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

function NFTItem(props: NFTItemProps) {
	return (
		<Grid item key={props.index}>
            <Item>
				<div onClick={() => props.handleOnClick(props.index)}>
					<img
					src={props.src}
					width={150}
					height={150}
					alt=""
					onClick={() => props.handleOnClick(props.index)}
					/>
					<div>{props.name || props.contractName + ' #' + props.tokenId}</div>
				</div>
				<Button onClick={() => props.handleRefreshMetadata(props.index)}>Refresh metadata</Button>
			</Item>
		</Grid>

	);
}

export default NFTJail;