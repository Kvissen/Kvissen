package services.auth.repo.localAuth.test;

import Common.AccessScope;
import Common.EnvVars;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;
import services.auth.repo.localAuth.JwtDecoder;
import services.auth.repo.localAuth.JwtGenerator;

class JwtGeneratorTest {

    @Test
    void generate() throws Exception {
        String token = new JwtGenerator().generate("randomNumber", EnvVars.JWT_DEFAULT_ISSUER, AccessScope.creator, EnvVars.JWT_TTL);
        System.out.println(token);
        // Throws exception:
        Claims claim = new JwtDecoder().decode(token);
        System.out.println(claim);
    }
}