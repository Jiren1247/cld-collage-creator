import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "../../consts";
import useDndKeyboardSupport from "./useDndKeyboardSupport";
import { useSetPhotoOverCell } from "../../state/setters";

//TODO: implement clean preview of dragged photo (https://stackoverflow.com/questions/69440259/how-to-implement-react-dnd-usedraglayer)

const useAsPhotoDragSource = ({ photo, onlyWithKeys = [], orgCellId }) => {
	const dndKeyboardSupport = useDndKeyboardSupport();
	const setPhotoOverCell = useSetPhotoOverCell();

	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: DRAG_TYPES.PHOTO,
		item: { photo, orgCellId },
		// options: { dropEffect: "copy"  },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
		canDrag: () => {
			return !!photo &&
				(!onlyWithKeys?.length ||
					dndKeyboardSupport.areDragKeysPressed(onlyWithKeys));
		},
		end: () => {
			setPhotoOverCell(null);
		},
	}), [photo]);

	return { dragRef, isDragging };
};

export default useAsPhotoDragSource
