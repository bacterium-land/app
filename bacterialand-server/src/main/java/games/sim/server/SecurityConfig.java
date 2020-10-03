package games.sim.server;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

public class SecurityConfig {

    public void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http
                .cors()
                .and()
                .headers()
                .frameOptions().disable()
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/stomp").permitAll() // On autorise l'appel handshake entre le client et le serveur
                .anyRequest()
                .authenticated();
        // @formatter:on
    }
}
