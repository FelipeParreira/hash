from discount.calculate import calculate_discount
from concurrent import futures
from log import logger
import discount_pb2_grpc
import discount_pb2
import grpc
import os


class DiscountCalculatorServicer(discount_pb2_grpc.DiscountCalculatorServicer):
    def CalculateDiscount(self, request_iterator, context):
        for query in request_iterator:
            user_id = query.user_id
            product_id = query.product_id
            
            logger.debug(f"Dicount Query: user_id = {user_id} and product_id = {product_id}") 
            discount_response = discount_pb2.DiscountResponse(**calculate_discount(user_id, product_id))

            # send a single response each time
            logger.debug(f"Sending discount response: {discount_response}")
            yield discount_response


def serve():
    with open('./server.key', 'rb') as f:
        private_key = f.read()
    with open('./server.crt', 'rb') as f:
        certificate_chain = f.read()
    
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    server_credentials = grpc.ssl_server_credentials( ( (private_key, certificate_chain), ) )
    discount_pb2_grpc.add_DiscountCalculatorServicer_to_server(
        DiscountCalculatorServicer(), server)
    
    server.add_secure_port(f"[::]:{os.getenv('GRPC_SERVER_PORT')}", server_credentials)
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()
