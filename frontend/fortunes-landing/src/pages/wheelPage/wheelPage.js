import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import Api from '../../api/api.js';

import Wheel from './../../components/wheel/wheel';

import './wheelPage.css';

/*
 * WheelPage renders:
 * - a 'Dropdown' component which contains a 'Button' that leads to the 'HistoryPage'
 * - a 'Wheel' component
 * State:
 *  - items: List
 *  - currentPreset: Object {
 *      value: Number
 *      label: String
 *    } ( the current preset of prizes )
 *  - currentItems: List ( list of items that belong to the current preset )
 *  - selectOptions: List
 * - availablePresets: Object ( a selection of all available presets where the keys
 *   are the preset numbers and the values are lists containing the corresponding items )
 * API Calls:
 *  - getAll( "/prizes", setItems ) -> gets a list of all prizes and puts it in the items list
 */
function WheelPage( props ) {
   /* 
    * The list of items that can be present on the wheel.
    * Each item has to have:
    * - name: String
    * - weight: double ( the predisposition of that item being selected )
    * - preset: int
    */
    const [items, setItems] = useState( [] );
    const [currentPreset, setCurrentPreset] = useState( { value: 1, label: "Preset: 1" } );
    const [currentItems, setCurrentItems] = useState( [] );
    const [availablePresets, setAvailablePresets] = useState( null );
    const [selectOptions, setSelectOptions] = useState( [] );

    /**
     * Loads all of the items from the database.
     */
    useEffect( () => {
        Api.getAll( "/prizes", setItems );
    }, [] );

    /**
     * Creates an object with all the presets available. 
     * Each preset also stores a list of all items that correspond to it.
     */
    useEffect( () => {
        const presets = {};
        items.forEach( ( item ) => {
            if ( presets[item.preset] )
                presets[item.preset].push( item )
            else presets[item.preset] = [item];
        } );
        setAvailablePresets( presets );
    }, [ items ] );

    /**
     * Creates the options for the React Select Input field based on the available presets.
     */
    useEffect( () => {
        const options = [];
        for( let key in availablePresets ) {
            let option = {
                value: Number( key ),
                label: "Preset: " + key
            }
            options.push( option );
        }
        setSelectOptions( options );
    }, [ availablePresets ] );

    /**
     * Selects the items that are currently displayed on the wheel based on the current preset
     * from the React Select Input field. 
     */
    useEffect( () => {
        if ( availablePresets )
            setCurrentItems( availablePresets[currentPreset.value] );
    }, [ currentPreset, availablePresets ] );

    return (
        <Container className="wheel-page">
            <Container className="wrapper">
                <Dropdown>
                    <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                        Actions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link
                            to={ {
                                pathname: "/history",
                            } }
                            >
                                <Button variant="outline-dark">Prize History</Button>
                            </Link>
                        </Dropdown.Item>

                        <Select onChange={ ( event ) => setCurrentPreset( event ) }
                            defaultValue={ currentPreset }
                            options={ selectOptions }
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
            <Wheel items={ currentItems }/>
        </Container>
    );
}

export default WheelPage;