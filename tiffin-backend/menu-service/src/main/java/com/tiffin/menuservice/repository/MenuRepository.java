package com.tiffin.menuservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.menuservice.entity.Menu;
import com.tiffin.menuservice.entity.enums.DayOfWeek;
import com.tiffin.menuservice.entity.enums.MealType;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    Optional<Menu> findByDayOfWeekAndMealType(
            DayOfWeek dayOfWeek,
            MealType mealType);

    List<Menu> findByDayOfWeek(DayOfWeek dayOfWeek);

    List<Menu> findByAvailableTrue();
}