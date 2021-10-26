package com.fernandoschimidt.bookstoremanager.controllers;

import com.fernandoschimidt.bookstoremanager.dto.MessageResponseDTO;
import com.fernandoschimidt.bookstoremanager.entity.Author;
import com.fernandoschimidt.bookstoremanager.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public MessageResponseDTO create(@RequestBody Author author) {
        Author savedAuthor = authorRepository.save(author);
        return MessageResponseDTO.builder()
                .message("Author created with ID " + savedAuthor.getId())
                .build();
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        authorRepository.deleteById(id);
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

    @GetMapping("/all")
    public List<Author> getAll() {
        return authorRepository.findAll();
    }
}
