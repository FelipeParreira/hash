import os
from datetime import date
from .utils import (
    are_same_date,
    get_todays_date,
)


# TODO cache that expires every day
def check_it_is_users_birthday(user: dict = {}, product: dict = {},
                               get_todays_date_function=get_todays_date) -> float:
    today = get_todays_date_function()
    birthday = user.get("date_of_birth")

    if birthday and are_same_date(today, birthday):
        return 0.05

    return 0


# TODO cache that expires every day
def check_it_is_black_friday(user: dict = {}, product: dict = {},
                             get_todays_date_function=get_todays_date,
                             black_friday: date = date(2019, 11, 25)) -> float:
    today = get_todays_date_function()

    if black_friday and are_same_date(today, black_friday):
        return 0.1

    return 0


max_discount_rate = os.getenv("MAX_DISCOUNT_RATE", 0.1)
rules = [
    check_it_is_users_birthday,
    check_it_is_black_friday,
]
