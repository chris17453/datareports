import os
from datareports.api import api
from datareports.api_static import api as api_static
from datareports.api import data_report_configs

from flask import Flask

app = Flask(__name__, static_url_path='')


# Json definition of the report for data_reports
# data_report_configs['example_data_report']={ 
#         'name'         : 'report_1',
#         'display'      : 'Example Report Results',
#         'entity'       : 'Company',
#         'group'        : 'Development',
#         'ordinal'      : 0,
#         'uid'          : 'example_1',
#         'multi_search' : True,
#         'active'       : True,
#         'query'        : """SELECT  `id`,`first`,`last`,`item`,`cost`,`loc` FROM `example_table` """,
#         'properties':[
#             { 'name': 'id'      , 'display': 'id'      ,'ordinal': 0, 'visible': False, 'search': False , 'multi_search': False, 'sortable': True , 'default_sort': True , 'default_sort_asc': True , 'default_sort_ordinal': 0, 'width': 200 },
#             { 'name': 'first'   , 'display': 'First'   ,'ordinal': 1, 'visible': True , 'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 100 },
#             { 'name': 'last'    , 'display': 'Last'    ,'ordinal': 2, 'visible': True , 'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 100 },
#             { 'name': 'item'    , 'display': 'Item'    ,'ordinal': 3, 'visible': True , 'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 100 },
#             { 'name': 'cost'    , 'display': 'Cost'    ,'ordinal': 4, 'visible': True , 'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 50  },
#             { 'name': 'loc'     , 'display': 'Location','ordinal': 5, 'visible': True , 'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 50  },
#         ] }
# os.environ['DATAREPORTS_DB_USER']='datareports_user'
# os.environ['DATAREPORTS_DB_PASS']='datareports_password'
# os.environ['DATAREPORTS_DB_HOST']='127.0.0.1:3305'
# os.environ['DATAREPORTS_DB_NAME']='datareports_test'

data_report_configs['example_data_report']={ 
        'name'         : 'machines',
        'display'      : 'Machines',
        'entity'       : 'etrade',
        'group'        : 'Infra',
        'ordinal'      : 0,
        'uid'          : 'machines1',
        'multi_search' : True,
        'active'       : True,
        'query'        : """select 'node','description','metagroup','workgroup','interface','master','os','processor' FROM etmeta.machines """,
        'properties':[
            { 'name': 'node'          , 'display':'node'         ,'ordinal': 0, 'visible': True,  'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': True , 'default_sort_asc': True , 'default_sort_ordinal': 0, 'width': 200 },
            { 'name': 'description'   , 'display':'description'  ,'ordinal': 1, 'visible': True , 'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 100 },
            { 'name': 'metagroup'     , 'display':'metagroup'    ,'ordinal': 2, 'visible': True , 'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 50 },
            { 'name': 'workgroup'     , 'display':'workgroup'    ,'ordinal': 3, 'visible': True , 'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 20 },
            { 'name': 'interface'     , 'display':'interface'    ,'ordinal': 4, 'visible': True , 'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 100 },
            { 'name': 'master'        , 'display':'master'       ,'ordinal': 5, 'visible': True , 'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 150 },
            { 'name': 'os'            , 'display':'os'           ,'ordinal': 6, 'visible': True , 'search': True  , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 50  },
            { 'name': 'processor'     , 'display':'processor'    ,'ordinal': 7, 'visible': True , 'search': False , 'multi_search': True , 'sortable': True , 'default_sort': False, 'default_sort_asc': False, 'default_sort_ordinal': 0, 'width': 25  },
        ] }


#set environment variables for DB
os.environ['DATAREPORTS_DB_TYPE']='ddb'
app.register_blueprint(api)
app.register_blueprint(api_static)

if __name__ == "__main__":
    app.run("10.50.81.36")
