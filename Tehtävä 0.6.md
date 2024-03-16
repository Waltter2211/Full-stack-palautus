```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: User saves new note to the website using POST method
    activate server
    server-->>browser: status code 201 no redirect
    deactivate server
```
