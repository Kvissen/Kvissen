/*
 * Erlend
 * Source https://developer.okta.com/blog/2018/10/31/jwts-with-java
 */
package services.auth.jwt.localAuth;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import services.auth.EnvVars;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

public class JwtGenerator {

    // Generates a new JWT. The ID should be generated.
    // The subject must be unique, and can be generated or possibly DTU mail.
    public String generate(String id, String issuer, String subject, long ttlMillis) {

        // Hashing algorithm
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        // Issued At claim
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // Sign JWT
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(EnvVars.JWT_SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        // Add claims
        JwtBuilder builder = Jwts.builder().setId(id)
                .setIssuedAt(now)
                .setSubject(subject)
                .setIssuer(issuer)
                .signWith(signatureAlgorithm, signingKey);

        // Expiry time
        if (ttlMillis > 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        return builder.compact();
    }
}
