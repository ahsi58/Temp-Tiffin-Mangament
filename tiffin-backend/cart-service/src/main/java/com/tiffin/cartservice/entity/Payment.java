package com.tiffin.cartservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
	    name = "payments",
	    indexes = {
	        @Index(
	            name = "idx_razorpay_order_id",
	            columnList = "razorpay_order_id"
	        ),
	        @Index(
	            name = "idx_razorpay_payment_id",
	            columnList = "razorpay_payment_id"
	        ),
	        @Index(
	            name = "idx_payment_order_id",
	            columnList = "order_id"
	        )
	    }
	)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Payment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerId;

    @Column(name = "razorpay_order_id", nullable = false, unique = true)
    private String razorpayOrderId;

    @Column(name = "razorpay_payment_id")
    private String razorpayPaymentId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private String currency;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    /*
     * This is the Order Service order ID.
     *
     * It is intentionally NOT a JPA relationship because
     * Order belongs to a different microservice/database.
     */
    private Long orderId;

    @Column(nullable = false)
    private LocalDateTime paymentDate;
}