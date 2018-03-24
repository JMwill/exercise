# Connect salite
from sqlalchemy import create_engine
engine = create_engine('sqlite:///:memory:', echo=True)


# Declare Mapping
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

from sqlalchemy import Column, String, Integer
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    fullname = Column(String)
    password = Column(String)

    def __repr__(self):
        return "<User(name='%s', fullname='%s', password='%s')>" % (
            self.name, self.fullname, self.password)


# Create Schema
Base.metadata.create_all(engine)


# Create Instance of mapped class
ed_user = User(name='ed', fullname='Ed Jones', password='edspassword')
# print(ed_user.name)
# print(ed_user.password)
# print(str(ed_user.id))


# Create a session
from sqlalchemy.orm import sessionmaker
Session = sessionmaker(bind=engine)
# or still not create engine
# Session = sessionmaker()
# Session.configure(bind=engine)
session = Session()


# Adding and updating objects
session.add(ed_user)
our_user = session.query(User).filter_by(name='ed').first()
# print('==============> ', end='')
# print(our_user, end='')
# print(' <==============')
# print(ed_user is our_user)

# add multiple data
session.add_all([
    User(name='wendy', fullname='Wendy Williams', password='foobar'),
    User(name='mary', fullname='Mary Contrary', password='xxg527'),
    User(name='fred', fullname='Fred Flinstone', password='blah')])

# change property
ed_user.password = 'f8s7ccs'
# print(session.dirty)
# print(session.new)

# commit
session.commit()
print(ed_user.id)


# Rolling Back
ed_user.name = 'Edwardo'
fake_user = User(name='fakeuser', fullname='Invalid', password='12345')
session.add(fake_user)

print(session.query(User).filter(User.name.in_(['Edwardo', 'fakeuser'])).all())

session.rollback()
print(session.query(User).filter(User.name.in_(['ed', 'fakeuser'])).all())


# Querying
# for instance in session.query(User).order_by(User.id):
#     print(instance.name, instance.fullname)

# for name, fullname in session.query(User.name, User.fullname):
#     print(name, fullname)

# for row in session.query(User, User.name).all():
#     print(row.User, row.name)

# for row in session.query(User.name.label('name_label')).all():
#     print(row.name_label)

# from sqlalchemy.orm import aliased
# user_alias = aliased(User, name='user_alias')

# for row in session.query(user_alias, user_alias.name).all():
#     print(row.user_alias)

# for u in session.query(User).order_by(User.id)[1:3]:
#     print(u)

# for name, in session.query(User.name).\
#     filter_by(fullname='Ed Jones'):
#     print(name)

# for name, in session.query(User.name).\
#     filter(User.fullname=='Ed Jones'):
#     print(name)

# for user in session.query(User).\
#     filter(User.name=='ed').\
#     filter(User.fullname=='Ed Jones'):
#     print(user)


#Returning List and Scalars
query = session.query(User).filter(User.name.like('%ed')).order_by(User.id)
# print(query.all())
# print(query.first())
# user = query.one() # with error
# user = query.filter(User.id == 99).one() # no row found, throw error


# Using Textual SQL
from sqlalchemy import text
for user in session.query(User).\
    filter(text('id<224')).\
    order_by(text('id')).all():
    print(user.name)

session.query(User).filter(text('id<:value and name=:name')).\
    params(value=224, name='fred').order_by(User.id).one()

session.query(User).from_statement(
    text('SELECT * FROM users where name=:name')).\
    params(name='ed').all()

stmt = text('SELECT name, id, fullname, password '
            'FROM users where name=:name')
stmt = stmt.columns(User.name, User.id, User.fullname, User.password)
print(session.query(User).from_statement(stmt).params(name='ed').all())


# Counting
print(session.query(User).filter(User.name.like('%ed')).count())
from sqlalchemy import func
print(session.query(func.count(User.name), User.name).group_by(User.name).all())

print(session.query(func.count('*')).select_from(User).scalar())


# Building Relationship
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
class Address(Base):
    __tablename__ = 'addresses'
    id = Column(Integer, primary_key=True)
    email_address = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))

    user = relationship('User', back_populates='addresses')

    def __repr__(self):
        return "<Address(email_address='%s')" % self.email_address

User.addresses = relationship(
    "Address", order_by=Address.id, back_populates='user')
