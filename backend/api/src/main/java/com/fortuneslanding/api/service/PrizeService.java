package com.fortuneslanding.api.service;

import com.fortuneslanding.api.exception.PrizeNotFoundException;
import com.fortuneslanding.api.model.Prize;
import com.fortuneslanding.api.repo.PrizeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Contains the Prize related logic needed for the API
 */
@Service
public class PrizeService
{
    @Autowired
    PrizeRepo prizeRepo;

    /**
     * Retrieves a list of all Prizes found in the DB
     * @return the list of Prizes
     */
    public List<Prize> getAll() {
        return prizeRepo.findAll();
    }

    /**
     * Retrieves one Prize with the given id from the DB
     * or throws an error if no entry with that id is found.
     * @param id - id of the Prize
     * @return the Prize
     * @throws PrizeNotFoundException
     */
    public Prize getOneById( Long id ) throws PrizeNotFoundException {
        return prizeRepo.findById( id ).orElseThrow(
                () -> new PrizeNotFoundException( "Method getOneById: Prize Not Found" )
        );
    }

    /**
     * Adds a Prize in the DB based on the received object.
     * @param prize
     * @return the Prize object that has been saved in the DB
     */
    public Prize add( Prize prize ) {
        Prize prizeToAdd = new Prize();

        if ( prize.getName() != null && !prize.getName().equals( "" ) )
            prizeToAdd.setName( prize.getName() );
        else prizeToAdd.setName( "Untitled" );

        if ( prize.getDescription() != null && !prize.getDescription().equals( "" ) )
            prizeToAdd.setDescription( prize.getDescription() );
        else prizeToAdd.setDescription( "No description provided." );

        if ( prize.getPreset() >= 0 )
            prizeToAdd.setPreset( prize.getPreset() );
        else prizeToAdd.setPreset( 0 );

        if ( prize.getWeight() >= 0.001 )
            prizeToAdd.setWeight( prize.getWeight() );
        else prizeToAdd.setWeight( 0.001 );

        return prizeRepo.save( prizeToAdd );
    }

    /**
     * Updates the Prize with the given id based on the received object.
     * Throws an exception if no entry with that id was found.
     * @param id - the id of the entry to update
     * @param prize
     * @return the Prize object saved in the DB
     * @throws PrizeNotFoundException
     */
    public Prize update( Long id, Prize prize ) throws PrizeNotFoundException {
        Prize prizeToUpdate = prizeRepo.findById( id ).orElseThrow(
                () -> new PrizeNotFoundException( "Method update: Prize Not Found" )
        );

        if ( prize.getName() != null && !prize.getName().equals( "" ) )
            prizeToUpdate.setName( prize.getName() );

        if ( prize.getDescription() != null && !prize.getDescription().equals( "" ) )
            prizeToUpdate.setDescription( prize.getDescription() );

        if ( prize.getPreset() >= 0 )
            prizeToUpdate.setPreset( prize.getPreset() );

        if ( prize.getWeight() >= 0.001 )
            prizeToUpdate.setWeight( prize.getWeight() );

        return prizeRepo.save( prizeToUpdate );
    }

    /**
     * Deletes the Prize with the given id or throws an exception if no
     * entry with that id can be found
     * @param id
     * @throws PrizeNotFoundException
     */
    public void delete( Long id ) throws PrizeNotFoundException {
        if ( prizeRepo.existsById( id ) ) {
            prizeRepo.deleteById( id );
        } else {
            throw new PrizeNotFoundException( "Method delete: Prize Not Found" );
        }
    }
}