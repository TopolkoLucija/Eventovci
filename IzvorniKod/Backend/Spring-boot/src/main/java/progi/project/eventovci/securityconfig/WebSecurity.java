package progi.project.eventovci.securityconfig;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;
import progi.project.eventovci.securityconfig.auth.AppConfig;

import java.io.IOException;


@Profile({"test"})
@EnableMethodSecurity(prePostEnabled = true) //this enables method-level security: use @Secured to secure individual methods
@Configuration
@EnableWebSecurity
public class WebSecurity  {

    private JwtAuthEntryPoint authEntryPoint;



    @Autowired
    private AppConfig appConfig; //appConfig.passwordEncoder()

    @Bean
    //authentication
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.authenticationProvider(authenticationProvider());

        http.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        //http.cors(AbstractHttpConfigurer::disable);
        http.authorizeRequests()
                .requestMatchers(new AntPathRequestMatcher("/data")).hasAnyRole("ADMINISTRATOR", "ORGANIZATOR", "POSJETITELJ") // Zastiti rutu
                .requestMatchers(new AntPathRequestMatcher("/data/getOrg/{filter}")).hasAnyRole("ADMINISTRATOR", "ORGANIZATOR", "POSJETITELJ")
                .requestMatchers(new AntPathRequestMatcher("/data/change")).hasAnyRole( "ORGANIZATOR", "POSJETITELJ", "ADMINISTRATOR")
                .requestMatchers(new AntPathRequestMatcher("/data/allUsers/{filter}")).hasAnyRole("ADMINISTRATOR")
                .requestMatchers(new AntPathRequestMatcher("/data/type")).hasAnyRole("ADMINISTRATOR", "ORGANIZATOR", "POSJETITELJ")
                .requestMatchers(new AntPathRequestMatcher("/data/deleteMyProfile")).hasAnyRole( "ORGANIZATOR", "POSJETITELJ")
                .requestMatchers(new AntPathRequestMatcher("/data/deleteUser/{filter}")).hasAnyRole( "ADMINISTRATOR")

                .requestMatchers(new AntPathRequestMatcher("/events/add")).hasRole("ORGANIZATOR")
                .requestMatchers(new AntPathRequestMatcher("/events/all/{filter}")).hasAnyRole("ORGANIZATOR", "ADMINISTRATOR", "POSJETITELJ")
                .requestMatchers(new AntPathRequestMatcher("/events/myInterests/{option}")).hasAnyRole("ORGANIZATOR", "POSJETITELJ")
                .requestMatchers(new AntPathRequestMatcher("/events/delete/{filter}")).hasAnyRole("ADMINISTRATOR", "ORGANIZATOR")
                .requestMatchers(new AntPathRequestMatcher("/events/inbox")).hasAnyRole("ORGANIZATOR", "POSJETITELJ")
                .requestMatchers(new AntPathRequestMatcher("/events/getEvent/{filter}")).hasAnyRole("ORGANIZATOR", "ADMINISTRATOR", "POSJETITELJ")
                .requestMatchers(new AntPathRequestMatcher("/events/myEvents")).hasRole("ORGANIZATOR")
                .requestMatchers(new AntPathRequestMatcher("/events/myOldEvents")).hasRole("ORGANIZATOR")

                .requestMatchers(new AntPathRequestMatcher("/media/get/{filter}")).hasAnyRole("ORGANIZATOR", "ADMINISTRATOR", "POSJETITELJ")

                .requestMatchers(new AntPathRequestMatcher("/membership")).hasRole("ORGANIZATOR")
                .requestMatchers(new AntPathRequestMatcher("/membership/price")).hasRole("ORGANIZATOR")
                .requestMatchers(new AntPathRequestMatcher("/membership/changePrice/{filter}")).hasRole("ADMINISTRATOR")

                .requestMatchers(new AntPathRequestMatcher("/review")).hasAnyRole("ORGANIZATOR", "POSJETITELJ")
                .requestMatchers(new AntPathRequestMatcher("/review/delete/{filter}")).hasAnyRole("ADMINISTRATOR","ORGANIZATOR", "POSJETITELJ")
                .requestMatchers(new AntPathRequestMatcher("/review/get/{filter}")).hasAnyRole("ADMINISTRATOR","ORGANIZATOR", "POSJETITELJ")

                .requestMatchers(new AntPathRequestMatcher("/rsvp")).hasAnyRole("ORGANIZATOR", "POSJETITELJ")
                .requestMatchers(new AntPathRequestMatcher("/rsvp/get/{filter}")).hasAnyRole("ORGANIZATOR", "POSJETITELJ")

                .requestMatchers(new AntPathRequestMatcher("/subscription")).hasAnyRole("ORGANIZATOR", "POSJETITELJ")


                .anyRequest().permitAll(); // Inace sve ostale su dostupne (to su samo login i register)

        http.csrf(csrf -> csrf.disable());
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        http.httpBasic(Customizer.withDefaults());
        return http.build();

        /*

        http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling()
                .authenticationEntryPoint(authEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .requestMatchers(new AntPathRequestMatcher("/login")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/register")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/data")).permitAll()
                .anyRequest().permitAll()
                .and()
                .addFilterBefore(jwtAuthenticationFilter() ,UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults());

        return http.build();

        */

    }

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain h2ConsoleSecurityFilterChain(HttpSecurity http) throws Exception{ //configures security for accessing the H2 Console
        http.securityMatcher(PathRequest.toH2Console());//specifies that this security configuration applies to requests for the H2 Console
        http.csrf(AbstractHttpConfigurer::disable);// disables CSRF protection for the H2 Console
        http.headers((headers) -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)); //sets the frame options to allow the same origin
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(appConfig.passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public  JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter();
    }

}