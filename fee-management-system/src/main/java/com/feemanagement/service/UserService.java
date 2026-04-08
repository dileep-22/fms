package com.feemanagement.service;

import com.feemanagement.dto.AuthRequest;
import com.feemanagement.dto.AuthResponse;
import com.feemanagement.dto.RegisterRequest;
import com.feemanagement.dto.ReportSummaryDTO;

import java.util.Date;

public interface UserService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(AuthRequest request);
    ReportSummaryDTO getSummary();
    ReportSummaryDTO getReportByDate(Date startDate, Date endDate);
    ReportSummaryDTO getReportByClass(String className);
}