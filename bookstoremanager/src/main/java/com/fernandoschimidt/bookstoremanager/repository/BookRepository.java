package com.fernandoschimidt.bookstoremanager.repository;

import com.fernandoschimidt.bookstoremanager.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {


}
