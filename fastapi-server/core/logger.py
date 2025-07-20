import sys
from loguru import logger

# Bersihin bawaan dari loguru
logger.remove()

# 1️⃣ Handler untuk developer: pretty output ke stdout
logger.add(
    sys.stdout,
    level="DEBUG",
    colorize=True,
    serialize=False,  # Human readable
    filter=lambda record: record["level"].name in ("DEBUG", "INFO", "WARNING"),
)

# 2️⃣ Handler untuk Loki / file: JSON output
logger.add(
    "logs/train.json",
    level="DEBUG",
    serialize=True,  # JSON output ke file
)

# 3️⃣ Handler stderr error → JSON juga
logger.add(
    sys.stderr,
    level="ERROR",
    serialize=True,
)
