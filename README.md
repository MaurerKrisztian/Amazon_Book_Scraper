## Amazon book scraper

## features:
* get book information by asin or other book id
* save data to database

###  Endpoints:
```javascript
POST '/v1/products' {"asin": ""} - get book informations
GET '/api-docs' - Swagger api doc
GET '/spec'  - raw api doc yaml
```

### Env file:
```env
PORT =              #server prot
DB_URI =            #mongodb uri
DB_NAME =
```
### example:

request:
```javascript
POST '/v1/products'
{
    "asin": "B075LRM681"
}
```

response:
```json
{
    "result": {
        "n": 1,
        "opTime": {
            "ts": "6943294227212140575",
            "t": 32
        },
        "electionId": "7fffffff0000000000000020",
        "ok": 1,
        "$clusterTime": {
            "clusterTime": "6943294227212140575",
            "signature": {
                "hash": "6cQrH2Y+9LJhIC8KkYDWbb3f8v4=",
                "keyId": "6880927934819860482"
            }
        },
        "operationTime": "6943294227212140575"
    },
    "connection": {
        "id": 3,
        "host": "cluster0-shard-00-01.va3vb.mongodb.net",
        "port": 27017
    },
    "ops": [
        {
            "products": [
                {
                    "tab": "Kindle",
                    "title": "Clean Architecture A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series)",
                    "description": "<p><b>Practical Software Architecture Solutions from the Legendary Robert C. Martin (“Uncle Bob”)</b></p> <p>&nbsp;</p> <p>By applying universal rules of software architecture, you can dramatically improve developer productivity throughout the life of any software system. Now, building upon the success of his best-selling books <i>Clean Code</i> and <i>The Clean Coder,</i> legendary software craftsman Robert C. Martin (“Uncle Bob”) reveals those rules and helps you apply them.</p> <p>&nbsp;</p> <p>Martin’s <i><b>Clean Architecture</b></i> doesn’t merely present options. Drawing on over a half-century of experience in software environments of every imaginable type, Martin tells you what choices to make and why they are critical to your success. As you’ve come to expect from Uncle Bob, this book is packed with direct, no-nonsense solutions for the real challenges you’ll face–the ones that will make or break your projects.</p> <ul>  <li>Learn what software architects need to achieve–and core disciplines and practices for achieving it</li>  <li>Master essential software design principles for addressing function, component separation, and data management</li>  <li>See how programming paradigms impose discipline by restricting what developers can do</li>  <li>Understand what’s critically important and what’s merely a “detail”</li>  <li>Implement optimal, high-level structures for web, database, thick-client, console, and embedded applications</li>  <li>Define appropriate boundaries and layers, and organize components and services</li>  <li>See why designs and architectures go wrong, and how to prevent (or fix) these failures</li> </ul> <p><i><b>Clean Architecture</b></i> is essential reading for every current or aspiring software architect, systems analyst, system designer, and software manager–and for every programmer who must execute someone else’s designs.</p> <p><br></p> <p> </p> <p><i>Register your product for convenient access to downloads, updates, and/or corrections as they become available.</i></p>",
                    "img": "https://images-na.ssl-images-amazon.com/images/I/411csr6Nn0L._SX381_BO1,204,203,200_.jpg",
                    "ASIN": "B075LRM681",
                    "Publisher": "Pearson; 1st edition (September 12, 2017)",
                    "Publication date": "September 12, 2017",
                    "Language": "English",
                    "File size": "9057 KB",
                    "Simultaneous device usage": "Up to 5 simultaneous devices, per publisher limits",
                    "Text-to-Speech": "Enabled",
                    "Enhanced typesetting": "Enabled",
                    "X-Ray": "Not Enabled",
                    "Word Wise": "Enabled",
                    "Print length": "430 pages",
                    "Lending": "Not Enabled"
                },
                {
                    "tab": "Audiobook",
                    "title": "Clean Architecture A Craftsman's Guide to Software Structure and Design",
                    "description": "<p>By applying universal rules of software architecture, you can dramatically improve developer productivity throughout the life of any software system. Now, building upon the success of his best-selling books <i>Clean Code</i> and <i>The Clean Coder</i>, legendary software craftsman Robert C. Martin (“Uncle Bob”) reveals those rules and helps you apply them.</p> <p>Martin’s <i>Clean Architecture </i>doesn’t merely present options. Drawing on over a half-century of experience in software environments of every imaginable type, Martin tells you what choices to make and why they are critical to your success. As you’ve come to expect from Uncle Bob, this book is packed with direct, no-nonsense solutions for the real challenges you’ll face - the ones that will make or break your projects.</p> <p></p> <ul> <li>Learn what software architects need to achieve–and core disciplines and practices for achieving it</li> <li>Master essential software design principles for addressing function, component separation, and data management</li> <li>See how programming paradigms impose discipline by restricting what developers can do</li> <li>Understand what’s critically important and what’s merely a “detail”</li> <li>Implement optimal, high-level structures for web, database, thick-client, console, and embedded applications</li> <li>Define appropriate boundaries and layers, and organize components and services</li> <li>See why designs and architectures go wrong, and how to prevent (or fix) these failures</li> </ul> <p><i>Clean Architecture</i> is an essential book for every current or aspiring software architect, systems analyst, system designer, and software manager - and for every programmer who must execute someone else’s designs.</p>",
                    "img": "https://m.media-amazon.com/images/I/51ev4PLtsML.jpg",
                    "author": "Upfront Books",
                    "listeningLength": "8 hours and 24 minutes",
                    "narrator": "Theodore O'Brien",
                    "releaseDate": "March 09, 2021",
                    "publisher": "Upfront Books",
                    "programType": "Audiobook",
                    "language": "English",
                    "asin": "B08X8H5G2J",
                    "version": "Unabridged"
                },
                {
                    "tab": "Paperback",
                    "title": "Clean Architecture A Craftsman's Guide to Software Structure and Design",
                    "description": "<p>By applying universal rules of software architecture, you can dramatically improve developer productivity throughout the life of any software system. Now, building upon the success of his best-selling books <i>Clean Code</i> and <i>The Clean Coder</i>, legendary software craftsman Robert C. Martin (“Uncle Bob”) reveals those rules and helps you apply them.</p> <p>Martin’s <i>Clean Architecture </i>doesn’t merely present options. Drawing on over a half-century of experience in software environments of every imaginable type, Martin tells you what choices to make and why they are critical to your success. As you’ve come to expect from Uncle Bob, this book is packed with direct, no-nonsense solutions for the real challenges you’ll face - the ones that will make or break your projects.</p> <p></p> <ul> <li>Learn what software architects need to achieve–and core disciplines and practices for achieving it</li> <li>Master essential software design principles for addressing function, component separation, and data management</li> <li>See how programming paradigms impose discipline by restricting what developers can do</li> <li>Understand what’s critically important and what’s merely a “detail”</li> <li>Implement optimal, high-level structures for web, database, thick-client, console, and embedded applications</li> <li>Define appropriate boundaries and layers, and organize components and services</li> <li>See why designs and architectures go wrong, and how to prevent (or fix) these failures</li> </ul> <p><i>Clean Architecture</i> is an essential book for every current or aspiring software architect, systems analyst, system designer, and software manager - and for every programmer who must execute someone else’s designs.</p>",
                    "img": "https://m.media-amazon.com/images/I/51ev4PLtsML.jpg"
                }
            ],
            "asins": [
                "B075LRM681",
                "B08X8H5G2J"
            ],
            "_id": "605b89508103d13f6c04edda"
        }
    ],
    "insertedCount": 1,
    "insertedId": "605b89508103d13f6c04edda",
    "n": 1,
    "opTime": {
        "ts": "6943294227212140575",
        "t": 32
    },
    "electionId": "7fffffff0000000000000020",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6943294227212140575",
        "signature": {
            "hash": "6cQrH2Y+9LJhIC8KkYDWbb3f8v4=",
            "keyId": "6880927934819860482"
        }
    },
    "operationTime": "6943294227212140575"
}
```
