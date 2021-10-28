package com.fernandoschimidt.bookstoremanager.controllers;

import com.fernandoschimidt.bookstoremanager.entity.Book;
import com.fernandoschimidt.bookstoremanager.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/v1/books")
@CrossOrigin("*")
public class BookController {

    private final BookRepository bookRepository;

    @Autowired
    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Book create(@RequestBody Book book) {
        return bookRepository.save(book);
    }


    @GetMapping
    public Page<Book> list(
            @RequestParam(value = "page", defaultValue = "0") Integer pagina,
            @RequestParam(value = "size", defaultValue = "10") Integer tamanhoPagina
    ) {
        Sort sort = Sort.by(Sort.Direction.ASC, "name");
        PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina, sort);
        return bookRepository.findAll(pageRequest);

    }


}
