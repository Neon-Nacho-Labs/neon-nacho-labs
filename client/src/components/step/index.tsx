import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import DoneIcon from '@mui/icons-material/Done';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

interface StepProps {
	stepNumber: string;
	description: string;
	button1Text: string;
	button1ClickHandler: React.MouseEventHandler<HTMLButtonElement>;
	button1Disabled: boolean;
	button2Text?: string;
	button2ClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
	button2Disabled?: boolean;
	imgSrc?: string;
	isDone?: boolean;
	hasImage?: boolean;
	isLoading?: boolean;
	buttonSubText?: string;
	showSlider?: boolean;
	ethValue?: number;
	setEthValue?: React.Dispatch<React.SetStateAction<number>>;
	IPFSHash?: string;
	hasIPFSHash?: boolean;
}

const Step = (props: StepProps) => {
	const {
		stepNumber,
		description,
		button1Text,
		button1ClickHandler,
		button1Disabled,
		button2Text,
		button2ClickHandler,
		button2Disabled,
		imgSrc,
		isDone,
		hasImage,
		isLoading,
		buttonSubText,
		showSlider,
		ethValue,
		setEthValue,
		IPFSHash,
		hasIPFSHash,
	} = props;

	const handleEthValueChangeSlider = (event: Event, newValue: number | number[]) => {
		setEthValue && setEthValue(newValue as number / 1000 as number);
	}

	const handleEthValueChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newValue: number = parseInt(event.target.value);
		setEthValue && setEthValue(newValue);
	};

	return (
		<Box
			sx={theme => ({
				// color: `rgba(${theme.palette.primary.main} / 0.72)`,
				backgroundColor: theme.palette.grey['900'],
				borderRadius: theme.shape.borderRadius,
				padding: theme.spacing(2),
				margin: theme.spacing(1),
				// ...theme.typography.body2,
				color: theme.palette.text.secondary,
			})}
		>
			<Grid container spacing={2}>
				<Grid item sm={12} md={4}>
					<Typography
						variant="h5"
					>
						Step {stepNumber}
						{isDone &&
							<DoneIcon color='success'/>
						}
					</Typography>

					<Typography
						variant="body1"
					>
						{description}
					</Typography>
				</Grid>
				<Grid item sm={12} md={4} textAlign='center'>
					{hasImage ?
						imgSrc ? (
							<img src={imgSrc} width="170" height="170" alt="" />
						) : (
							<Skeleton variant="rectangular" animation={isLoading ? 'pulse' : false} width={170} height={170} sx={{mx:"auto", my:0}}/>
						)
						: ''
					}
					{showSlider &&
						<Stack spacing={2} alignItems="center">
							<TextField
								id="eth-value"
								label="Eth amount to send"
								variant="outlined"
								value={ethValue}
								onChange={handleEthValueChangeText}
								InputLabelProps={{ shrink: true }}
							/>
							<Slider defaultValue={0} onChange={handleEthValueChangeSlider} max={100}/>
						</Stack>
					}
				</Grid>
				<Grid item sm={12} md={4} textAlign='right'>
					<Stack spacing={2}>
						<Box>
							<Button variant="outlined" onClick={button1ClickHandler} disabled={button1Disabled}>{button1Text}</Button>
							{button2Text && button2ClickHandler &&
								<Button variant="outlined" onClick={button2ClickHandler} disabled={button2Disabled}>{button2Text}</Button>
							}
						</Box>
						<Typography
							variant="subtitle2"
						>
							{buttonSubText}
						</Typography>
					</Stack>
				</Grid>
			</Grid>
			{hasIPFSHash ? (
				imgSrc ? (
					<Box
						textAlign='center'
						sx={theme => ({
							color: theme.palette.success,
							mt: theme.spacing(1)
						})}
					>
						IPFS hash: <strong>{IPFSHash}</strong>
					</Box>
				) : (
					<Skeleton variant="rectangular" animation={isLoading ? 'pulse' : false} width={300} height={25} sx={{mx: "auto", mt: 2, mb: 0}}/>
				)
			) : ''
			}
		</Box>
	);
}

export default Step;