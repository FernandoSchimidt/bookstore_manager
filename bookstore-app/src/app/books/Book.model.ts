import { Author } from "../authors/Author.model";

export class Book {
    id!: number;
    name!: string;
    chapters!: number;
    pages!: number;
    isbn!: string;
    publisherName!: string;
    author!: Author;

    constructor(name: string, chapters: number, pages: number, isbn: string, publisherName: string, author: Author) {
        this.name = name;
        this.chapters = chapters;
        this.pages = pages;
        this.isbn = isbn;
        this.publisherName = publisherName;
        this.author = author;
    }

}