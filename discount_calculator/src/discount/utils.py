from datetime import date


def are_same_date(date1: date, date2: date) -> bool:
    """Checks if two dates have the same day and month."""
    return (date1.day, date1.month) == (date2.day, date2.month)


# TODO how should we account for dates and timezones?
# TODO should we cache this?
def get_todays_date() -> date:
    """Returns today's date."""
    today = date.today()
    return today
