package com.feemanagement.service.impl;

import com.feemanagement.dto.PaymentRequest;
import com.feemanagement.dto.PaymentResponse;
import com.feemanagement.entity.Fee;
import com.feemanagement.entity.Payment;
import com.feemanagement.entity.Student;
import com.feemanagement.enums.FeeStatus;
import com.feemanagement.exception.ResourceNotFoundException;
import com.feemanagement.repository.FeeRepository;
import com.feemanagement.repository.PaymentRepository;
import com.feemanagement.repository.StudentRepository;
import com.feemanagement.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final FeeRepository feeRepository;
    private final StudentRepository studentRepository;

    @Override
    @Transactional
    public PaymentResponse createPayment(PaymentRequest request) {
        log.info("Creating new payment for student ID: {} and fee ID: {}", request.getStudentId(), request.getFeeId());
        
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", request.getStudentId()));

        Fee fee = feeRepository.findById(request.getFeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Fee", "id", request.getFeeId()));

        // Validate that payment doesn't exceed remaining amount
        double remainingAmount = fee.getTotalAmount() - fee.getPaidAmount();
        if (request.getAmount() > remainingAmount) {
            throw new IllegalArgumentException("Payment amount (" + request.getAmount() + 
                    ") exceeds remaining fee amount (" + remainingAmount + ")");
        }

        // Update fee paid amount
        fee.setPaidAmount(fee.getPaidAmount() + request.getAmount());
        
        // Status is automatically updated by Fee entity's @PreUpdate callback

        Payment payment = Payment.builder()
                .student(student)
                .fee(fee)
                .amount(request.getAmount())
                .paymentMethod(request.getPaymentMethod())
                .transactionId(request.getTransactionId())
                .build();

        Payment saved = paymentRepository.save(payment);
        feeRepository.save(fee); // Save updated fee
        
        log.info("Payment created successfully with ID: {}. Fee status updated to: {}", saved.getId(), fee.getStatus());
        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getPaymentById(Long id) {
        log.info("Fetching payment with ID: {}", id);
        
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment", "id", id));
        return mapToResponse(payment);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PaymentResponse> getAllPayments(Pageable pageable) {
        log.info("Fetching all payments with pagination");
        return paymentRepository.findAll(pageable).map(this::mapToResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PaymentResponse> getPaymentsByStudentId(Long studentId, Pageable pageable) {
        log.info("Fetching payments for student ID: {}", studentId);
        return paymentRepository.findByStudentId(studentId, pageable).map(this::mapToResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getPaymentsByDateRange(Timestamp startDate, Timestamp endDate) {
        log.info("Fetching payments by date range: {} to {}", startDate, endDate);
        return paymentRepository.findByPaymentDateBetween(startDate, endDate, Pageable.unpaged()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private PaymentResponse mapToResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .studentId(payment.getStudent().getId())
                .studentName(payment.getStudent().getName())
                .feeId(payment.getFee().getId())
                .amount(payment.getAmount())
                .paymentMethod(payment.getPaymentMethod())
                .paymentDate(payment.getPaymentDate())
                .transactionId(payment.getTransactionId())
                .build();
    }
}