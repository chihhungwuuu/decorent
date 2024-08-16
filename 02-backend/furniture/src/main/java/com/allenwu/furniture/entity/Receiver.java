package com.allenwu.furniture.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="receiver")
@Getter
@Setter
public class Receiver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "cellphone")
    private String cellphone;

    @Column(name = "address")
    private String address;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;

    @Override
    public String toString() {
        return "Receiver{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", cellphone='" + cellphone + '\'' +
                ", address='" + address + '\'' +
                ", order=" + order +
                '}';
    }
}
