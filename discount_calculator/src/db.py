from sqlalchemy import create_engine
from sqlescapy import sqlescape
from functools import lru_cache
from log import logger
import os

connection_string = f"""\
{os.environ.get('DB_DIALECT')}://\
{os.environ.get('DB_USER')}:\
{os.environ.get('DB_PWD')}@\
{os.environ.get('DB_HOST')}/\
{os.environ.get('DB_NAME')}"""

engine = create_engine(connection_string, echo=True)
conn = engine.connect()


@lru_cache(maxsize=264)
def find_entity_by_id(entity_id: str = "0", table: str = "users") -> dict:
    try:

        query = "SELECT * FROM {table} WHERE id = {id}".format(
          table=sqlescape(str(table)), id=sqlescape(int(entity_id)))
        result = conn.execute(query)

        column_names = result.keys()
        values = result.fetchone()

        row = dict(zip(column_names, values))
        logger.debug(f"Result from query: '{row}'")

        return row
    except Exception as e:
        logger.warning(f"Query with entity_id = {entity_id} and table = {table} failed!")
        return {}
