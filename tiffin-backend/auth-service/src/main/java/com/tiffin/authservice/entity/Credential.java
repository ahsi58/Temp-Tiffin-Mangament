package com.tiffin.authservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "credentials",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Credential extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    @Builder.Default
    private Boolean enabled = true;

    @OneToOne(
            mappedBy = "credential",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private RefreshToken refreshToken;
}