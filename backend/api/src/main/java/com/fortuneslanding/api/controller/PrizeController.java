package com.fortuneslanding.api.controller;

import com.fortuneslanding.api.exception.PrizeNotFoundException;
import com.fortuneslanding.api.model.Prize;
import com.fortuneslanding.api.service.PrizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * Implements the API endpoints:
 * GET     /prizes        - retrieves all the prize entries
 * GET     /prizes/id     - retrieves a prize entry with the provided id
 * POST    /prizes        - creates a prize entry
 * PUT     /prizes/id     - updates a prize entry with the provided id
 * DELETE  /prizes/id     - deletes a prize entry with the provided id
 */
@CrossOrigin
@RestController
@RequestMapping( value = "prizes" )
public class PrizeController
{
    @Autowired
    PrizeService prizeService;

    /**
     * Sends an HTTP Response Entity with all the prize entries
     * @return a Response Entity
     *         with HTTP Status OK and a list of the prize entries
     */
    @GetMapping( value = { "/", "" } )
    public ResponseEntity<List<Prize>> getAll() {
        List<Prize> prizeList = prizeService.getAll();
        return new ResponseEntity<>( prizeList, HttpStatus.OK );
    }

    /**
     * Sends an HTTP Response Entity with a specific prize entry and
     * Status OK or HTTP Status Not Found if there is no entry with the provided id
     * @param id
     * @return the Response Entity with a Status Code and a Body
     */
    @GetMapping( value = "/{id}" )
    public ResponseEntity<Prize> getOneById( @PathVariable( "id" ) Long id ) {
        Prize prize;
        try
        {
            prize = prizeService.getOneById( id );
        } catch ( PrizeNotFoundException e )
        {
            throw new ResponseStatusException( HttpStatus.NOT_FOUND, "GET: Prize Not Found", e );
        }

        return new ResponseEntity<>( prize, HttpStatus.OK );
    }

    /**
     * Sends an HTTP Response Entity with the prize entry that has been
     * created, along with Status Created
     * @param prize
     * @return the Response Entity with a Status Code and a Body
     */
    @PostMapping( value = { "/", "" } )
    public ResponseEntity<Prize> add( @RequestBody Prize prize ) {
        Prize addedPrize = prizeService.add( prize );
        return new ResponseEntity<>( addedPrize, HttpStatus.CREATED );
    }

    /**
     * Sends an HTTP Response Entity with the prize entry that has been
     * updated, along with the Status OK, or Status Not Found if there
     * is no entry with the provided id
     * @param id
     * @param prize
     * @return the Response Entity with a Status Code and a Body
     */
    @PutMapping( value = "/{id}" )
    public ResponseEntity<Prize> update( @PathVariable( "id" ) Long id, @RequestBody Prize prize ) {
        Prize updatedPrize;
        try
        {
            updatedPrize = prizeService.update( id, prize );
        } catch ( PrizeNotFoundException e )
        {
            throw new ResponseStatusException( HttpStatus.NOT_FOUND, "PUT: Prize Not Found", e );
        }

        return new ResponseEntity<>( updatedPrize, HttpStatus.OK );
    }

    /**
     * Deletes a prize entry and sends an HTTP Response Entity
     * with the Status OK or Not Found if there is no entry with the provided id
     * @param id
     * @return a Response Entity with Status OK
     */
    @DeleteMapping( value = "/{id}" )
    public ResponseEntity<HttpStatus> delete( @PathVariable( "id" ) Long id ) {
        try
        {
            prizeService.delete( id );
        } catch ( PrizeNotFoundException e )
        {
            throw new ResponseStatusException( HttpStatus.NOT_FOUND, "DELETE: Prize Not Found", e );
        }

        return new ResponseEntity<>( HttpStatus.OK );
    }
}
