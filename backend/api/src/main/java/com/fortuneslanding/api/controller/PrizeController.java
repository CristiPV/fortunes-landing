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

@RestController
@RequestMapping( value = "prizes" )
public class PrizeController
{
    @Autowired
    PrizeService prizeService;

    @GetMapping( value = { "/", "" } )
    public ResponseEntity<List<Prize>> getAll() {
        List<Prize> prizeList = prizeService.getAll();
        return new ResponseEntity<>( prizeList, HttpStatus.OK );
    }

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

    @PostMapping( value = { "/", "" } )
    public ResponseEntity<Prize> add( @RequestBody Prize prize ) {
        Prize addedPrize = prizeService.add( prize );
        return new ResponseEntity<>( addedPrize, HttpStatus.CREATED );
    }

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
