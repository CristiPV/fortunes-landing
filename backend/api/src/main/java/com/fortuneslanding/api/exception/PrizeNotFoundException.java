package com.fortuneslanding.api.exception;

public class PrizeNotFoundException extends Exception
{
    public PrizeNotFoundException()
    {
    }

    public PrizeNotFoundException(String message)
    {
        super(message);
    }
}
