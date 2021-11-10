package common;

/**
 * Mock environment variables
 *
 * @author erlendtyrmi
 */
public class EnvVars {

    // Handle dev server and local run

    public static String getDeploymentType() {
        String debug = System.getenv("DEPLOYMENT_TYPE");
        return (debug == null) ? "local" : debug;

    }

    public static String getBaseUrl() {
        switch (DEPLOYMENT_TYPE.toLowerCase()) {
            case "prod":
                return "http://kvissen.devops.diplomportal.dk:8080";
            case "dev":
                // Debug server
                return "https://kvissen-dev.caprover-root.kvissen.devops.diplomportal.dk";
            default:
                // On your PC :-)
                return "http://localhost:8080";
        }
    }

    public static String getSecret() {
        String secret = System.getenv("JWT_SECRET_KEY");
        return (secret == null) ? "notSecret" : secret;
    }


    // Sets the environment as 1, 0 or local
    public static final String DEPLOYMENT_TYPE = getDeploymentType();

    // JWT secret - TODO: get from environment
    public static final String JWT_SECRET_KEY = getSecret();
    //public static final String JWT_SECRET_KEY =

    // Server base url
    public static final String BASE_URL = getBaseUrl();
    public static final String CLIENT_JWT_PARSER_URL = BASE_URL + "#login-recipient"; // Note: The "/" is omitted after "#"!

    // Default token settings
    public static final String JWT_DEFAULT_ISSUER = "KvisServer";
    public static final long JWT_TTL = 3600000;

    // Ticket Validation URL's
    public static final String TICKET_ENDPOINT = "https://auth.dtu.dk/dtu/";
    public static final String TICKET_VALIDATION_ENDPOINT = "https://auth.dtu.dk/dtu/validate";
    // Where we would like to receive ticket :-)
    public static final String TICKET_RESPONSE_ENDPOINT = "/api/auth/redirect";
}
