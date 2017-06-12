package io.pivotal.sporing.todos;

import io.pivotal.sporing.todos.user.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * @author Matt Stine
 */
@Configuration
@EnableWebSecurity
@Profile("test")
public class TestWebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest()
                .permitAll()
                .and()
                .csrf().disable();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return s -> new User();
    }

}
