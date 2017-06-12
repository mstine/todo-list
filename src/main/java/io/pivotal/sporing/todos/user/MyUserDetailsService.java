package io.pivotal.sporing.todos.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * @author Matt Stine
 */
public class MyUserDetailsService implements UserDetailsService {

    private UserRepository repository;

    @Autowired
    public MyUserDetailsService(UserRepository userRepository) {
        repository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username);
    }
}
