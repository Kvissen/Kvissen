/*
 * Erlend
 * */
package services.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureException;
import services.auth.jwt.localAuth.JwtDecoder;
import services.auth.jwt.localAuth.JwtGenerator;
import services.auth.jwt.remoteAuth.TicketValidator;

public class JwtService {

    public static String generateJwt(String id, String issuer, String subject, long ttlMillis) {
        return new JwtGenerator().generate(id, issuer, subject, ttlMillis);
    }

    public static Claims decodeJwt(String jwt) throws SignatureException {
        return new JwtDecoder().decode(jwt);
    }

    public static String validateTicket(String ticket) {
        return new TicketValidator().validate(ticket);
    }
}
