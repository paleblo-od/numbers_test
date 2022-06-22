from flask_restx import Api, Resource
import random
from flask import Flask
from flask_restx import Api
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
api = Api(app)

@api.route('/api/users/register')
class WidgetResource(Resource):
    def get(self):
        return {'counts': "343",
                'rub': '23940',
                'usd': '1244',
                'chart': {k:random.randint(1,23592) for k in ('y')},
                'feature': '1423'}




if __name__ == '__main__':
    app.run(debug=True)