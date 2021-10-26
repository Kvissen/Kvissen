package auth;

public class EnvVars {
    // Not for production: JWT secret
    public static final String JWT_SECRET_KEY = "AJi4QfGWy6qGEMy99wLPUmcj261ck8pPFVwpiyFasnAlW05wbVXHdWHzrePox1CvBxh5gXf3hA";

    // Default token settings
    public static final String JWT_DEFAULT_ISSUER = "KvisServer";
    public static final long JWT_TTL = 3600000;

    // Ticket Validation URL's. The response endpoint should be the server
    public static final String TICKET_ENDPOINT = "https://auth.dtu.dk/dtu/validate";
    public static final String TICKET_RESPONSE_ENDPOINT = "http://localhost:8080/rest/campusnet/redirect";
}
