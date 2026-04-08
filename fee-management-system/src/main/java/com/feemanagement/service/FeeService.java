package com.feemanagement.service;

import com.feemanagement.dto.FeeRequest;
import com.feemanagement.dto.FeeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface FeeService {
    FeeResponse createFee(FeeRequest request);
    FeeResponse updateFee(Long id, FeeRequest request);
    FeeResponse getFeeById(Long id);
    Page<FeeResponse> getAllFees(Pageable pageable);
    Page<FeeResponse> getFeesByStudentId(Long studentId, Pageable pageable);
    List<FeeResponse> getFeesByDateRange(Date startDate, Date endDate);
    List<FeeResponse> getFeesByClassName(String className);
}