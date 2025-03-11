import { Suspense } from "react";
import styled from "styled-components";
import Container from "@mui/material/Container";
import { DndProvider } from "react-dnd";
import Topbar from "../Topbar";
import AppDrawer from "../AppDrawer";
import getDndBackend from "../DragDropBackend";
import Collage from "../Collage";
import Notifications from "../Notifications";
import CollageActions from "../CollageActions";
import CollageFloatingMenu from "../CollageFloatingMenu";
import CollagePhotos from "../CollagePhotos";
import UploadyConnector from "../UploadyConnector";
import CollageUploadDropZone from "../CollageUploadDropZone";
import PageSpinner from "../PageSpinner";
import { useCollagesPoller } from "../../state/setters";

const AppContainer = styled.div`
	position: relative;
  width: 100%;
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    padding: 0 10px;
  }
`;

const CollageCreator = () => {
	useCollagesPoller();
	// const [uploadedImages, setUploadedImages] = useState([]);

	return (
		<UploadyConnector>
			<DndProvider backend={getDndBackend()}>
				<Suspense fallback={<PageSpinner/>}>
					<Notifications/>
					<CollageUploadDropZone>
						<Topbar/>
						<AppContainer>
							<CollageActions/>
							<Container maxWidth="xl" sx={{ display: "flex", pb: 50, position: "relative" }}>
								<Collage/>
								<CollageFloatingMenu/>
							</Container>
							<CollagePhotos/>
						</AppContainer>
						<AppDrawer/>
					</CollageUploadDropZone>
				</Suspense>
			</DndProvider>
		</UploadyConnector>
	);
};

export default CollageCreator;
