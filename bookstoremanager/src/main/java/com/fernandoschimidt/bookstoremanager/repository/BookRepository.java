package com.fernandoschimidt.bookstoremanager.repository;

import com.fernandoschimidt.bookstoremanager.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
