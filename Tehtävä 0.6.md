```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: Request contains JSON note which has content-type, content and date
    server-->>browser: server answers with status code 201
```
