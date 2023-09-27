import { MouseEventHandler, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export default function useSlider(
	loadingData: unknown,
	sliderID: string,
	gapSize?: number,
): [number, MouseEventHandler, MouseEventHandler] {
	const [xPos, setXPos] = useState<number>(0);
	const [currentPos, setCurrentPos] = useState<number>(0);
	const [listItemCoords, setListItemCoords] = useState<Array<number>>();
	const [searchParams] = useSearchParams();

	const { pathname } = useLocation();

	const GAP = gapSize || 12;

	useEffect(() => {		
		const slider = document.getElementById(sliderID);
		const sliderItem = slider ? Array.from(slider?.children) : [];
		const sliderItemLength = sliderItem.map(elem => elem.clientWidth);
		setListItemCoords(sliderItemLength);
		setXPos(0);
		// Исправлена ошибка неверной прокрутки слайдера при переходе на другую странцу
		setCurrentPos(0);
	}, [loadingData, sliderID, pathname, searchParams]);

	const moveLeftSlider = () => {		
		const slider = document.getElementById(sliderID);
		const lastSliderItem = listItemCoords?.slice(currentPos);
		
		const lastSliderWidth =
			lastSliderItem?.reduce(
				(sum, currentWidth) => sum + currentWidth + GAP,
			) || 0;
		if (!slider || slider.clientWidth >= lastSliderWidth) return;
		setCurrentPos(currentPos + 1);
		listItemCoords && setXPos(xPos - listItemCoords[currentPos] - GAP);
	};
	const moveRightSlider = () => {
		if (currentPos === 0) return;
		if (!listItemCoords) return;
		if (currentPos + 1 >= listItemCoords.length) {
			setXPos(xPos + listItemCoords[currentPos - 1] + GAP);
			setCurrentPos(currentPos - 1);
		} else if (currentPos !== 1) {
			setCurrentPos(currentPos - 1);
			setXPos(xPos + listItemCoords[currentPos + 1] + GAP);
		} else {
			setCurrentPos(0), setXPos(0);
		}
	};
	return [xPos, moveLeftSlider, moveRightSlider];
}
