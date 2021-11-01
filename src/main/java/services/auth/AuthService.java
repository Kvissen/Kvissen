package services.auth;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("auth")
public class AuthService {

    @Path("login")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getLogin() {
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
        } catch (SignatureException | UnsupportedJwtException | MalformedJwtException | IllegalArgumentException u) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        } catch (ExpiredJwtException ex) {
            String message = " Can't handle old tokens";
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
