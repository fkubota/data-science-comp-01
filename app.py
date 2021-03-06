# app.py

from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import util

# api
app = Flask(__name__)
CORS(app)
api = Api(app)

# Require a parser to parse our POST request.
parser = reqparse.RequestParser()
parser.add_argument("arg_subData")
parser.add_argument("arg_selection_name")
parser.add_argument("test")


class GetScore(Resource):
    def post(self):
        # print('--- in api get_score---')
        args = parser.parse_args()
        sub_data = args['arg_subData']
        selection_name = args['arg_selection_name']
        score = util.tell_me_score(sub_data)
        is_bad_sub = score == 'bad_submission'
        is_blank_name = selection_name == ''
        if not is_bad_sub or is_blank_name:  # 名前が空でないかつ、submission データが適切であるとき実行
            util.update_participants_table(selection_name, score)
        # print('--- out api get_score ---')
        return {"score": score}


class GetRankingTable(Resource):
    def post(self):
        json_str = util.get_ranking_table()
        return {'ranking_table': json_str}


class GetParticipants(Resource):
    def post(self):
        participants = util.get_participants()
        return {'participants': participants}


class TestFunc(Resource):
    def post(self):
        args = parser.parse_args()
        test = args['test'] + '--- test ok'
        return {'test_return': test}


api.add_resource(GetScore, "/get_score")
api.add_resource(GetRankingTable, "/get_ranking_table")
api.add_resource(GetParticipants, "/get_participants")
api.add_resource(TestFunc, "/test_func")

if __name__ == "__main__":
    app.run('127.0.0.1', 5003, debug=True)
