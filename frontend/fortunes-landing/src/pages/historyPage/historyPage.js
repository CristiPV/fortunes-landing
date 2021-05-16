import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/api.js';

import { Container, Table, Button } from 'react-bootstrap';

import './historyPage.css';

/*
 * HistoryPage renders:
 * - a 'Table' which contains the data of the previous winnings
 * - a 'Button' to go back to the 'WheelPage'
 * State:
 * - historyEntries: List ( list of all prizes that have been won )
 * API Calls:
 * - getAll( "/history", setHistoryEntries ) -> gets a list of all history entries and stores it in
 *   the historyEntries list
 */
function HistoryPage( props ) {
    const [historyEntries, setHistoryEntries] = useState( [] );

    useEffect( () => {
        Api.getAll( "/history", setHistoryEntries );
    }, [] );

    return (
        <Container className="history-page">
            <Container className="link-container">
                <Link 
                    to={ {
                        pathname: "/wheel"
                    } }
                >
                    <Button variant="warning">Back</Button>
                </Link>
            </Container>

            <Container className="overflow-auto">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Prize</th>
                            <th>Description</th>
                            <th>Preset</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            historyEntries.map( ( entry, index ) => {
                                return(
                                    <tr key={ index }>
                                        <td>
                                            { entry.id }
                                        </td>
                                        <td>
                                            { entry.date }
                                        </td>
                                        <td>
                                            { entry.prize.name }
                                        </td>
                                        <td>
                                            { entry.prize.description }
                                        </td>
                                        <td>
                                            { entry.prize.preset }
                                        </td>
                                    </tr>
                                );
                            } )
                        }
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
}

export default HistoryPage;