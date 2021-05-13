import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Dropdown } from 'react-bootstrap';

import Wheel from './../../components/wheel/wheel';

import './wheelPage.css';

function WheelPage( props ) {
    const [prizeHistory, setPrizeHistory] = useState( [] );

      /* 
    * The list of items that will be present on the wheel.
    * Each item has to have:
    * - name: String
    * - weight: double ( the predisposition of that item being selected )
    * Later, this hardcoded list will be replaced with a list received from a database.
    */
    const items = [
      {
        name: "Gummy Bears",
        weight: 10.0
      },
      {
        name: "Nothing",
        weight: 23.0
      },
      {
        name: "Laptop",
        weight: 5.0
      },
      {
        name: "Yacht",
        weight: 2.0
      },
      {
        name: "Soap",
        weight: 40.0
      },
      {
        name: "Headphones",
        weight: 20.0
      }
    ];

    useEffect( () => {
      console.log( prizeHistory );
    }, [ prizeHistory ] );

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
                                state: { prizeHistory }
                              } }
                            >
                                <Button variant="outline-dark">Prize History</Button>
                            </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
            <Wheel items={ items } prizeHistory={ { list: prizeHistory, setter: setPrizeHistory } }/>
        </Container>
    );
}

export default WheelPage;