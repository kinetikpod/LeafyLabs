import asyncpg
from contextlib import asynccontextmanager
from core.settings import settings
from asyncpg.pool import Pool
from typing import Optional, AsyncGenerator


class Database:
    def __init__(self):
        self._pool: Optional[Pool] = None

    async def connect(self) -> None:
        self._pool = await asyncpg.create_pool(settings.DATABASE_URL)

    async def disconnect(self) -> None:
        if self._pool:
            await self._pool.close()
            self._pool = None

    @asynccontextmanager
    async def get_connection(self) -> AsyncGenerator[asyncpg.Connection, None]:
        if self._pool is None:
            raise RuntimeError("Database pool has not been initialized.")

        async with self._pool.acquire() as conn:
            yield conn


db = Database()
