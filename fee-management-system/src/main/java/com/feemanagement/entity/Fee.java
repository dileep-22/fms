package com.feemanagement.entity;

import com.feemanagement.enums.FeeStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "fees", indexes = {
    @Index(name = "idx_fee_student", columnList = "student_id"),
    @Index(name = "idx_fee_status", columnList = "status")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Column(name = "paid_amount", nullable = false)
    private Double paidAmount = 0.0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FeeStatus status = FeeStatus.PENDING;

    @Column(name = "due_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dueDate;

    @OneToMany(mappedBy = "fee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Payment> payments;

    @PrePersist
    @PreUpdate
    private void updateStatus() {
        if (paidAmount == null) {
            paidAmount = 0.0;
        }
        if (paidAmount >= totalAmount) {
            status = FeeStatus.PAID;
        } else if (paidAmount > 0) {
            status = FeeStatus.PARTIAL;
        } else {
            status = FeeStatus.PENDING;
        }
    }
}
