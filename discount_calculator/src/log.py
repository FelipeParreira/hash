import logging
import os

log_level = logging.DEBUG if os.getenv("ENV_MODE") == 'dev' else logging.INFO
logging.basicConfig(level=log_level,
                    format='%(asctime)s - %(levelname)s - %(message)s',
                    datefmt='%d-%b-%y %H:%M:%S')

logger = logging.getLogger(__name__)
