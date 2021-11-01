/*
 * Erlend
 */
package services.auth.jwt.remoteAuth;

import kong.unirest.Unirest;
import services.auth.jwt.localAuth.JwtGenerator;

import javax.ws.rs.NotAuthorizedException;

import static services.auth.EnvVars.*;


public class TicketValidator {

    // Validate the ticket with the services.auth.dtu
    public String validate(String ticket) {

        // Validate ticket and receive id
        String body = Unirest.get(TICKET_VALIDATION_ENDPOINT + "?service=" + BASE_URL + TICKET_RESPONSE_ENDPOINT + "&ticket="
                        + ticket)
                .asString()
                .getBody();

        // Extract id
        String id = "no_id";

        if (body != null && body.toLowerCase().contains("yes")) {
            id = body.substring(4);
            System.out.println("Logged in with DTU: " + id);

        } else if (body != null && body.toLowerCase().contains("no")) {
            throw new NotAuthorizedException("Login rejected by issuer");

        } else {
            throw new NotAuthorizedException("Login failed");
        }

        String token = new JwtGenerator().generate(id, JWT_DEFAULT_ISSUER, id + "@DTU", JWT_TTL);

        return token;
    }
}
