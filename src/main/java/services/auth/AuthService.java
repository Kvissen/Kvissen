package services.auth;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST interface for authentication
 *
 * @author erlendtyrmi
 */
@Path("auth")
public class AuthService {

    @Path("login")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response login() {
        try {
            return AuthHandler.login();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Path("redirect")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response redirect(@QueryParam("ticket") String ticket) {
        try {
            return AuthHandler.redirect(ticket);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Path("player-login")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response playerLogin() {
        try {
            return AuthHandler.playerLogin();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
