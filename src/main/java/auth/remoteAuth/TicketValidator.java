/*
 * Erlend
 */
package auth.remoteAuth;

import auth.EnvVars;
import kong.unirest.Unirest;


public class TicketValidator {
    private static final String SERVICE_LABEL = "?service=";
    private static final String TICKET_LABEL = "&ticket=";

    // Validate the ticket with the auth.dtu
    public String validate(String ticket) {
        String body = Unirest.get(EnvVars.TICKET_ENDPOINT +
                        SERVICE_LABEL + EnvVars.TICKET_RESPONSE_ENDPOINT +
                        TICKET_LABEL + ticket)
                .asString()
                .getBody();

        // Just print and return the result for now, change to bool or exception
        System.out.println("TicketVal: " + body);
        return body;
    }
}
