package controllers.auth;

import controllers.prometheus.Metrics;
import services.auth.AuthService;

import javax.annotation.security.PermitAll;
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
    @PermitAll // Anyone can try to log in :-)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getLogin() {
        Metrics.loginAttemptCounter.inc();
        try {
            return Response.seeOther(AuthService.login()).build();
        } catch (Exception e) {
            Metrics.loginFailedCounter.inc();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Path("redirect")
    @GET
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response redirect(@QueryParam("ticket") String ticket) {
        try {
            return Response.seeOther(AuthService.redirect(ticket)).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Path("player-login/{quizCode}")
    @GET
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response playerLogin(@PathParam("quizCode") final String quizCode) {
        try {
            return Response.seeOther(AuthService.playerLogin(quizCode)).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
