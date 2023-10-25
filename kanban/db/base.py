import sqlalchemy as sa
from sqlalchemy.orm import DeclarativeBase

meta = sa.MetaData()

class Base(DeclarativeBase):
    metadata = meta