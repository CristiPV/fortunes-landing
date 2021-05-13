import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Container, Table, Button } from 'react-bootstrap';

import './historyPage.css';

function HistoryPage( props ) {
    const location = useLocation();

    const prizeHistory = location.state.prizeHistory;

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

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Prize</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        prizeHistory.map( ( prize, index ) => {
                            return(
                                <tr key={ index }>
                                    <td>
                                        { index }
                                    </td>
                                    <td>
                                        { prize.name }
                                    </td>
                                    <td>
                                        { prize.weight }
                                    </td>
                                </tr>
                            );
                        } )
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default HistoryPage;