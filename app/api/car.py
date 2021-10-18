""" login users API """
from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required
from db import db
from ..models.car import Car, CarSchema

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
car_bp = Blueprint(
    "car_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@car_bp.route("/car", methods=["GET"])
@car_bp.route("/car/", methods=["GET"])
@car_bp.route("/car/<path:path>", methods=["GET"])


@car_bp.route("/api/car/search", methods=["GET"])
@login_required
def do_search():
    """
        検索処理 
    """
    params = request.values
    print(params);
    car = Car.get_car_list(params)
    
    # 検索結果がない場合
    #if len(car) == 0:
    #    return jsonify({}), 404
    
    # JSONに変換
    car_schema = CarSchema()
    return jsonify({'car': car_schema.dump(car, many=True)}), 200


@car_bp.route("/api/car/createConfirm", methods=["post"])
@login_required
def do_createConfirm():
    params = request.get_json()
    print(params);
    # 登録済か確認
    # user = db.session.query(User).filter_by(login_id=params["user"]["login_id"]).all();
    # if user:
    #     return jsonify({'login_id': '登録済のユーザーです。'}), 400
    
    # DB定義を取得（処理はmodelsの方に書いている）
    carCreate = Car()

    # 取得したパラメータをセット
    carCreate.set_update_attribute(params)

    # バリデート
    if not carCreate.valid():
    
        return jsonify(carCreate.errors), 400
    


    return jsonify({}), 200

@car_bp.route("/api/car/create", methods=["post"])
@login_required
def do_create():
    params = request.get_json()
    print(params);
    # DB定義を取得（処理はmodelsの方に書いている）
    carCreate = Car()

    # 取得したパラメータをセット
    carCreate.set_update_attribute(params)


    # 値は設定されているのでコミット
    db.session.add(carCreate)
    db.session.commit()
    
    return jsonify({}), 200
