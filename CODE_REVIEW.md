#### CODE REVIEW - TASK 1 ####
 
The 'okreads' app allows you to search for books and add them to your reading list.
We can also remove the added books from the reading list. 
The application uses Angular for front-end experience, NGRX for creating store that 
maintains the data which is shared across multiple components, and NestJs for building 
scalable Node.js server-side application. We have used NX(nrwl) for creating Monorepo 
which contains both the frontend and the backend of the application in one place. 


---------------------------------------------------------------------------------------------------------


#### CODE SMELLS:
    1. File - book-search.component.html
            The template contains a date function to change the format of the date. 

        ```
            <strong>Published:</strong> {{ formatDate(b.publishedDate) }}

        ```
            
            Instead of using a function, we can use an angular date pipe to change the format.
            Pipes are useful because you can use them throughout your application, while 
            only declaring each pipe once
        
        ```
            <strong>Published:</strong> {{ b.publishedDate | date: 'dd/MM/yyyy' }}

        ```
    

    2. File - books.effect.spec.ts
             Maybe for better control, we can use Promises instead of 
             done.


    3. File - book-search.component.ts
              In the below-given code, we do not have any error hook for subscribe, which 
              makes it difficult to handle any exception.

        ```
              this.store.select(getAllBooks).subscribe(books => {
                this.books = books;
               });

        ```


    4. Proper naming conventions were not used in some classes.
         ** For example in file: book-search.component.html
        
        ``` 
                <div class="book--title">
                <div class="book--content">
                <div class="book--content--cover">
        ```
             it should be
        
        ```     
                 <div class="book-title">
                 <div class="book-content">
                 <div class="book-content-cover">
        ```
        ** End-to-End (E2E) test file names

        Do name end-to-end test specification files after the feature they test with 
        a suffix of .e2e-spec.

        Because it provides a consistent way to quickly identify end-to-end tests and provides 
        pattern matching for test runners and build automation. 

        ```
                 File: reading-list.spec.ts & search-books.specs.ts 

                 should be with e2e-spec suffix.

                 reading-list.e2e-spec.ts & search-books.e2e-spec.ts

        ```

   
    5. File: book-search.component.ts
        To prevent memory leak we can use async pipe instead of subscription, for retreiving books.

        ```
                books$ = this.store.select(getAllBooks);
                Use Observable like shown above, remove ngOnInit() to remove subscribe.

        ```
        book-search.component.html 

        ```
                *ngFor="let b of books$ | async"

        ```


    6. File: total-count.component.ts

        ```
                ngOnInit(): void {}

        ```
        We should not import Angular lifecycle hooks without it's utilization. 
        It is a good practice to keep the code bundle size in mind.


    7. It is a good practice to use arrow functions of ES6 instead of normal functions.
         
         File: book-search.component.ts

        ```
                searchExample = () => {}
                searchBooks = () => {}
        ```

        File: reading-list.component.ts

        ```
                removeFromReadingList = (item) => {}
        ```
    
    
    8. File: book-serch.component.html
        We can add form validation for book search field. The search button should
        be disabled if the search field is empty.
        
        ```
                [disabled] = "!searchForm.valid"

        ```

         file: book-search.component.ts

        ```
                  searchForm = this.fb.group({
                  term: new FormControl(null, [Validators.required])        
        ```


    9.  Incorrect description for reading list reducer test case and book search 
        component test case.
        We should always provide a meaningful and correct test case descriptions.

        File: reading-list.reducer.spec.ts

        ```
                describe('Books Reducer', () => {}
                describe('valid Books actions', () => {}
        ```

            As the test cases are for reading list the description should be related to
            reading list.
        
        ```
    
                describe('Reading List Reducer', () => {}
                describe('valid Reading List actions', () => {}
        ```

       File: book-search.component.spec.ts

        ```
                describe('ProductListComponent', () => {}
        ```

            As the test case is related to book search component the description should be
            Product List Component.
        
        ```
                describe('BookSearchComponent', () => {}
        ```


    10. File: books.reducer.spec.ts
    
        Added negative test case for book search success, i.e book search failure.

        ```
                it('should show error when there is a book search failure', () => {}
        ```


    11. File: reading-list.reducer.ts

        `addToReadingList` & `removeFromReadingList`, both are responsible for calling APIs 
        to add and remove book to and from the reading list respectively and also updates the state
        without checking the success and failure of the APIs. 
        Therefore, both should be changed to `confirmedAddToReadingList` and `confirmedRemoveFromReadingList`.

        Fixed the test cases for reading-list.reducer.ts


---------------------------------------------------------------------------------------------------------


#### SUGGESTIONS

    1. Sign-in and Sign-up functionality can be added so that the user can have their account 
       and can maintain the reading list.  

    2. We can have a clear button in the search field for a better user experience.

    3. We can have different categories in the reading list or we can have a filter that filters 
       out the list according to the user's choice.

    4. Application can be made responsive for mobile phones.

    5. We can have a floating label on the book search field.



---------------------------------------------------------------------------------------------------------



#### ACCESSIBILITY


    ###### Lighthouse accessibility checks:

            1. Meta description for the app was missing. --> Fixed. 

            2. Some buttons were missing ARIA-LABEL for accessible names. --> Fixed.

            3. Contrast Background and foreground colors were not having a sufficient contrast
                ratio. --> Fixed.

            4. Focus styles are so essential for people using keyboards and keyboard emulators
                therefore, changed styling of button elements for better keyboard navigation. 


    ###### Manual accessibility checks:

            1. Reading List button on the navbar was fixed with different styling for a better 
               experience, as it was difficult to check whether it was focusable or not. -->Fixed

            2. Change in the styling of 'Want to Read' button on hover and also changed the search 
                example text color for better visibility. -->Fixed

            3. The anchor tag "JavaScript" was not accessible from the keyboard. Fixed it by making 
                it a button, added some styling, and made it keyboard focusable.

            4. Added title for book-covers image, so the browsers display title text as tooltips 
                when moused over.



----------------------------------------------------------------------------------------------------------