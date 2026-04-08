package com.feemanagement.repository;

import com.feemanagement.entity.Fee;
import com.feemanagement.enums.FeeStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface FeeRepository extends JpaRepository<Fee, Long> {
    Page<Fee> findByStudentId(Long studentId, Pageable pageable);
    Page<Fee> findByStatus(FeeStatus status, Pageable pageable);
    
    @Query("SELECT SUM(f.totalAmount) FROM Fee f")
    Double getTotalFeesAmount();
    
    @Query("SELECT SUM(f.paidAmount) FROM Fee f")
    Double getTotalPaidAmount();
    
    @Query("SELECT SUM(f.totalAmount - f.paidAmount) FROM Fee f WHERE f.status != 'PAID'")
    Double getTotalPendingAmount();
    
    @Query("SELECT f FROM Fee f WHERE f.dueDate BETWEEN :startDate AND :endDate")
    List<Fee> findByDueDateBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
    
    @Query("SELECT f FROM Fee f JOIN f.student s WHERE s.className = :className")
    List<Fee> findByClassName(@Param("className") String className);
}