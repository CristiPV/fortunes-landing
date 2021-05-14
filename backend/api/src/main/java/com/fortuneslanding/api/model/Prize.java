package com.fortuneslanding.api.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table( name= "prize" )
public class Prize
{
    //region Attributes
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( name = "prize_id", nullable = false )
    private Long id;

    @Column( name = "name", nullable = false, length = 25 )
    private String name;

    @Column( name = "description", columnDefinition = "varchar(100) default 'No description available.'" )
    private String description;

    @Column( name = "weight", nullable = false, columnDefinition = "decimal(10,3)" )
    private double weight;

    @Column( name = "preset", nullable = false )
    private int preset;
    //endregion

    //region Constructors
    public Prize()
    {
    }

    public Prize(Long id, String name, String description, Double weight, Integer preset)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.weight = weight;
        this.preset = preset;
    }
    //endregion

    //region Getters
    public Long getId()
    {
        return id;
    }

    public String getName()
    {
        return name;
    }

    public String getDescription()
    {
        return description;
    }

    public double getWeight()
    {
        return weight;
    }

    public int getPreset()
    {
        return preset;
    }
    //endregion

    //region Setters
    public void setId(Long id)
    {
        this.id = id;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public void setWeight(double weight)
    {
        this.weight = weight;
    }

    public void setPreset(int preset)
    {
        this.preset = preset;
    }
    //endregion

    //region Equals & HashCode
    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Prize prize = (Prize) o;
        return Objects.equals(id, prize.id) &&
                Objects.equals(name, prize.name) &&
                Objects.equals(description, prize.description) &&
                Objects.equals(weight, prize.weight) &&
                Objects.equals(preset, prize.preset);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(id, name, description, weight, preset);
    }
    //endregion
}
