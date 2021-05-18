package com.fortuneslanding.api.exception;

public class HistoryNotFoundException extends Exception
{
    public HistoryNotFoundException()
    {
    }

    public HistoryNotFoundException(String message)
    {
        super(message);
    }
}
