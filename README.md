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

1. `Create Admin`: Using form-data in postman. Below are the details to send to the API, you can choose to send an image or not, it can be added later on using the modify endpoint. <br />
`Endpoint`: https://graceful-shift-bee.cyclic.app/auth/admin_register <br />
`Request`: POST
![create admin details](https://github.com/lennyAiko/ChatApi/blob/main/static/create-admin.png)
2. `Admin Sign in`: Send the request as json to the API. Below are the details to send to the API. <br />
`Endpoint`: https://graceful-shift-bee.cyclic.app/auth/admin_login <br />
`Request`: POST
![log in admin details](https://github.com/lennyAiko/ChatApi/blob/main/static/login-admin.png)
3. `User Register`: You need to send `apikey` as an header, containing the api key assigned to the admin. Afterwards using form-data, let the user details be sent to the API, it is optional to add an image to the request, can be done later in modify endpoint. <br />
`Endpoint`: https://graceful-shift-bee.cyclic.app/auth/user_register <br />
`Request`: POST
![user registration details](https://github.com/lennyAiko/ChatApi/blob/main/static/user-register.png) 
4. `User Sign in`: Send the request as json to the API. Below are the details to send to the API. <br />
`Endpoint`: https://graceful-shift-bee.cyclic.app/auth/user_login <br />
`Request`: POST


## License

Chatify's code archives and code examples are licensed under the ISC license.

Copyright © 2022 Lennox Charles

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.