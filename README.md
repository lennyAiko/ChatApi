# Chatify
# Building a chatApi with Nodejs and MongoDB

The code and blog tutorial for this project can be found at [my blog](https://lennyaiko.hashnode.dev/). 

This is a chatApi for developers are may want to add chat feature to their product. It is easy to use and secured.

## Features
1. End-to-end message encryption.
2. Encryption of passwords, messages and API key stored in the DB.
3. Having a friends lists and requests list.
4. Cache requests on the server to ensure fast responses.
5. Send images along with messages.
6. High anonymity, i.e users or admins cannot fetch data that does not belong to them.
7. Tokens assigned at registration and log in.

## Requirements

* [Node.js](http://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [MongoDB Compass](https://www.mongodb.com/products/compass) (optional)
* [Postman](https://www.postman.com/)

## Installation Steps

1. Clone repo
2. Run `npm install`
3. Create a `.env` file in the project root with database connection details and other hidden variables
4. Start MongoDB (using `mongod`) if running locally
5. Run `npm run dev`
6. View endpoints below for more details

## Endpoints

### Auth endpoints

1. Create Admin: Using form-data in postman. Below are the details to send to the API, you can choose to send an image or not, it can be added later on using the modify endpoint.
Endpoint: https://graceful-shift-bee.cyclic.app/auth/admin_register
Request: POST
![create admin details](https://graceful-shift-bee.cyclic.app/create-admin.png)
2. Admin Sign in: Send the request as json to the API. Below are the details to send to the API. 
Endpoint: https://graceful-shift-bee.cyclic.app/auth/admin_register
Request: POST
![log in admin details](https://graceful-shift-bee.cyclic.app/login-admin.png)
3. User Register:   


## License

Chatify's code archives and code examples are licensed under the ISC license.

Copyright © 2022 Lennox Charles

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.