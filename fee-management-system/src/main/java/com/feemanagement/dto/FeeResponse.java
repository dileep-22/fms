package com.feemanagement.dto;

import com.feemanagement.enums.FeeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeeResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private Double totalAmount;
    private Double paidAmount;
    private FeeStatus status;
    private Date dueDate;
}