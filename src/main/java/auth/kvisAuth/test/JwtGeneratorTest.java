package auth.kvisAuth.test;

import auth.EnvVars;
import auth.kvisAuth.JwtDecoder;
import auth.kvisAuth.JwtGenerator;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;

class JwtGeneratorTest {

    @Test
    void generate() {
        String token = new JwtGenerator().generate("randomNumber", EnvVars.JWT_DEFAULT_ISSUER, "someone@dtu.dk", EnvVars.JWT_TTL);
        System.out.println(token);
        // Throws exception:
        Claims claim = new JwtDecoder().decode(token);
        System.out.println(claim);
    }
}