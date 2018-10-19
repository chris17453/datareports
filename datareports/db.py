import os
from sqlalchemy import create_engine
from sqlalchemy import Column, String, Integer, ForeignKey,DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import logging
import click
from flask import current_app, g
from flask.cli import with_appcontext

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

def connect():
    missing_vars=False
    #env_vars={'DATA_REPORT_DB_HOST','DATA_REPORT_DB_PASS','DATA_REPORT_DB_NAME','DATA_REPORT_DB_USER'}
    #for env_var in env_vars:
    #    if None is os.environ.get(env_var):
    #        missing_vars= True
    #        print( "Missing ENVIONMENT VARIABLE -> {}".format(env_var))

    #if True == missing_vars:
    #    return None

    #mysql_config = {
    #    'user'     : os.environ.get('DATA_REPORT_DB_USER') ,
    #    'password' : os.environ.get('DATA_REPORT_DB_PASS') ,
    #    'host'     : os.environ.get('DATA_REPORT_DB_HOST') ,
    #    'database' : os.environ.get('DATA_REPORT_DB_NAME') 
    #}

    mysql_config = {
        'user'     : 'scap-web-user',
        'password' : 'scap-web-password',
        'host'     : '10.50.124.70',
        'database' : 'scap-web-db',
    }
    connect_string = "mysql+pymysql://{}:{}@{}/{}?charset=utf8mb4".format( mysql_config['user'],
                                                                           mysql_config['password'],
                                                                           mysql_config['host'],
                                                                           mysql_config['database'])

    #print (mysql_config)
    engine = create_engine(connect_string, convert_unicode=True, echo=False)
    Session = sessionmaker(bind=engine)
    session=Session()
    return {'session':session,'engine':engine}


def get_db(app):
    if 'db' not in g:
        g.db =connect()
    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

