import pytest
from datetime import date, timedelta
from src.discount.rules import (
    check_it_is_users_birthday,
    check_it_is_black_friday,
)

test_cases = [
    ([{"date_of_birth": date.today()}], 0.05),
    ([{"date_of_birth": date.today() - timedelta(days=1)}], 0),
    ([{"date_of_birth": date.today() - timedelta(days=5)}], 0),
    ([{}], 0),
]


@pytest.mark.parametrize("test_input,expected", test_cases)
def test_check_it_is_users_birthday(test_input, expected):
    assert (check_it_is_users_birthday(*test_input) == expected)


test_cases = [
    ([{}, {}, lambda: date.today(), date.today()], 0.1),
    ([{}, {}, lambda: date(2019, 11, 25)], 0.1),
    ([{}, {}, lambda: date.today(), date.today() - timedelta(days=5)], 0),
]


@pytest.mark.parametrize("test_input,expected", test_cases)
def test_check_it_is_black_friday(test_input, expected):
    assert (check_it_is_black_friday(*test_input) == expected)
