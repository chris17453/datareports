import numbers
import decimal


class DataReportRecord:
    """record of queried data"""

    def __init__(self):
        self.model = []

    def add_data(self, data):
        if type(data) is decimal.Decimal:
            self.model.append(float(data))
        else:
            self.model.append(data)
        #print ("x-{0}".format(data))
