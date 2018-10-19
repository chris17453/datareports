
class DataReportStats:
    """statisics and structure for queried data"""

    def __init__(self):
        self.name = None
        self.source = None
        self.records = None
        self.lines = None
        self.visible = None
        self.errors = None
        self.blanks = None
        self.comments = None
        self.page = None
        self.page_length = None
        self.returned = None
        self.pages = None
        self.record_start = None
        self.record_end = None
        self.time = None
        self.load_time = None
        self.load_start = None
        self.load_end = None
        self.properties = []
