import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import { IS_DEV } from "../../consts";
import { useDebug, useMockUpload, useIsMonochromeGrid } from "../../state/selectors";
import { useGridCellsCalculator } from "../../state/setters";
import IconButtonMenu from "../IconButtonMenu";
import SimpleSwitch from "../SimpleSwitch";
import Tooltip from "../Tooltip";

//TODO: Add button to reset all settings (clear LS) with confirmation dialog

const SettingsMenu = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isDebug, setDebug] = useDebug();
	const [isMockUpload, setMockUpload] = useMockUpload();
	const isMonochromeGrid = useIsMonochromeGrid();
	const calcCells = useGridCellsCalculator();

	const toggleDebug = () => setDebug(!isDebug);
	const toggleMockUpload = () => setMockUpload(!isMockUpload);
	const toggleMonochrome = () => calcCells({ monochrome: !isMonochromeGrid });

	return (
		<IconButtonMenu
			onOpenChange={setMenuOpen}
			closeOnClick={false}
			icon={<SettingsIcon
				fontSize="large"
				color={isMenuOpen ? "disabled" : undefined}
			/>}
			tooltipTitle="Settings"
		>
			<MenuItem>
				<Tooltip simple title="Turn on to see debug messages in developer console">
					<FormControlLabel
						control={<SimpleSwitch checked={isDebug} onChange={toggleDebug}/>}
						label="Debug"
					/>
				</Tooltip>
			</MenuItem>
			{IS_DEV && <MenuItem>
				<FormControlLabel
					control={<SimpleSwitch checked={isMockUpload} onChange={toggleMockUpload}/>}
					label="Mock Upload"
				/>
			</MenuItem>}
			<MenuItem>
				<FormControlLabel
					control={<SimpleSwitch checked={isMonochromeGrid} onChange={toggleMonochrome}/>}
					label="Monochrome Grid"
				/>
			</MenuItem>
		</IconButtonMenu>
	);
};

export default SettingsMenu;
