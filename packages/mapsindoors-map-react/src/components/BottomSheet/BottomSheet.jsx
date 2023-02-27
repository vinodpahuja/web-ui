import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { ContainerContext } from './ContainerContext';
import Sheet from './Sheet/Sheet';
import './BottomSheet.scss';
import LocationDetails from '../LocationDetails/LocationDetails';
import Wayfinding from '../Wayfinding/Wayfinding';
import Directions from '../Directions/Directions';

const BOTTOM_SHEETS = {
    LOCATION_DETAILS: 0,
    WAYFINDING: 1,
    DIRECTIONS: 2
};

/**
 * @param {Object} props
 * @param {Object} props.currentLocation - The currently selected MapsIndoors Location.
 * @param {function} props.onClose - Callback that fires when all bottom sheets are closed.
 */
function BottomSheet({ currentLocation, onClose }) {

    const bottomSheetRef = useRef();
    const [activeBottomSheet, setActiveBottomSheet] = useState(null);

    const [locationDetailsSheetSize, setLocationDetailsSheetSize] = useState();

    /**
     * When a sheet is closed.
     */
    function close() {
        setActiveBottomSheet(null);
        onClose();
    }

    /*
     * React on changes on the current location.
     */
    useEffect(() => {
        setActiveBottomSheet(currentLocation ? BOTTOM_SHEETS.LOCATION_DETAILS : undefined);
    }, [currentLocation]);

    const bottomSheets = [
        <Sheet
            minHeight="128"
            preferredSizeSnapPoint={locationDetailsSheetSize}
            isOpen={activeBottomSheet === BOTTOM_SHEETS.LOCATION_DETAILS}
            key="A"
        >
            <LocationDetails onSetSize={size => setLocationDetailsSheetSize(size)} onStartWayfinding={() => setActiveBottomSheet(BOTTOM_SHEETS.WAYFINDING)} location={currentLocation} onClose={() => close()} />
        </Sheet>,
        <Sheet minHeight="220" isOpen={activeBottomSheet === BOTTOM_SHEETS.WAYFINDING} key="B">
            <Wayfinding onStartDirections={() => setActiveBottomSheet(BOTTOM_SHEETS.DIRECTIONS)} onBack={() => setActiveBottomSheet(BOTTOM_SHEETS.LOCATION_DETAILS)}/>
        </Sheet>,
        <Sheet minHeight="220" isOpen={activeBottomSheet === BOTTOM_SHEETS.DIRECTIONS} key="C">
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