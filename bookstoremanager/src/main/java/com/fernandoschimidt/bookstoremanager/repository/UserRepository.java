package com.fernandoschimidt.bookstoremanager.repository;

import com.fernandoschimidt.bookstoremanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
