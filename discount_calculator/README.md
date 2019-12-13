# Discount Calculator

* This is a microservice written in Python (3.7) which, given a `user_id` and a `product_id` returns the corresponding discount (as a percentage of the total value and as an absolute value).
* It is implemented as a gRPC server which exposes a method called `CalculateDiscount`.
* It receives a stream of product/user ids and returns the discount as a stream, when all discounts have been obtained.
* If no discount rule applies, or an error occurs while trying to obtain the discount for a certain product, the discount value defaults to 0%.

## Rules for discount [WIP]
* The maximum discount cannot exceed 10% of the value of the product;
* If it is the user's birthday, there is a 5% discount.
* If it is blackfriday (November 25th), there is a 10% discount.


## Docs
* [Python](https://docs.python.org/3.7/)
* [Pytest](https://docs.pytest.org/en/latest/)
* [gRPC](https://grpc.io)