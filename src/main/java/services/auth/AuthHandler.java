package services.auth;

import io.jsonwebtoken.Claims;
import services.auth.jwt.JwtService;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.net.URI;

import static services.auth.EnvVars.*;

public class AuthHandler {
    public static Response login() {
        URI uri = UriBuilder.fromUri(TICKET_ENDPOINT + "?service=" + BASE_URL + TICKET_RESPONSE_ENDPOINT).build();
        return Response.seeOther(uri).build();
    }

    public static Response redirect(String ticket) throws Exception {
        String id = JwtService.validateTicket(ticket);
        String token = JwtService.generateJwt(id, JWT_DEFAULT_ISSUER, id + "@DTU", JWT_TTL);
        return Response.seeOther(UriBuilder.fromUri(CLIENT_BASE_URL + "?token=" + token).build()).build();
    }

    public static Claims validate(String authentication) {
        //String[] tokenArray = authentication.split(" ");
        String token = authentication.split(" ")[1];
        return JwtService.decodeJwt(token);
    }
}

