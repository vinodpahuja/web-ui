import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { ContainerContext } from './ContainerContext';
import Sheet from './Sheet/Sheet';
import './BottomSheet.scss';
import LocationDetails from '../LocationDetails/LocationDetails';
import Wayfinding from '../Wayfinding/Wayfinding';
import Directions from '../Directions/Directions';
import Search from '../Search/Search';

const BOTTOM_SHEETS = {
    SEARCH: 0,
    LOCATION_DETAILS: 1,
    WAYFINDING: 2,
    DIRECTIONS: 3
};

/**
 * @param {Object} props
 * @param {Object} props.currentLocation - The currently selected MapsIndoors Location.
 */
function BottomSheet({ currentLocation }) {

    const bottomSheetRef = useRef();
    const [activeBottomSheet, setActiveBottomSheet] = useState(null);

    /*
     * React on changes on the current location.
     */
    useEffect(() => {
        setActiveBottomSheet(currentLocation ? BOTTOM_SHEETS.LOCATION_DETAILS : undefined);
    }, [currentLocation]);

    useEffect(() => {
        setActiveBottomSheet(BOTTOM_SHEETS.SEARCH);
    }, [])

    function setCurrentLocation(location) {
        currentLocation = location;
        setActiveBottomSheet(BOTTOM_SHEETS.LOCATION_DETAILS);
    }

    const bottomSheets = [
        <Sheet minHeight="128" isOpen={activeBottomSheet === BOTTOM_SHEETS.SEARCH} key="A">
            <Search onLocationClicked={(location) => setCurrentLocation(location)} />
        </Sheet>,
        <Sheet minHeight="128" isOpen={activeBottomSheet === BOTTOM_SHEETS.LOCATION_DETAILS} key="B">
            <LocationDetails onStartWayfinding={() => setActiveBottomSheet(BOTTOM_SHEETS.WAYFINDING)} location={currentLocation} onBack={() => setActiveBottomSheet(BOTTOM_SHEETS.SEARCH)} />
        </Sheet>,
        <Sheet minHeight="220" isOpen={activeBottomSheet === BOTTOM_SHEETS.WAYFINDING} key="C">
            <Wayfinding onStartDirections={() => setActiveBottomSheet(BOTTOM_SHEETS.DIRECTIONS)} onBack={() => setActiveBottomSheet(BOTTOM_SHEETS.LOCATION_DETAILS)} />
        </Sheet>,
        <Sheet minHeight="220" isOpen={activeBottomSheet === BOTTOM_SHEETS.DIRECTIONS} key="D">
            <Directions onBack={() => setActiveBottomSheet(BOTTOM_SHEETS.WAYFINDING)} />
        </Sheet>
    ]

    return <div ref={bottomSheetRef} className='bottom-sheets'>
        <ContainerContext.Provider value={bottomSheetRef}>
            {bottomSheets}
        </ContainerContext.Provider>
    </div>
}

export default BottomSheet;