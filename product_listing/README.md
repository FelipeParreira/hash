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
        {
            "id": 22,
            "price_in_cents": 13300,
            "title": "Car",
            "description": "Illum minima dignissimos fugit consequatur quos. Aperiam sapiente soluta molestiae. Porro alias maxime nam inventore doloribus saepe. Eum dolor aperiam cupiditate non ea.",
            "discount": {
                "pct": 0.05000000074505806,
                "value_in_cents": 665
            }
        },
        {
            "id": 23,
            "price_in_cents": 98600,
            "title": "Table",
            "description": "Perspiciatis et commodi et quo earum ducimus. Enim sit magni voluptas facere. Voluptatem vitae explicabo architecto eligendi nostrum voluptates consequuntur odit. Quam totam voluptatibus debitis. Eius quo doloremque voluptatum sint dolor eos aliquid enim dolor.",
            "discount": {
                "pct": 0.05000000074505806,
                "value_in_cents": 4930
            }
        },
        {
            "id": 24,
            "price_in_cents": 46200,
            "title": "Shirt",
            "description": "Fugit repellendus alias et et dolore temporibus vel. Tempora optio et. Ea suscipit ad et saepe sint voluptates sit saepe. Enim saepe sunt recusandae dolores sunt. Facere odio sed aut officiis voluptas voluptatem. Soluta sequi illo tenetur saepe ipsa non omnis.",
            "discount": {
                "pct": 0.05000000074505806,
                "value_in_cents": 2310
            }
        },
        {
            "id": 25,
            "price_in_cents": 4000,
            "title": "Computer",
            "description": "Iure provident qui fuga quo aut ullam reiciendis illo a. Quis saepe iusto. Culpa odit omnis sit. Laborum numquam vel id aut quia non. Corrupti magni consectetur accusantium doloribus.",
            "discount": {
                "pct": 0.05000000074505806,
                "value_in_cents": 200
            }
        },
        {
            "id": 26,
            "price_in_cents": 20700,
            "title": "Bike",
            "description": "Sint deleniti non porro perspiciatis est provident qui aut. Placeat nobis et deserunt ut cupiditate odit. Qui qui tempore quae et voluptatem. Et recusandae deleniti expedita nobis eum atque accusamus vero.",
            "discount": {
                "pct": 0.05000000074505806,
                "value_in_cents": 1035
            }
        },
        {
            "id": 27,
            "price_in_cents": 70600,
            "title": "Mouse",
            "description": "Qui magni consequatur reprehenderit iusto placeat sunt. Molestiae dolorem corrupti eum voluptas quidem omnis. Odit ut eos. Architecto et et eius perspiciatis qui qui aliquam iure. Facilis autem et nostrum. Error consequatur repellendus repudiandae harum impedit in suscipit ipsa.",
            "discount": {
                "pct": 0.05000000074505806,
                "value_in_cents": 3530
            }
        },
        {
            "id": 28,
            "price_in_cents": 38500,
            "title": "Shirt",
            "description": "Debitis nam eum harum labore sequi aliquam. Temporibus veritatis consequuntur officiis omnis eius laborum. Voluptatem ducimus quasi recusandae dolor id debitis sunt.",
            "discount": {
                "pct": 0.05000000074505806,
                "value_in_cents": 1925
            }
        },
        {
            "id": 29,
            "price_in_cents": 81000,
            "title": "Bike",
            "description": "Eum sequi quam modi doloremque mollitia voluptas iusto. Et ea quia quod ut nulla et itaque vel accusantium. Reiciendis similique enim non iusto amet. Tempore culpa omnis modi expedita suscipit recusandae molestiae aut vel. Occaecati tempora minus iure aut labore voluptate cum et molestiae.",
            "discount": {
                "pct": 0.05000000074505806,
                "value_in_cents": 4050
            }
        }
    ],
    "nextPage": 3,
    "lastPage": 99
}
```

## Docs
* [NodeJS](https://nodejs.org/en/docs/)
* [Sequelize](https://sequelize.org/v5/)
* [Express](https://expressjs.com)
* [gRPC](https://grpc.io)