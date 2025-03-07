package com.leopessoa.engineer.api.auth.service;

import com.leopessoa.engineer.api.models.users.User;
import com.leopessoa.engineer.api.models.users.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;

  public UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws BadCredentialsException {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new BadCredentialsException("Cannot find user with email " + email));
    return user;
  }
}
