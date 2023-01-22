import styled from "styled-components";
import Typography from "@mui/material/Typography";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import HideImageIcon from "@mui/icons-material/HideImage";
import { useGridCellsCalculator } from "../../state/setters";
import useGridPhoto from "../../state/selectors/useGridPhoto";
import TooltipIconButton from "../TooltipIconButton";
import ContainerActions from "../ContainerActions";
import Tooltip from "../Tooltip";

const StyledContainerActions = styled(ContainerActions)`
	width: 100%;

  .action-circle-container {
    &:first-child {
      width: 100%;
    }

    .action-circle {
	    ${({ theme }) => `	   
	   	      
	      ${theme.breakpoints.up("sm")} {
	        width: 60px;
	      }
	      
        ${theme.breakpoints.down("sm")} {
	        width: 40px;
	        
	        svg {
	          width: 18px;
	          height: 18px;
	        }
	      }
	    `}
    }
  }
`;

const CellActions = ({ id, presentationId, isOverriding, hasPhoto, cellRef }) => {
	const calcCells = useGridCellsCalculator();
	const setGridPhoto = useGridPhoto()[1];

	const onUnmergeOverride = () => {
		calcCells({ override: { source: id, unmerge: true } });
	};

	const onRemovePhoto = () => {
		setGridPhoto(id, { photo: null });
	};

	return (
		<StyledContainerActions
			firstAlwaysShow
			containerRef={cellRef}
			actions={[
				{
					key: "id",
					component:
					<Tooltip
						simple
						title={hasPhoto ? "" : "Drag a photo over"}
						nextDelay={0}
					>
						<Typography variant="h4" color="secondary.main">{presentationId}</Typography>
					</Tooltip>,
				},
				//show unmerge button if overriding
				isOverriding && {
					key: "unmerge",
					component:
						<TooltipIconButton
							onClick={onUnmergeOverride}
							icon={<SettingsOverscanIcon fontSize="medium"/>}
							color="secondary"
							aria-label="unmerge overridden cells"
							tooltipText="Unmerge joined cells"
							tooltipDelay={300}
						/>,
				},
				hasPhoto && {
					key: "unphoto",
					component:
						<TooltipIconButton
							onClick={onRemovePhoto}
							icon={<HideImageIcon fontSize="medium"/>}
							aria-label="remove photo from cell"
							color="secondary"
							tooltipText="Clear photo from cell"
							tooltipDelay={300}
						/>,
				},
			]}
		/>
	);
};

export default CellActions;
