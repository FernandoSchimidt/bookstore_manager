package com.fernandoschimidt.bookstoremanager.controllers;

import com.fernandoschimidt.bookstoremanager.entity.Author;
import com.fernandoschimidt.bookstoremanager.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/author")
@CrossOrigin("*")
public class AuthorController {

    private AuthorRepository authorRepository;

    @Autowired
    public AuthorController(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Author create(@RequestBody Author author) {
        return authorRepository.save(author);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Integer id) {
        authorRepository
                .findById(id)
                .map(author -> {
                    authorRepository.delete(author);
                    return Void.TYPE;
                });
    }

    @GetMapping
    public Page<Author> list(
            @RequestParam(value = "page", defaultValue = "0") Integer pagina,
            @RequestParam(value = "size", defaultValue = "10") Integer tamanhoPagina
    ) {
        Sort sort = Sort.by(Sort.Direction.ASC, "name");
        PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina, sort);
        return authorRepository.findAll(pageRequest);

    }

    @GetMapping("{id}")
    public Author finById(@PathVariable Integer id) {
        return authorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


    @GetMapping("/all")
    public List<Author> getAll() {
        return authorRepository.findAll();
    }
}
