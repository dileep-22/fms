package com.feemanagement.dto;

import com.feemanagement.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private Long feeId;
    private Double amount;
    private PaymentMethod paymentMethod;
    private Timestamp paymentDate;
    private String transactionId;
}