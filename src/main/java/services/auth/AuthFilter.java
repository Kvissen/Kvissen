package services.auth;

import io.jsonwebtoken.Claims;

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Filtering incoming requests based on scope
 * Source code borrowed: https://howtodoinjava.com/jersey/jersey-rest-security/
 *
 * @author erlendtyrmi
 */

@Provider
public class AuthFilter implements javax.ws.rs.container.ContainerRequestFilter {

    @Context
    private ResourceInfo resourceInfo;

    private static final String AUTHORIZATION_PROPERTY = "Authorization";
    private static final String AUTHENTICATION_SCHEME = "Basic";

    @Override
    public void filter(ContainerRequestContext requestContext) {
        Method method = resourceInfo.getResourceMethod();
        //Access allowed for all
        if (!method.isAnnotationPresent(PermitAll.class)) {
            //Access denied for all
            if (method.isAnnotationPresent(DenyAll.class)) {
                requestContext.abortWith(Response.status(Response.Status.FORBIDDEN)
                        .entity("\"Access blocked for all users!!\"").build());
                return;
            }

            // Get auth header
            final MultivaluedMap<String, String> headers = requestContext.getHeaders();
            final List<String> authorization = headers.get(AUTHORIZATION_PROPERTY);

            // Block if no auth
            if (authorization == null || authorization.isEmpty()) {
                requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                        .entity("\"You cannot access this resource\"").build());
                return;
            }

            //Verify token
            String token;
            Claims claims;
            try {
                token = authorization.get(0);
                claims = AuthService.validate(authorization.get(0));
            } catch (Exception e) {
                System.out.println("Failed to validate token.");
                e.printStackTrace();
                requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                        .entity("\"You cannot access this resource\"").build());
                return;
            }

            //Verify user access
            if (method.isAnnotationPresent(RolesAllowed.class)) {
                RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
                Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));
                if (!rolesSet.contains(claims.get("scope"))) {
                    requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                            .entity("\"You cannot access this resource\"").build());
                }
            }
        }
    }
}
