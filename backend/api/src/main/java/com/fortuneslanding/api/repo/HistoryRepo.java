package com.fortuneslanding.api.repo;

import com.fortuneslanding.api.model.History;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepo extends JpaRepository<History, Long>
{
    List<History> findAllByOrderByDateDesc();
}
