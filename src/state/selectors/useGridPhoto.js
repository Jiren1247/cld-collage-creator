import isNil from "lodash/isNil";
import { createSelectorFamilyHook } from "recoil-spring";
import atoms  from "../store";
import getEmptyGridCells from "../getEmptyGridCells";

const {
	gridPhotos,
} = atoms;

const useGridPhoto = createSelectorFamilyHook(
	gridPhotos,
	(param, { photo, options = {} }, { set, reset, get }) => {
		if (photo === null) {
			reset(gridPhotos(param));
		} else if (!isNil(param)) {
			set(gridPhotos(param), photo);
		} else {
			//set photo in first empty cell
			//Would have been nice to do in a transaction but Recoil doesnt support selectors use :(
			const [cellId] = getEmptyGridCells([photo], get);

			if (cellId) {
				set(gridPhotos(cellId), photo);
			}
		}

		if (options.orgCellId && !options.copy) {
			//remove the photo from the original cell
			reset(gridPhotos(options.orgCellId));
		}
	}
);

export default useGridPhoto;
