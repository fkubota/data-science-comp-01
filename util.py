from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import pathlib
import json
import numpy as np
from sqlalchemy import create_engine

PATH_RANKING_TABLE = './data/ranking_table.csv'
PATH_PARTICIPANTS_DATA = './data/participant.json'

# データベースの接続情報
connection_config = {
    'user': 'mgplwhsgzryfpg',
    'password': '44bc82c481ed89ceb96c893e89c0a38e3ca11c928715ad367c020b2e0dbed5bc',
    'host': 'ec2-34-193-232-231.compute-1.amazonaws.com',
    'port': '5432',
    'database': 'd2hl0a176aeg5e'
}

engine = create_engine('postgresql://{user}:{password}@{host}:{port}/{database}'.format(**connection_config))


def tell_me_score(text):
    submission = text2df(text)
    current_dir = str(pathlib.Path(__file__).resolve().parent)
    path_y_te = str(current_dir)+'/./data/y_test.csv'
    df_y_te = pd.read_csv(path_y_te)
    logic = all(df_y_te['series_id'].values == submission['series_id'].values)
    assert logic, 'series_id が一致しません'

    y_true = df_y_te['surface'].values
    y_pred = submission['surface'].values

    le = LabelEncoder()
    le.fit(y_true)

    y_true = le.transform(y_true)
    y_pred = le.transform(y_pred)

    return accuracy_score(y_true, y_pred)


def text2df(text):
    text = text.split('\n')
    arr = []
    for i in range(len(text)-1):
        te = text[i].split(',')
        arr.append(te)
    df = pd.DataFrame(arr[1:], columns=arr[0])
    df['series_id'] = df['series_id'].astype(int)
    return df


def update_participants_table(name, score):
    score = round(score, 3)
    with engine.connect() as connection:
        result = connection.execute(f"insert into submissions ('name', 'score') values('{name}', '{score}');")
        print(result)
    print(name, score)


def update_ranking_table():
    print('----- python-↓update_ranking_table')
    fp = open(PATH_PARTICIPANTS_DATA, 'r')
    j = json.load(fp)  # str読み込み
    j = json.loads(j)  # str ---> dict

    names = list(j.keys())
    best_scores = np.array([max(j[name]['scores']) for name in names])
    rank_idxs = np.argsort(-best_scores)  # 降順にするために'-'をつけた
    rank_names = []
    rank_scores = []
    rank_n_subs = []
    for i in range(len(names)):
        name = names[rank_idxs[i]]
        n_sub = len(j[name]['scores'])
        score = best_scores[rank_idxs[i]]
        rank_names.append(name)
        rank_scores.append(score)
        rank_n_subs.append(n_sub)
    df_rank = pd.DataFrame(np.arange(1, len(names)+1), columns=['#'])
    df_rank['Name'] = rank_names
    df_rank['Score'] = rank_scores
    df_rank['N_Submission'] = rank_n_subs
    df_rank.to_csv(PATH_RANKING_TABLE, index=False)


def get_ranking_table():
    df = pd.read_csv(PATH_RANKING_TABLE)
    json_str = ''
    for i in range(len(df)):
        a = df.iloc[i, :]
        s = f"{a['#']}, {a['Name']}, {a['Score']}, {a['N_Submission']} \n"
        json_str = f'{json_str} {s}'
    json_str = json_str[:-1]
    return json_str


def get_participants():
    df = pd.read_sql(sql='SELECT * FROM participants;', con=engine)
    names_list = df['name'].values
    print(names_list)
    names_str = ''
    for name in names_list:
        names_str = names_str + ',' + name
    names_str = names_str[1:]
    print(names_str)
    return names_str
