"""empty message

Revision ID: 1750d7291eff
Revises: fcc105b6e7de
Create Date: 2024-09-16 13:52:33.755441

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1750d7291eff'
down_revision = 'fcc105b6e7de'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('news', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author', sa.String(length=50), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('news', schema=None) as batch_op:
        batch_op.drop_column('author')

    # ### end Alembic commands ###