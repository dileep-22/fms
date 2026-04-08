package com.feemanagement.service.impl;

import com.feemanagement.dto.AuthRequest;
import com.feemanagement.dto.AuthResponse;
import com.feemanagement.dto.RegisterRequest;
import com.feemanagement.dto.ReportSummaryDTO;
import com.feemanagement.entity.User;
import com.feemanagement.exception.ResourceNotFoundException;
import com.feemanagement.repository.FeeRepository;
import com.feemanagement.repository.PaymentRepository;
import com.feemanagement.repository.StudentRepository;
import com.feemanagement.repository.UserRepository;
import com.feemanagement.service.JwtService;
import com.feemanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final FeeRepository feeRepository;
    private final PaymentRepository paymentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        log.info("Registering new user with email: {}", request.getEmail());
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + request.getEmail());
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved.getEmail(), saved.getRole().name());
        
        log.info("User registered successfully with ID: {}", saved.getId());
        return AuthResponse.builder()
                .token(token)
                .email(saved.getEmail())
                .role(saved.getRole().name())
                .build();
    }

    @Override
    @Transactional
    public AuthResponse login(AuthRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());
        
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        
        log.info("User logged in successfully: {}", user.getEmail());
        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public ReportSummaryDTO getSummary() {
        log.info("Generating summary report");
        
        Double totalFees = feeRepository.getTotalFeesAmount();
        Double totalPaid = feeRepository.getTotalPaidAmount();
        Double totalPending = feeRepository.getTotalPendingAmount();
        
        long paidCount = feeRepository.findByStatus(com.feemanagement.enums.FeeStatus.PAID, 
                org.springframework.data.domain.Pageable.unpaged()).getTotalElements();
        long pendingCount = feeRepository.findByStatus(com.feemanagement.enums.FeeStatus.PENDING,
                org.springframework.data.domain.Pageable.unpaged()).getTotalElements();
        long partialCount = feeRepository.findByStatus(com.feemanagement.enums.FeeStatus.PARTIAL,
                org.springframework.data.domain.Pageable.unpaged()).getTotalElements();

        return ReportSummaryDTO.builder()
                .totalCollected(totalPaid != null ? totalPaid : 0.0)
                .totalPending(totalPending != null ? totalPending : 0.0)
                .totalPartial(partialCount)
                .totalStudents(studentRepository.count())
                .totalFees(feeRepository.count())
                .totalPayments(paymentRepository.count())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public ReportSummaryDTO getReportByDate(Date startDate, Date endDate) {
        log.info("Generating report by date range: {} to {}", startDate, endDate);
        
        Timestamp startTs = new Timestamp(startDate.getTime());
        Timestamp endTs = new Timestamp(endDate.getTime());
        
        Double totalCollected = paymentRepository.getTotalPaymentsByDateRange(startTs, endTs);
        
        return ReportSummaryDTO.builder()
                .totalCollected(totalCollected != null ? totalCollected : 0.0)
                .totalStudents(0L)
                .totalFees(0L)
                .totalPayments(0L)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public ReportSummaryDTO getReportByClass(String className) {
        log.info("Generating report by class: {}", className);
        
        var fees = feeRepository.findByClassName(className);
        double totalCollected = fees.stream().mapToDouble(f -> f.getPaidAmount() != null ? f.getPaidAmount() : 0.0).sum();
        double totalPending = fees.stream().mapToDouble(f -> (f.getTotalAmount() != null ? f.getTotalAmount() : 0.0) - (f.getPaidAmount() != null ? f.getPaidAmount() : 0.0)).sum();
        
        return ReportSummaryDTO.builder()
                .totalCollected(totalCollected)
                .totalPending(totalPending)
                .totalFees((long) fees.size())
                .build();
    }
}