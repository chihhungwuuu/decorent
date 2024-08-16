package com.allenwu.furniture.payload.response;

import java.util.List;

public class UserInfoResponse {
    private Long id;
    private String username;
    private String email;

    private String cellphone;
    private List<String> roles;

    public UserInfoResponse(Long id, String username, String email, List<String> roles,String cellphone) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.cellphone= cellphone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }
}
