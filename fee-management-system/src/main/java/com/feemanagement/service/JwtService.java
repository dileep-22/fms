package com.feemanagement.service;

public interface JwtService {
    String generateToken(String email, String role);
    String extractUsername(String token);
    boolean validateToken(String token, String username);
    long getExpirationTime();
}