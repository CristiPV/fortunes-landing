package com.fortuneslanding.api.repo;

import com.fortuneslanding.api.model.Prize;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrizeRepo extends JpaRepository<Prize, Long>
{
}
