from discount.calculate import calculate_discount
from concurrent import futures
import discount_pb2_grpc
import discount_pb2
import logging
import grpc
import os


class DiscountCalculatorServicer(discount_pb2_grpc.DiscountCalculatorServicer):
    def CalculateDiscount(self, request_iterator, context):
        for query in request_iterator:
            user_id = query.user_id
            product_id = query.product_id
            discount_response = discount_pb2.DiscountResponse(**calculate_discount(user_id, product_id))

            yield discount_response


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    discount_pb2_grpc.add_DiscountCalculatorServicer_to_server(
        DiscountCalculatorServicer(), server)
    server.add_insecure_port(f"[::]:{os.getenv('GRPC_SERVER_PORT')}")

    # TODO see comment below!!!
    # Because start() does not block you may need to sleep-loop if there is nothing else for your code to do while serving.

    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
