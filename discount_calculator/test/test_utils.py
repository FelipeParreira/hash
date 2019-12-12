import pytest
from datetime import date
from src.discount.utils import (
    are_same_date,
    get_todays_date,
)

test_cases = [
    ([date(2019, 11, 25), date(2019, 11, 25)], True),
    ([date(1900, 11, 25), date(2019, 11, 25)], True),
    ([date(2019, 11, 24), date(2019, 11, 25)], False),
    ([date(2019, 10, 25), date(2019, 11, 25)], False),
    ([date(2019, 11, 24), date(2019, 11, 25)], False),
    ([date(1900, 10, 24), date(2019, 11, 25)], False),
]


@pytest.mark.parametrize("test_input,expected", test_cases)
def test_are_same_date(test_input, expected):
    assert (are_same_date(*test_input) == expected)


test_cases = [
    ([], date.today()),
]


@pytest.mark.parametrize("test_input,expected", test_cases)
def test_get_todays_date(test_input, expected):
    assert (get_todays_date(*test_input) == expected)
