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
    current_dir = str(pathlib.Path(__file__).resolve().parent)
    path_y_te = str(current_dir)+'/./data/y_test.csv'
    df_y_te = pd.read_csv(path_y_te)
    df_y_te.to_sql('y_test', engine, if_exists='replace', index=False)
    # logic = all(df_y_te['series_id'].values == submission['series_id'].values)
    # if logic:
    #     return 'bad_submission'

    try:
        submission = text2df(text)
        y_true = df_y_te['surface'].values
        y_pred = submission['surface'].values

        le = LabelEncoder()
        le.fit(y_true)

        y_true = le.transform(y_true)
        y_pred = le.transform(y_pred)
        score = accuracy_score(y_true, y_pred)
        score = round(score, 3)
        return score

    except:
        return 'bad_submission'



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
    with engine.connect() as connection:
        connection.execute(f"insert into submissions (name, score) values('{name}', {score});")


def get_ranking_table():
    df = pd.read_sql(sql='SELECT * FROM submissions;', con=engine)

    # create ranking table from participants
    names = df['name'].unique()
    n_subs = []
    for name in names:
        n_sub = sum(df['name'] == name)
        n_subs.append(n_sub)
    max_scores = []
    for name in names:
        idx = df['name'] == name
        max_scores.append(df[idx]['score'].max())
    df_rank = pd.DataFrame()
    df_rank['Name'] = names
    df_rank['Score'] = max_scores
    df_rank['N_Submission'] = n_subs
    df_rank = df_rank.sort_values('Score', ascending=False).reset_index(drop=True)
    df_rank['#'] = np.arange(1, len(names)+1)

    # create json ranking table
    json_str = ''
    for i in range(len(df_rank)):
        a = df_rank.iloc[i, :]
        s = f"{a['#']}, {a['Name']}, {a['Score']}, {a['N_Submission']} \n"
        json_str = f'{json_str} {s}'
    json_str = json_str[:-1]
    return json_str


def get_participants():
    df = pd.read_sql(sql='SELECT * FROM participants;', con=engine)
    names_list = df['name'].values
    names_str = ''
    for name in names_list:
        names_str = names_str + ',' + name
    names_str = names_str[1:]
    return names_str
