package services.auth.jwt.localAuth.test;

import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;
import services.auth.EnvVars;
import services.auth.jwt.localAuth.JwtDecoder;
import services.auth.jwt.localAuth.JwtGenerator;

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