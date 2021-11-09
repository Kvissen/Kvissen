package services.auth;

import common.AccessScope;
import io.jsonwebtoken.Claims;
import services.auth.repo.localAuth.JwtDecoder;
import services.auth.repo.localAuth.JwtGenerator;
import services.auth.repo.remoteAuth.TicketValidator;

import java.net.URI;
import java.util.UUID;

import static common.EnvVars.*;

/**
 * Internal access to auth, used by the API controller
 *
 * @author erlendtyrmi
 */
public class AuthService {

    /**
     * Redirects to the user login interface at dtu.dk
     *
     * @return redirection to Ticket issuer
     */
    public static URI login() {
        return URI.create(TICKET_ENDPOINT + "?service=" + BASE_URL + TICKET_RESPONSE_ENDPOINT);
    }

    /**
     * Receives ticket and issues a brand new "Kvis" token
     *
     * @param ticket ticket from login at DTU
     * @return Redirection to webapp with token as search parameter: ?token=
     * @throws Exception Invalid token throws Exception
     */
    public static URI redirect(String ticket) throws Exception {
        String userId = new TicketValidator().validate(ticket);
        String token = new JwtGenerator().generate(
                AccessScope.creator,
                "none",
                userId,
                UUID.randomUUID().toString(),
                JWT_DEFAULT_ISSUER, JWT_TTL);
        // Send back to frontend with token as search param
        return URI.create(CLIENT_BASE_URL + "?token=" + token);
    }

    /**
     * Reads token, and throws exception if not verified
     *
     * @param authentication Bearer token
     * @return The token's claims.
     */
    public static Claims validate(String authentication) throws Exception {
        String token = authentication.split(" ")[1];
        return new JwtDecoder().decode(token);
    }

    /**
     * Login for players
     *
     * @param quizCode Code used by players to join game
     * @return Anonymous token scope: player
     */
    public static URI playerLogin(String quizCode) {
        String userId = "anonymous";
        String token = new JwtGenerator().generate(
                AccessScope.player,
                quizCode,
                userId,
                UUID.randomUUID().toString(),
                JWT_DEFAULT_ISSUER,
                JWT_TTL
        );
        // Send back to frontend with token as search param
        return URI.create(CLIENT_BASE_URL + "?token=" + token);
    }
}

