package com.tiffin.menuservice.exception;

public class MenuAlreadyExistsException extends RuntimeException {

    public MenuAlreadyExistsException(String message) {
        super(message);
    }
}