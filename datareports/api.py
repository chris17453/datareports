global data_report_configs
import os
import sys
import jsonpickle
from flask import Flask, request,send_from_directory, render_template, Blueprint
from data_report import DataReport
from data_report_config import load_yaml
data_report_configs={}
api = Blueprint('data_reports_api', __name__, template_folder='templates')


def get_data_report_config_from_post_uid():
    """Return the dict containing the Data Report Configuration based off of the Post variable UID, which is loaded by the client python package"""
    req_data= request.get_json()
    report=req_data['uid']
    if 'uid' not in req_data:
        print("Json invalid. Report key invalid")
        return None
    report= req_data['uid']
    if None == report:
        print("Json invalid. Report key invalid")
        return None
    # Try global config, for self loaded configs
    if report not in data_report_configs:
        print("report {} not loaded".format(report))
        return None
    return  data_report_configs[report]


@api.route('/api/data_report/config', methods=['POST'])
def config():
    """Return the json encoded data report configuration for the provided post 'UID'"""
    report=get_data_report_config_from_post_uid()
    # TODO load from YAML and Load from DB
    #if None is report:
    #   load_yaml(file)

    if None is not report:
        ds=DataReport(json=report)
        json_data = jsonpickle.encode(ds, unpicklable=False)
        return json_data
    else:
        return "{msg:'Error'}"


@api.route('/api/data_report/fetch', methods=['POST'])
def fetch():
    """Return the results of a data request based on the configuration UID, options include search, pagination and sorting"""
    req_data= request.get_json()
    report=get_data_report_config_from_post_uid()
    if None is not report:
        ds        = DataReport(json=report)
        results   = ds.fetch(request=req_data,app=api)
        json_data = jsonpickle.encode(results, unpicklable=False)
        return json_data
        #json_string = json.dumps(results)
        #return json_string
    return "{msg:'Error'}"
