package com.fortuneslanding.api.service;

import com.fortuneslanding.api.exception.HistoryNotFoundException;
import com.fortuneslanding.api.model.History;
import com.fortuneslanding.api.model.Prize;
import com.fortuneslanding.api.repo.HistoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoryService
{
    @Autowired
    HistoryRepo historyRepo;

    public List<History> getAll() {
        return historyRepo.findAll();
    }

    public History getOneById( Long id ) throws HistoryNotFoundException {
        return historyRepo.findById( id ).orElseThrow(
                () -> new HistoryNotFoundException( "Method getOneByID: History Not Found" )
        );
    }

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

    public void delete( Long id ) throws HistoryNotFoundException {
        if ( historyRepo.existsById( id ) ) {
            historyRepo.deleteById( id );
        } else {
            throw new HistoryNotFoundException( "Method delete: History Not Found" );
        }
    }
}