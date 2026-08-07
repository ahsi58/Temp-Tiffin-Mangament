package com.tiffin.menuservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.menuservice.entity.Menu;
import com.tiffin.menuservice.entity.MenuItem;

public interface MenuItemRepository
        extends JpaRepository<MenuItem, Long> {

    List<MenuItem> findByMenuOrderByItemOrder(Menu menu);
}