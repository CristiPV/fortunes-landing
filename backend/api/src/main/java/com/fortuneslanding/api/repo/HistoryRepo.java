package com.fortuneslanding.api.repo;

import com.fortuneslanding.api.model.History;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepo extends JpaRepository<History, Long>
{
}
