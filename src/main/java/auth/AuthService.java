package auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureException;

public interface AuthService {
    String generateJwt(String id, String issuer, String subject, long ttlMillis);

    Claims decodeJwt(String jwt) throws SignatureException;

    String validateTicket(String ticket);
}
