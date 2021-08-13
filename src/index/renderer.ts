// In renderer process (web page).
import { ipcRenderer } from 'electron';
import { MessageType } from './constants';
import { BreedDetailWithPhotos } from '../components/BreedContainer';
import SideBar from '../components/SideBar';
import Content from '../components/Content';
import RandomBreedPage from '../pages/RandomBreedPage';
import { DogsData } from '../models/accessDogAPI';
import BreedGroupsPage from '../pages/BreedGroupsPage';
import navigation from '../models/navigation';

const container = document.getElementById('container') as HTMLDivElement;
const sideBar = SideBar([
	{ title: 'Breed', onClick: () => {} },
]);
const contentElem = Content();
container.appendChild(sideBar);
container.appendChild(contentElem.element);

navigation.contentComponent = contentElem;

async function getNextBreedData(): Promise<BreedDetailWithPhotos | null> {
	return await ipcRenderer.invoke(MessageType[MessageType.requestNextBreedData]) as BreedDetailWithPhotos | null;
}

async function getDogsData(): Promise<DogsData> {
	return await ipcRenderer.invoke(MessageType[MessageType.requestDogsData]) as DogsData;
}

function showRandomBreedPage() {
	navigation.navigate(new RandomBreedPage(getNextBreedData));
}

function showStuff() {
	getDogsData().then((data) => {
		navigation.navigate(new BreedGroupsPage(data.breedsData, data.groupToIds));
	});
}

showStuff();
// showRandomBreedPage();
