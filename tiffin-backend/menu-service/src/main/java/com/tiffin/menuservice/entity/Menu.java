package com.tiffin.menuservice.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.tiffin.menuservice.entity.enums.DayOfWeek;
import com.tiffin.menuservice.entity.enums.MealType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "menu",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"day_of_week", "meal_type"}
        )
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Menu extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week", nullable = false)
    private DayOfWeek dayOfWeek;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(length = 500)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private Boolean available;

    @OneToMany(
            mappedBy = "menu",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @Builder.Default
    private List<MenuItem> menuItems = new ArrayList<>();
}