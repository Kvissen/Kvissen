package services.auth;

/**
 * Mock environment variables
 */
public class EnvVars {
    // Not for production: JWT secret
    public static final String JWT_SECRET_KEY = "AJi4QfGWy6qGEMy99wLPUmcj261ck8pPFVwpiyFasnAlW05wbVXHdWHzrePox1CvBxh5gXf3hA";

    // Server base url
    public static final String BASE_URL = "http://localhost:8080/";
    public static final String CLIENT_BASE_URL = BASE_URL + "#login-recipient"; // Note: The "/" is omitted after "#"!

    // Default token settings
    public static final String JWT_DEFAULT_ISSUER = "KvisServer";
    public static final long JWT_TTL = 3600000;

    // Ticket Validation URL's
    public static final String TICKET_ENDPOINT = "https://auth.dtu.dk/dtu/";
    public static final String TICKET_VALIDATION_ENDPOINT = "https://auth.dtu.dk/dtu/validate";
    // Where we would like to receive ticket :-)
    public static final String TICKET_RESPONSE_ENDPOINT = "api/auth/redirect";
}
