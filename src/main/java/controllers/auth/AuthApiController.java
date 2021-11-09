package controllers.auth;

import services.auth.AuthService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST interface for authentication
 *
 * @author erlendtyrmi
 */
@Path("auth")
public class AuthApiController {

    @Path("login")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getLogin() {
        try {
            return AuthService.login();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Path("redirect")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response redirect(@QueryParam("ticket") String ticket) {
        try {
            return AuthService.redirect(ticket);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Path("player-login/{quizCode}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response playerLogin(@PathParam("quizCode") final String quizCode) {
        try {
            return AuthService.playerLogin(quizCode);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
