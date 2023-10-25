from typing import AsyncGenerator

from fastapi import Depends

from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from sqlalchemy.orm import DeclarativeBase

DATABASE = 'postgresql://postgres:asyncpg@localhost:5432/kanban'


## USER MODELS

#TODO: FACTOR OUT BASE CLASS
class Base(DeclarativeBase):
    pass

class User(SQLAlchemyBaseUserTableUUID, Base):
    pass

engine = create_async_engine(DATABASE, echo=True, future=True)

async_session = async_sessionmaker(engine, expire_on_commit=False)

async def create_db_ad_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session

        
async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)

