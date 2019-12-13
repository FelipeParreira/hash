# Product Listing

* This is a microservice written in NodeJS (12.13) which exposes a REST API (Express) and implements a gRPC client.
* When requested, the API returns a list of 10 products, which are in the given `page` (sent through the HTTP headers). If no `page` is given, the value defaults to 0 (first `page`).
* The products are retrieved directly from the database (via the *Sequelize* ORM).
* The API also returns the `lastPage` and the `nextPage` (which is the maximum existing page number closest to the given `page`).
* If the request sends a `X-USER-ID` (via headers), it is used to calculate the discount.
* The API calls a method `runCalculateDiscount` which calls the *gRPC client* to obtain the given discount. 
* If it is not possible to obtain the discount for a certain product or if the stream (with the *gRPC server*) is interrupted, the discount defaults to 0%.

## Response Example
```json
  {
    "products": [
        {
            "id": 20,
            "price_in_cents": 81000,
            "title": "Tuna",
            "description": "Veritatis dolor reiciendis quisquam. Officiis non minima neque voluptatem aut. Dolorem repudiandae repellat omnis.",
            "discount": {
                "pct": 0.05000000074505806,
                "value_in_cents": 4050
            }
        },
        {
            "id": 21,
            "price_in_cents": 43400,
            "title": "Cheese",
            "description": "Provident ullam libero non veritatis quisquam. Consequatur qui doloremque. Vel explicabo eos id temporibus omnis rerum harum quam.",
            "discount": {
                "pct": 0.05000000074505806,
                "value_in_cents": 2170
            }
        },
        ...
    ],
    "nextPage": 3,
    "lastPage": 99
}
```

## Docs
* [NodeJS](https://nodejs.org/en/docs/)
* [Sequelize](https://sequelize.org/v5/)
* [Express](https://expressjs.com)
* [Jest](https://jestjs.io/docs/en/getting-started.html)
* [gRPC](https://grpc.io)