package com.leopessoa.engineer.api.models.users.data;

import com.leopessoa.engineer.api.models.users.User;
import com.leopessoa.engineer.api.models.users.enums.Role;
import com.leopessoa.engineer.api.util.Client;
import jakarta.annotation.Nullable;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Client
public class UserResponse {
    private Long id;
    private Role role;
    @Nullable
    private String firstName;
    @Nullable
    private String lastName;
    private String email;
    @Nullable
    private String profileImageUrl;
    private boolean verified;
    private List<ConnectedAccountResponse> connectedAccounts = new ArrayList<>();
    private List<String> authorities = new ArrayList<>();

    public UserResponse(User user) {
        this.id = user.getId();
        this.role = user.getRole();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.verified = user.isVerified();
        this.profileImageUrl = user.getProfileImageUrl();
        user.getConnectedAccounts().forEach((provider) -> {
            this.connectedAccounts.add(new ConnectedAccountResponse(provider.getProvider(), provider.getConnectedAt()));
        });
    }

    public UserResponse(User user, Collection<? extends GrantedAuthority> authorities) {
        this.id = user.getId();
        this.role = user.getRole();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.verified = user.isVerified();
        this.profileImageUrl = user.getProfileImageUrl();
        user.getConnectedAccounts().forEach((provider) -> {
            this.connectedAccounts.add(new ConnectedAccountResponse(provider.getProvider(), provider.getConnectedAt()));
        });
        authorities.forEach(authority -> {
            this.authorities.add(authority.getAuthority());
        });
    }

    public record ConnectedAccountResponse(String provider, LocalDateTime connectedAt) {
    }
}
