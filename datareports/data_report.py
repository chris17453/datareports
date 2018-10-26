import os
from data_report_record import DataReportRecord
from data_report_property import DataReportProperty
from data_report_stats import DataReportStats
from data_report_results import DataReportResults
import db
from sqlalchemy import exc


class DataReport:
    def __init__(self,json=None, name='Rep1', display='Rep1', entity='UNK', group='GRP', ordinal=0, uid='uid1', multi_search=False, active=True, query=''):
        if None != json:
            self.name         = json['name']
            self.display      = json['display']
            self.entity       = json['entity']
            self.group        = json['group']
            self.ordinal      = json['ordinal']
            self.multi_search = json['multi_search']
            self.uid          = json['uid']
            self.active       = json['active']
            self.properties   = []
            self.property_ordinals = []
            self.query             = json['query']
            for p in json['properties']:
                self.new_property(  p['name'],
                                    p['display'],
                                    p['ordinal'],
                                    p['visible'],
                                    p['search'],
                                    p['multi_search'],
                                    p['sortable'],
                                    p['default_sort'],
                                    p['default_sort_asc'],
                                    p['default_sort_ordinal'],
                                    p['width']
                )
            
        else:
            self.name = name
            self.display = display
            self.entity = entity
            self.group = group
            self.ordinal = ordinal
            self.multi_search = multi_search
            self.uid = uid
            self.active = active
            self.properties = []
            self.property_ordinals = []
            self.query = query


    def get_config(self):
        config={}
        config['name']              = self.name
        config['display']           = self.display
        config['entity']            = self.entity
        config['group']             = self.group
        config['ordinal']           = self.ordinal
        config['multi_search']      = self.multi_search
        config['uid']               = self.uid
        config['active']            = self.active
        config['properties']        = self.properties
        config['property_ordinals'] = self.property_ordinals
        config['query']             = self.query
        return config


    def new_property(self,
                     name,
                     display,
                     ordinal,
                     visible,
                     filter,
                     multi_search,
                     sortable,
                     default_sort,
                     default_sort_asc,
                     default_sort_ordinal,
                     width):
        p = DataReportProperty()
        p.ordinal = ordinal
        p.name = name
        p.display = display
        p.width = width
        p.max_width = width
        p.min_width = width
        p.visible =visible
        p.overflow = False
        p.filter = filter
        p.multi_search = multi_search
        p.sort = sortable
        p.default_sort = default_sort
        p.default_sort_asc = default_sort_asc
        p.default_sort_ordinal = default_sort_ordinal
        p.data_ordinal = ordinal

        #p.bind_source = None
        #p.bind_target = None
        #p._type = None
        p.default = None
        p.is_array = False
        p.has_default = False
        p.fixed_width = None
        #p.export = None
        #p.options = None
        self.properties.append(p)
        self.update_ordinals()

    def update_ordinals(self):
        length = len(self.properties)
        temp_ordinals = [None]*length
        for o in self.properties:
            if True == o.visible:
                temp_ordinals[int(o.ordinal)] = o.data_ordinal
            else:
                temp_ordinals[int(o.ordinal)] = -1
        temp_ordinals =[x for x in temp_ordinals if x != -1]
        temp_ordinals.sort()
        self.property_ordinals=temp_ordinals
        

    def MysqlDataTypes(self,type_int):
        types = {
            16   : "MYSQL_TYPE_BIT" ,
            252  : "MYSQL_TYPE_BLOB" ,
            10   : "MYSQL_TYPE_DATE" ,
            12   : "MYSQL_TYPE_DATETIME" ,
            0    : "MYSQL_TYPE_DECIMAL" ,
            5    : "MYSQL_TYPE_DOUBLE" ,
            247  : "MYSQL_TYPE_ENUM" ,
            4    : "MYSQL_TYPE_FLOA" ,
            255  : "MYSQL_TYPE_GEOMETRY" ,
            9    : "MYSQL_TYPE_INT24" ,
            3    : "MYSQL_TYPE_LONG" ,
            8    : "MYSQL_TYPE_LONGLONG" ,
            251  : "MYSQL_TYPE_LONG_BLOB" ,
            250  : "MYSQL_TYPE_MEDIUM_BLOB" ,
            14   : "MYSQL_TYPE_NEWDATE" ,
            246  : "MYSQL_TYPE_NEWDECIMAL" ,
            6    : "MYSQL_TYPE_NULL" ,
            248  : "MYSQL_TYPE_SET" ,
            2    : "MYSQL_TYPE_SHORT" ,
            254  : "MYSQL_TYPE_STRING" ,
            11   : "MYSQL_TYPE_TIME" ,
            7    : "MYSQL_TYPE_TIMESTAMP" ,
            1    : "MYSQL_TYPE_TINY" ,
            249  : "MYSQL_TYPE_TINY_BLOB" ,
            15   : "MYSQL_TYPE_VARCHAR" ,
            253  : "MYSQL_TYPE_VAR_STRING" ,
            13   : "MYSQL_TYPE_YEA" 
        }

        return types.get(int(type_int),"nothing")

    def pre_configure(self,db,query,name=None,uid=None):
        session=db
        conn=session['session']
        query_wrapper="""
        CREATE TEMPORARY TABLE IF NOT EXISTS `temp` AS ({}); 
       """.format(query)
        rows=None
        try:
            

            rows=conn.execute(query_wrapper)
            rows=conn.execute("DESCRIBE `temp`")
            rows=rows._cursor_description()
            for ordinal,meta in enumerate(rows):
                print("Column {}:".format(ordinal))
                desc = meta
                print("  column_name = {}".format(desc[0]))
                print("  Type = {}--{}".format(desc[1],self.MysqlDataTypes(desc[1])))
                print("  Default = {}".format(desc[2]))
                print("  Precision1 = {}".format(desc[3]))
                print("  Precision2 = {}".format(desc[4]))
                print("  x = {}".format(desc[5]))
                print(" Null = {}".format(desc[6]))

                
                
        except exc.SQLAlchemyError as e:
            print( "DB Error:",str(e) )
            return None
        return rows
        
        

    def fetch(self, app, request):
        results = DataReportResults()
        session=db.get_db(app)
        
        print(session)
        
        page = request['page']
        record_length = request['page_length']
        start_index = page*record_length
        limit = ""
        order_by = ""
        where_clause = ""
        where = []
        where_and = []
        q = ""

        if True is request['paginate']:
            limit = "LIMIT {0},{1}".format(start_index, record_length)

        if 0 < len(request['sort']):
            order = []
            for i in request['sort']:
                if i[0] < len(self.properties):
                    if 0 == i[1]:
                        dir = "DESC"
                    else:
                        dir = "ASC"
                    order.append("`"+self.properties[i[0]].name+"`"+" "+dir)
            if 0 < len(order):
                order_by = "ORDER BY "+",".join(order)
        if 0 < len(request['filter']):
            for i in request['filter']:
                if i[0] < len(self.properties):
                    where_and.append(
                        "`"+self.properties[i[0]].name+"`"+" LIKE '"+i[1]+"%%' ")

        if "" != request['multi_search']:
            for p in self.properties:
                if True == p.multi_search:
                    where.append("`"+p.name+"`"+" LIKE '" +
                                 request['multi_search']+"%%' ")

        if 0 < len(where) or  0< len(where_and):
            if 0 < len(where):
                where_clause +="("+" OR ".join(where)+") "
                
            if 0< len(where_and):
                if len(where_clause) > 0:
                    where_clause +=" AND "
                where_clause += "("+"AND".join(where_and)+")"
            where_clause = "WHERE "+where_clause
        else:
            where_clause = ""

        q = """select * FROM 
        ({0}) as WRAPPED 
        {1} 
        {2}
        {3}""".format(self.query,where_clause, order_by, limit)

        count = "SELECT count(*) FROM (SELECT * FROM ({0}) AS WRAPPED  {1}) as res".format(self.query, where_clause)

        print("-------------------")
        print("QUERY:"+self.query)
        print("ORDER:"+order_by)
        print("WHERE:"+where_clause)
        print("LIMIT:"+limit)
        print("Calculated: "+q)        # debug
        print("Calculated Count: "+count)        # debug


        conn=session['engine']

        try:
            rows=conn.execute(count)
            for row in rows:
                total_records = row[0]
                results.count = row[0]
        except exc.SQLAlchemyError as e:
            print( str(e) )
            results.msg="Error"
            return results


        records=conn.execute(q)
        returned_length=rows.rowcount
        
        for row in records:
            results.add_record(row, self)
        
        pages = total_records/record_length
        if type(pages) is float:
            pages = 1+int(pages)

        results.stats.name = self.name
        results.stats.records = total_records
        results.stats.lines = None
        results.stats.visible = total_records
        results.stats.errors = 0
        results.stats.blanks = None
        results.stats.comments = None
        results.stats.page = page
        results.stats.page_length = record_length
        results.stats.returned = returned_length
        results.stats.pages = pages
        results.stats.record_start = start_index
        results.stats.record_end = start_index+results.stats.returned-1
        results.stats.time = None
        results.stats.load_time = None
        results.stats.load_start = None
        results.stats.load_end = None
        results.stats.properties = self.properties


        return results
