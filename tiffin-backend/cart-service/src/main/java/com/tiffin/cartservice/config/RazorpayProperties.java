package com.tiffin.cartservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "razorpay")
public class RazorpayProperties {
    private Key key = new Key();

    @Getter
    @Setter
    public static class Key {
        private String id;
        private String secret;
    }
}