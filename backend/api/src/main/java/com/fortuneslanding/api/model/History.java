package com.fortuneslanding.api.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Represents the 'history' table of the database.
 * It contains a date and a prize item.
 */
@Entity
@Table( name = "history" )
public class History
{
    //region Attributes
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( name = "history_id", nullable = false )
    private Long id;

    @Column( name = "date", nullable = false )
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn( name="prize_id", nullable=false )
    private Prize prize;
    //endregion

    //region Constructors
    public History()
    {
    }

    public History(Long id, LocalDateTime date, Prize prize)
    {
        this.id = id;
        this.date = date;
        this.prize = prize;
    }
    //endregion

    //region Getters
    public Long getId()
    {
        return id;
    }

    public LocalDateTime getDate()
    {
        return date;
    }

    public Prize getPrize()
    {
        return prize;
    }
    //endregion

    //region Setters
    public void setId(Long id)
    {
        this.id = id;
    }

    public void setDate(LocalDateTime date)
    {
        this.date = date;
    }

    public void setPrize(Prize prize)
    {
        this.prize = prize;
    }
    //endregion

    //region Equals & HashCode
    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        History history = (History) o;
        return Objects.equals(id, history.id) &&
                Objects.equals(date, history.date) &&
                Objects.equals(prize, history.prize);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(id, date, prize);
    }
    //endregion
}
