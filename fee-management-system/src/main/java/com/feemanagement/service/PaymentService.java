package com.feemanagement.service;

import com.feemanagement.dto.PaymentRequest;
import com.feemanagement.dto.PaymentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.sql.Timestamp;
import java.util.List;

public interface PaymentService {
    PaymentResponse createPayment(PaymentRequest request);
    PaymentResponse getPaymentById(Long id);
    Page<PaymentResponse> getAllPayments(Pageable pageable);
    Page<PaymentResponse> getPaymentsByStudentId(Long studentId, Pageable pageable);
    List<PaymentResponse> getPaymentsByDateRange(Timestamp startDate, Timestamp endDate);
}