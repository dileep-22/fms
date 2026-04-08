package com.feemanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportSummaryDTO {
    private Double totalCollected;
    private Double totalPending;
    private Double totalPartial;
    private Long totalStudents;
    private Long totalFees;
    private Long totalPayments;
}