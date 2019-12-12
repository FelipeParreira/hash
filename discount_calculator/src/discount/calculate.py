from db import find_entity_by_id
from log import logger
from .rules import rules, max_discount_rate


def calculate_discount_rate(user: dict = {}, product: dict = {}, discount_rules: list = rules,
                            max_rate: float = max_discount_rate) -> float:
    """Calculates the the discount rate, given a user, a product and a list of rules."""
    discount_rate = 0

    for rule in discount_rules:
        new_discount_rate = rule(user, product)

        if discount_rate < new_discount_rate <= max_rate:
            discount_rate = new_discount_rate

        if discount_rate == max_rate:
            logger.debug(f"""Discount rate for user_id = {user.get('id')} and product_id = {product.get('id')} :\
              {discount_rate} ({rule.__name__})""")
            break

    return discount_rate


def calculate_discount(user_id: str = '', product_id: str = '0',
                      find_entity_by_id_function=find_entity_by_id,
                      calculate_discount_rate_function=calculate_discount_rate) -> dict:
    """Calculates the discount (rate and value in cents) for a given product and user."""
    try:
        logger.info(f"Calculating discount for user_id = {user_id} and product_id = {product_id}")

        user = find_entity_by_id_function(entity_id=user_id, table="users")
        product = find_entity_by_id_function(entity_id=product_id, table="products")
        
        discount_rate = calculate_discount_rate_function(user, product)
        discount_in_cents = int(product['price_in_cents'] * discount_rate)

        logger.info(f"Discount for user_id = {user_id} and product_id = {product_id}: {discount_in_cents}")

    except Exception as e:
        logger.warning(f"Discount for user_id = {user_id} and product_id = {product_id} failed!")
        discount_rate, discount_in_cents = 0, 0

    finally:

        return ({
            'pct': discount_rate,
            'value_in_cents': discount_in_cents,
        })
