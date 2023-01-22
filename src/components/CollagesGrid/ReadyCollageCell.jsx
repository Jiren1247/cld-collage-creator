import styled from "styled-components";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { addUrlTransformation, timeAgo } from "../../utils";
import { useReadyCollage } from "../../state/selectors";
import ContainerActions from "../ContainerActions";
import TooltipIconButton from "../TooltipIconButton";
import BaseCell from "./BaseCell";
import Tooltip from "../Tooltip/Tooltip";
import Typography from "@mui/material/Typography";

const CollageCell = styled(BaseCell)`
  position: relative;
	
	.MuiTypography-caption {
		font-size: 1.2rem;
		font-weight: bold;
		margin: 2px 0;
  }
`;

const ImageContainer = styled.div`
  background-image: url("${({ $img }) => $img}");
  background-repeat: no-repeat;
  background-size: cover;
  flex-grow: 2;
	width: 100%;
`;

const ReadyCollageCell = ({ id }) => {
	const collage = useReadyCollage(id),
		collageImg = addUrlTransformation(collage.secure_url, "$&/w_200,dpr_2/");

	const onOpenCollage = () => {
		window.open(collage.secure_url);
	};

	const onCopyUrl = () => {
		navigator.clipboard.writeText(collage.secure_url);
	};

	return (
		collage &&
		<Tooltip
			simple
			title={collage.public_id}
		>
			<CollageCell data-url={collage.secure_url}>
				<ContainerActions actions={[
					{
						key: "open",
						component: <TooltipIconButton
							onClick={onOpenCollage}
							icon={<OpenInNewIcon fontSize="medium"/>}
							aria-label="open url in new tab"
							color="secondary"
							tooltipText="Open collage in a new tab"
							tooltipDelay={400}
						/>,
					},
					{
						key: "copy-url",
						component: <TooltipIconButton
							onClick={onCopyUrl}
							icon={<ContentCopyIcon fontSize="medium"/>}
							aria-label="copy url"
							color="secondary"
							tooltipText="Copy collage URL to clipboard"
							tooltipDelay={400}
						/>,
					},
				]}/>
				<ImageContainer $img={collageImg} />
				<Typography variant="caption">{timeAgo(collage.createTime)}</Typography>
			</CollageCell>
		</Tooltip>
	);
};

export default ReadyCollageCell;

