package progi.project.eventovci.securityconfig;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@Profile("test")
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = false)
//this enables method-level security: use @Secured to secure individual methods
public class WebSecurity  {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll()); //allows all http requests
        http.httpBasic(Customizer.withDefaults());// configures HTTP Basic authentication
        http.csrf(AbstractHttpConfigurer::disable);//disables Cross-Site Request Forgery (an attack that forces authenticated users to submit a request to a Web application against which they are currently authenticated) protection
        return http.build();
    }

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain h2ConsoleSecurityFilterChain(HttpSecurity http) throws Exception{ //configures security for accessing the H2 Console
        http.securityMatcher(PathRequest.toH2Console());//specifies that this security configuration applies to requests for the H2 Console
        http.csrf(AbstractHttpConfigurer::disable);// disables CSRF protection for the H2 Console
        http.headers((headers) -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)); //sets the frame options to allow the same origin
        return http.build();
    }

}
