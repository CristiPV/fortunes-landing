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

@RestController
@RequestMapping( value = "histories" )
public class HistoryController
{
    @Autowired
    HistoryService historyService;

    @GetMapping( value = { "/", "" } )
    public ResponseEntity<List<History>> getAll() {
        List<History> historyList = historyService.getAll();
        return new ResponseEntity<>( historyList, HttpStatus.OK );
    }

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

    @PostMapping( value = { "/", "" } )
    public ResponseEntity<History> add( @RequestBody History history ) {
        History addedHistory = historyService.add( history );
        return new ResponseEntity<>( addedHistory, HttpStatus.CREATED );
    }

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
