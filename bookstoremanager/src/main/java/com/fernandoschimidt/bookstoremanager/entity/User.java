package com.fernandoschimidt.bookstoremanager.entity;

import lombok.*;


import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 150)
    private String username;

    @Column(nullable = false)
    private Integer password;

}
