import os
from datareports.api import api
from datareports.api_static import api as api_static
from datareports.api import data_report_configs

from flask import Flask

app = Flask(__name__, static_url_path='')
app.register_blueprint(api)
app.register_blueprint(api_static)


# Json definition of the report for data_reports
data_report_configs['example_data_report']={ 
        'name'         : 'report_1',
        'display'      : 'Example Report Results',
        'entity'       : 'Company',
        'group'        : 'Development',
        'ordinal'      : 0,
        'uid'          : 'example_1',
        'multi_search' : True,
        'active'       : True,
        'query'        : """SELECT  `id`,`first`,`last`,`item`,`cost`,`loc` FROM `example_table` """,
        'properties':[
            { 'name': 'id'      , 'display': 'id'      ,'ordinal': 0, 'visible': True , 'search': True , 'multi_search': True , 'sortable': True , 'default_sort': True , 'default_sort_asc': True , 'default_sort_ordinal': 0, 'width': 200 },
            { 'name': 'first'   , 'display': 'First'   ,'ordinal': 1, 'visible': False, 'search': True , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 100 },
            { 'name': 'last'    , 'display': 'Last'    ,'ordinal': 2, 'visible': False, 'search': True , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 100 },
            { 'name': 'item'    , 'display': 'Item'    ,'ordinal': 3, 'visible': False, 'search': True , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 100 },
            { 'name': 'cost'    , 'display': 'Cost'    ,'ordinal': 4, 'visible': True , 'search': True , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 50  },
            { 'name': 'loc'     , 'display': 'Location','ordinal': 5, 'visible': True , 'search': True , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 50  },
        ] }
 
#set environment variables for DB
os.environ['DATA_REPORT_DB_USER']='datareports_user'
os.environ['DATA_REPORT_DB_PASS']='datareports_password'
os.environ['DATA_REPORT_DB_HOST']='localhost:3305'
os.environ['DATA_REPORT_DB_NAME']='datareports_test'

if __name__ == "__main__":
    app.run()
