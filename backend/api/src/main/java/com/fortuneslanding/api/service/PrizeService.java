package com.fortuneslanding.api.service;

import com.fortuneslanding.api.exception.PrizeNotFoundException;
import com.fortuneslanding.api.model.Prize;
import com.fortuneslanding.api.repo.PrizeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrizeService
{
    @Autowired
    PrizeRepo prizeRepo;

    public List<Prize> getAll() {
        return prizeRepo.findAll();
    }

    public Prize getOneById( Long id ) throws PrizeNotFoundException {
        return prizeRepo.findById( id ).orElseThrow(
                () -> new PrizeNotFoundException( "Method getOneById: Prize Not Found" )
        );
    }

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

    public void delete( Long id ) throws PrizeNotFoundException {
        if ( prizeRepo.existsById( id ) ) {
            prizeRepo.deleteById( id );
        } else {
            throw new PrizeNotFoundException( "Method delete: Prize Not Found" );
        }
    }
}
