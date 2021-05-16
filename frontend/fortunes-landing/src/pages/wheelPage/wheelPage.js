import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Dropdown } from 'react-bootstrap';
import Api from '../../api/api.js';

import Wheel from './../../components/wheel/wheel';

import './wheelPage.css';

/*
 * WheelPage renders:
 * - a 'Dropdown' component which contains a 'Button' that leads to the 'HistoryPage'
 * - a 'Wheel' component
 * State:
 *  - items: List
 * API Calls:
 *  - getAll( "/prizes", setItems ) -> gets a list of all prizes and puts it in the items list
 */
function WheelPage( props ) {
   /* 
    * The list of items that will be present on the wheel.
    * Each item has to have:
    * - name: String
    * - weight: double ( the predisposition of that item being selected )
    * - preset: int
    */
    const [items, setItems] = useState( [] );

    useEffect( () => {
      Api.getAll( "/prizes", setItems );
    }, [] );

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
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
            <Wheel items={ items }/>
        </Container>
    );
}

export default WheelPage;