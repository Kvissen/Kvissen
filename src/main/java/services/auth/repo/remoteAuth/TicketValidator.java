/*
 * Erlend
 */
package services.auth.repo.remoteAuth;

import kong.unirest.Unirest;

import javax.ws.rs.NotAuthorizedException;

import static common.EnvVars.*;


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

        } else if (body != null && body.toLowerCase().contains("no")) {
            throw new NotAuthorizedException("Login rejected by issuer");

        } else {
            throw new NotAuthorizedException("Login failed");
        }

        return id;
    }
}
