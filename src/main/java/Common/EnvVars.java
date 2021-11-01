package Common;

/**
 * Mock environment variables
 *
 * @author erlendtyrmi
 */
public class EnvVars {
    public static final boolean IS_PRODUCTION = true; // Reset if you touch this!

    // JWT secret - Move to cloud environment
    public static final String JWT_SECRET_KEY = "AJi4QfGWy6qGEMy99wLPUmcj261ck8pPFVwpiyFasnAlW05wbVXHdWHzrePox1CvBxh5gXf3hA";

    // Server base url
    public static final String BASE_URL = IS_PRODUCTION ? "https://kvissen.herokuapp.com" : "http://localhost:8080/";
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
