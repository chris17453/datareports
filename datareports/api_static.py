from flask import Blueprint,render_template,send_from_directory

api = Blueprint('data_reports_api_static', __name__, template_folder='templates')


@api.route('/')
def index():
    return render_template('index.html')

#Non api related calls
@api.route('/node_modules/<path:path>')
def send_js(path):
    return send_from_directory('node_modules', path)
