
from data_report_stats import DataReportStats
from data_report_record import DataReportRecord

class DataReportResults:
    """paginated, queried, sorted data with structure ans statisics"""

    def __init__(self):
        self.records = []
        self.stats = DataReportStats()
        self.msg = "Success"

    def add_record(self, record, results):
        r = DataReportRecord()
        index = 0
        #print results.properties
        #print record
        for c in record:
            if True == results.properties[index].visible:
                r.add_data(c)
            else:                  #TODO HACK
                r.add_data("")

            index += 1
        self.records.append(r)
