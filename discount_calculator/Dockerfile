#####################
# DEVELOPMENT IMAGE #
#####################

# Pull base image
FROM python:3.7 AS discount-calculator-builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH .
ENV ENV_MODE dev

# Set work directory
WORKDIR /code

# Install dependencies
COPY discount_calculator/Pipfile discount_calculator/Pipfile.lock /code/
RUN pip install pipenv && pipenv install --system --dev

# Copy project
COPY ./discount_calculator /code/
COPY ./protos/ /code/

# Copy TLS credentials
COPY ./server.crt ./server.key /code/

# Generate gRPC files
RUN python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. ./discount.proto

# Run starting command
CMD ["python", "src/server.py"]

#####################
# PRODUCTION IMAGE #
#####################

# Pull base image
FROM python:3.7 AS discount-calculator-prod

# Set environment variables
# write bytecode for performance reasons
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH .

# Set work directory
WORKDIR /code

# Install dependencies 
COPY discount_calculator/Pipfile discount_calculator/Pipfile.lock /code/
RUN pip install pipenv && pipenv install --system

# Copy source code
COPY --from=discount-calculator-builder /code/src /code/

# Run starting command
CMD ["python", "src/server.py"]