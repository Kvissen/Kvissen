package services.auth;

import io.jsonwebtoken.Claims;
import services.auth.jwt.localAuth.JwtDecoder;
import services.auth.jwt.remoteAuth.TicketValidator;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.net.URI;

import static services.auth.EnvVars.*;

public class AuthDAO {
    public static Response login() {
        URI uri = UriBuilder.fromUri(TICKET_ENDPOINT + "?service=" + BASE_URL + TICKET_RESPONSE_ENDPOINT).build();
        return Response.seeOther(uri).build();
    }

    public static String redirect(String ticket) throws Exception {
        System.out.println("single use ticket received: " + ticket);
        return new TicketValidator().validate(ticket);
    }

    public static Claims validate(String authentication) {
        String[] tokenArray = authentication.split(" ");
        String token = tokenArray[tokenArray.length - 1];
        return new JwtDecoder().decode(token);
    }


//        return new HashMap<String, String>(){{
//            put("access_token", new JwtService().generateJwt("1", JWT_DEFAULT_ISSUER, "app", JWT_TTL));
//        }};
}

