/*
 * Erlend
 * */
package auth;

import auth.kvisAuth.JwtDecoder;
import auth.kvisAuth.JwtGenerator;
import auth.remoteAuth.TicketValidator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureException;

public class AuthServiceImpl implements AuthService {

    JwtGenerator generator = new JwtGenerator();
    JwtDecoder decoder = new JwtDecoder();
    TicketValidator ticketValidator = new TicketValidator();

    public String generateJwt(String id, String issuer, String subject, long ttlMillis) {
        return generator.generate(id, issuer, subject, ttlMillis);
    }

    public Claims decodeJwt(String jwt) throws SignatureException {
        return decoder.decode(jwt);
    }

    public String validateTicket(String ticket) {
        // Todo: return bool or throw
        return ticketValidator.validate(ticket);
    }
}
