package com.feemanagement.service.impl;

import com.feemanagement.dto.FeeRequest;
import com.feemanagement.dto.FeeResponse;
import com.feemanagement.entity.Fee;
import com.feemanagement.entity.Student;
import com.feemanagement.exception.ResourceNotFoundException;
import com.feemanagement.repository.FeeRepository;
import com.feemanagement.repository.StudentRepository;
import com.feemanagement.service.FeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FeeServiceImpl implements FeeService {

    private final FeeRepository feeRepository;
    private final StudentRepository studentRepository;

    @Override
    @Transactional
    public FeeResponse createFee(FeeRequest request) {
        log.info("Creating new fee for student ID: {}", request.getStudentId());
        
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", request.getStudentId()));

        Fee fee = Fee.builder()
                .student(student)
                .totalAmount(request.getTotalAmount())
                .paidAmount(0.0)
                .dueDate(request.getDueDate())
                .build();

        Fee saved = feeRepository.save(fee);
        log.info("Fee created successfully with ID: {}", saved.getId());
        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public FeeResponse updateFee(Long id, FeeRequest request) {
        log.info("Updating fee with ID: {}", id);
        
        Fee fee = feeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fee", "id", id));

        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", request.getStudentId()));

        fee.setStudent(student);
        fee.setTotalAmount(request.getTotalAmount());
        fee.setDueDate(request.getDueDate());

        Fee updated = feeRepository.save(fee);
        log.info("Fee updated successfully with ID: {}", updated.getId());
        return mapToResponse(updated);
    }

    @Override
    @Transactional(readOnly = true)
    public FeeResponse getFeeById(Long id) {
        log.info("Fetching fee with ID: {}", id);
        
        Fee fee = feeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fee", "id", id));
        return mapToResponse(fee);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FeeResponse> getAllFees(Pageable pageable) {
        log.info("Fetching all fees with pagination");
        return feeRepository.findAll(pageable).map(this::mapToResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FeeResponse> getFeesByStudentId(Long studentId, Pageable pageable) {
        log.info("Fetching fees for student ID: {}", studentId);
        return feeRepository.findByStudentId(studentId, pageable).map(this::mapToResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FeeResponse> getFeesByDateRange(Date startDate, Date endDate) {
        log.info("Fetching fees by date range: {} to {}", startDate, endDate);
        return feeRepository.findByDueDateBetween(startDate, endDate).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<FeeResponse> getFeesByClassName(String className) {
        log.info("Fetching fees by class name: {}", className);
        return feeRepository.findByClassName(className).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private FeeResponse mapToResponse(Fee fee) {
        return FeeResponse.builder()
                .id(fee.getId())
                .studentId(fee.getStudent().getId())
                .studentName(fee.getStudent().getName())
                .totalAmount(fee.getTotalAmount())
                .paidAmount(fee.getPaidAmount())
                .status(fee.getStatus())
                .dueDate(fee.getDueDate())
                .build();
    }
}