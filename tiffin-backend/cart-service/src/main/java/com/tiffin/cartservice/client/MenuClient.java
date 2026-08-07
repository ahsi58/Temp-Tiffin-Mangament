package com.tiffin.cartservice.client;

import com.tiffin.cartservice.dto.MenuResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "MENU-SERVICE")
public interface MenuClient {

    @GetMapping("/menus")
    List<MenuResponse> getWeeklyMenu();
}