package com.feemanagement.service;

import com.feemanagement.dto.StudentRequest;
import com.feemanagement.dto.StudentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentService {
    StudentResponse createStudent(StudentRequest request);
    StudentResponse updateStudent(Long id, StudentRequest request);
    void deleteStudent(Long id);
    StudentResponse getStudentById(Long id);
    Page<StudentResponse> getAllStudents(Pageable pageable);
    Page<StudentResponse> getStudentsByClassName(String className, Pageable pageable);
}