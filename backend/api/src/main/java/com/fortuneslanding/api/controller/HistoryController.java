package com.fortuneslanding.api.controller;

import com.fortuneslanding.api.exception.HistoryNotFoundException;
import com.fortuneslanding.api.model.History;
import com.fortuneslanding.api.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * Implements the API endpoints:
 * GET     /history        - retrieves all the history entries
 * GET     /history/id     - retrieves a history entry with the provided id
 * POST    /history        - creates a history entry
 * PUT     /history/id     - updates a history entry with the provided id
 * DELETE  /history/id     - deletes a history entry with the provided id
 */
@RestController
@RequestMapping( value = "history" )
public class HistoryController
{
    @Autowired
    HistoryService historyService;

    /**
     * Sends an HTTP Response Entity with all the history entries
     * @return a Response Entity
     *         with HTTP Status OK and a list of the history entries
     */
    @GetMapping( value = { "/", "" } )
    public ResponseEntity<List<History>> getAll() {
        List<History> historyList = historyService.getAll();
        return new ResponseEntity<>( historyList, HttpStatus.OK );
    }

    /**
     * Sends an HTTP Response Entity with a specific history entry and
     * Status OK or HTTP Status Not Found if there is no entry with the provided id
     * @param id
     * @return the Response Entity with a Status Code and a Body
     */
    @GetMapping( value = "/{id}" )
    public ResponseEntity<History> getOneById( @PathVariable( "id" ) Long id ) {
        History history;
        try
        {
            history = historyService.getOneById( id );
        } catch ( HistoryNotFoundException e )
        {
            throw new ResponseStatusException( HttpStatus.NOT_FOUND, "GET: History Not Found", e );
        }

        return new ResponseEntity<>( history, HttpStatus.OK );
    }

    /**
     * Sends an HTTP Response Entity with the history entry that has been
     * created, along with Status Created
     * @param history
     * @return the Response Entity with a Status Code and a Body
     */
    @PostMapping( value = { "/", "" } )
    public ResponseEntity<History> add( @RequestBody History history ) {
        History addedHistory = historyService.add( history );
        return new ResponseEntity<>( addedHistory, HttpStatus.CREATED );
    }

    /**
     * Sends an HTTP Response Entity with the history entry that has been
     * updated, along with the Status OK, or Status Not Found if there
     * is no entry with the provided id
     * @param id
     * @param history
     * @return the Response Entity with a Status Code and a Body
     */
    @PutMapping( value = "/{id}" )
    public ResponseEntity<History> update( @PathVariable( "id" ) Long id, @RequestBody History history ) {
        History updatedHistory;
        try
        {
            updatedHistory = historyService.update( id, history );
        } catch ( HistoryNotFoundException e )
        {
            throw new ResponseStatusException( HttpStatus.NOT_FOUND, "PUT: History Not Found", e );
        }

        return new ResponseEntity<>( updatedHistory, HttpStatus.OK );
    }

    /**
     * Deletes a history entry and sends an HTTP Response Entity
     * with the Status OK or Not Found if there is no entry with the provided id
     * @param id
     * @return a Response Entity with Status OK
     */
    @DeleteMapping( value = "/{id}" )
    public ResponseEntity<HttpStatus> delete( @PathVariable( "id" ) Long id ) {
        try
        {
            historyService.delete( id );
        } catch ( HistoryNotFoundException e )
        {
            throw new ResponseStatusException( HttpStatus.NOT_FOUND, "DELETE: History Not Found", e );
        }

        return new ResponseEntity<>( HttpStatus.OK );
    }
}
