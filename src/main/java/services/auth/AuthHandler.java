package services.auth;

import Common.AccessScope;
import io.jsonwebtoken.Claims;
import services.auth.repo.localAuth.JwtDecoder;
import services.auth.repo.localAuth.JwtGenerator;
import services.auth.repo.remoteAuth.TicketValidator;

import javax.ws.rs.core.Response;
import java.net.URI;

import static Common.EnvVars.*;

/**
 * Internal access to auth, used by AuthService
 *
 * @author erlendtyrmi
 */
public class AuthHandler {

    /**
     * Redirects to the user login interface at dtu.dk
     * @return redirection to Ticket issuer
     */
    public static Response login() {
        URI uri = URI.create(TICKET_ENDPOINT + "?service=" + BASE_URL + TICKET_RESPONSE_ENDPOINT);
        return Response.seeOther(uri).build();
    }

    /**
     * Receives ticket and issues a brand new "Kvis" token
     * @param ticket ticket from login at DTU
     * @return Redirection to webapp with token as search parameter: ?token=
     * @throws Exception
     */
    public static Response redirect(String ticket) throws Exception {
        String id = new TicketValidator().validate(ticket);
        String token = new JwtGenerator().generate(id, JWT_DEFAULT_ISSUER, AccessScope.creator, JWT_TTL);
        // Send back to frontend with token as search param
        return Response.seeOther(URI.create(CLIENT_BASE_URL + "?token=" + token)).build();
    }

    /**
     * Reads token, and throws exception if not verified
     * @param authentication Bearer token
     * @return The token's claims.
     */
    public static Claims validate(String authentication) throws Exception {
        String token = authentication.split(" ")[1];
        return new JwtDecoder().decode(token);

        // TODO: handle these bad boys where called in e.g. token interceptor
        // Throws:
        //io.jsonwebtoken.ExpiredJwtException
        //io.jsonwebtoken.UnsupportedJwtException
        //io.jsonwebtoken.MalformedJwtException
        //io.jsonwebtoken.SignatureException
        //IllegalArgumentException
    }

    /**
     * Logs in a player, participant in the quiz. No login required.
     *
     * @return anonymous access token
     */
    public static Response playerLogin() throws Exception {
        String id = "anonymous";
        String token = new JwtGenerator().generate(id, JWT_DEFAULT_ISSUER, AccessScope.player, JWT_TTL);
        // Send back to frontend with player_token as search param
        return Response.seeOther(URI.create(CLIENT_BASE_URL + "?token=" + token)).build();
    }
}

