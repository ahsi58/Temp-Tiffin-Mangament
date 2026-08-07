package com.tiffin.userservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vendors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vendor extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "auth_user_id", nullable = false, unique = true)
    private Long authUserId;

    @Column(name = "business_name", nullable = false, length = 100)
    private String businessName;

    @Column(name = "owner_name", nullable = false, length = 100)
    private String ownerName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "phone_number", unique = true, length = 15)
    private String phoneNumber;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 50)
    private String city;

    @Column(length = 50)
    private String state;

    @Column(length = 10)
    private String pincode;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "upi_id", length = 100)
    private String upiId;

    @Column(name = "accepting_orders", nullable = false)
    @Builder.Default
    private Boolean acceptingOrders = true;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;
}