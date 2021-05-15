package com.fortuneslanding.api.service;

import com.fortuneslanding.api.exception.HistoryNotFoundException;
import com.fortuneslanding.api.model.History;
import com.fortuneslanding.api.model.Prize;
import com.fortuneslanding.api.repo.HistoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Contains the History related logic needed for the API
 */
@Service
public class HistoryService
{
    @Autowired
    HistoryRepo historyRepo;

    /**
     * Retrieves a list of all History entries found in the DB
     * @return the list of History entries
     */
    public List<History> getAll() {
        return historyRepo.findAll();
    }

    /**
     * Retrieves one History entry with the given id from the DB
     * or throws an error if no entry with that id is found.
     * @param id - id of the History entry
     * @return the History entry
     * @throws HistoryNotFoundException
     */
    public History getOneById( Long id ) throws HistoryNotFoundException {
        return historyRepo.findById( id ).orElseThrow(
                () -> new HistoryNotFoundException( "Method getOneByID: History Not Found" )
        );
    }

    /**
     * Adds a History entry in the DB based on the received object.
     * @param history
     * @return the History object that has been saved in the DB
     */
    public History add( History history ) {
        History historyToAdd = new History();

        if ( history.getDate() != null )
            historyToAdd.setDate( history.getDate() );
        else historyToAdd.setDate( LocalDateTime.now() );

        if ( history.getPrize() != null )
            historyToAdd.setPrize( history.getPrize() );
        else historyToAdd.setPrize( new Prize() );

        return historyRepo.save( historyToAdd );
    }

    /**
     * Updates the History entry with the given id based on the received object.
     * Throws an exception if no entry with that id was found.
     * @param id - the id of the entry to update
     * @param history
     * @return the History object saved in the DB
     * @throws HistoryNotFoundException
     */
    public History update( Long id, History history ) throws HistoryNotFoundException {
        History historyToUpdate = historyRepo.findById( id ).orElseThrow(
                () -> new HistoryNotFoundException( "Method update: History Not Found" )
        );

        if( history.getDate() != null )
            historyToUpdate.setDate( history.getDate() );

        if( history.getPrize() != null )
            historyToUpdate.setPrize( history.getPrize() );

        return historyRepo.save( historyToUpdate );
    }

    /**
     * Deletes the History entry with the given id or throws an exception if no
     * entry with that id can be found
     * @param id
     * @throws HistoryNotFoundException
     */
    public void delete( Long id ) throws HistoryNotFoundException {
        if ( historyRepo.existsById( id ) ) {
            historyRepo.deleteById( id );
        } else {
            throw new HistoryNotFoundException( "Method delete: History Not Found" );
        }
    }
}