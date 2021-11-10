/*
 * Erlend
 * Source https://developer.okta.com/blog/2018/10/31/jwts-with-java
 */
package services.auth.repo.localAuth;

import common.EnvVars;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.xml.bind.DatatypeConverter;

// Throw SignatureException exception if no match. Else returns claim.
public class JwtDecoder {
    public Claims decode(String jwt) throws Exception {
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(EnvVars.JWT_SECRET_KEY))
                .parseClaimsJws(jwt).getBody();
    }
}
