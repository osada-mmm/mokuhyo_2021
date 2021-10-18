from sqlalchemy.sql.expression import false, true
from db import db, ma
from sqlalchemy.orm import relationship
from sqlalchemy import Column, BigInteger, String, Enum
from marshmallow import fields
from flask_login import UserMixin
import enum

class Car(UserMixin, db.Model):
    __tablename__ = 'carData'
    carId = Column(BigInteger, primary_key=True, nullable=False)
    maker = Column(String(50), nullable=False)
    model = Column(String(100), nullable=False)
    grade = Column(String(100), nullable=False)
    bodyColor = Column(String(100), nullable=False)
    price = Column(BigInteger, nullable=False)
    navi = Column(String(1),  nullable=False)
    kawa = Column(String(1),  nullable=False)
    sr = Column(String(1),  nullable=False)


    # 管理者かどうか確認
    def is_administrator(self):
        return True if self.authority == AuthType.administrator else False
    
    # 更新時、画面からの値を設定
    def set_update_attribute(self, params):
        # エラーメッセージのインスタンス変数を作成
        self.errors = {'fatal': False}
        # ユーザ画面からくる値をインスタンスに設定
        for key in list(params["car"].keys()):
            setattr(self, key, params["car"][key])
    
    # 入力チェック
    def valid(self):
        validate = True
        # 一旦ストレートに書きます。
        if not self.maker:
            self.errors['maker'] = 'メーカーは必須入力です。'
            validate = False
        if not self.model:
            self.errors['model'] = '車種名は必須入力です。'
            validate = False
        if not self.grade:
            self.errors['grade'] = 'グレードは必須入力です。'
            validate = False
        if not self.bodyColor:
            self.errors['bodyColor'] = 'ボディカラーは必須入力です。'
            validate = False
        if not self.price:
            self.errors['price'] = '価格は必須入力です。'
            validate = False

            
        return validate
    
    @classmethod
    def get_car_list(self, params):
        # ダサいがこうするしかなく。。。
        car = db.session.query(self)
        if params['maker']:
            car = car.filter(
                self.maker == params['maker']
            )
        
        if params['model']:
            car = car.filter(
                self.model.like("%{}%".format(params['model']))
            )

        if params['downprice']:
            car = car.filter(
                self.price > params['downprice']
            )        
            
        if params['upprice']:
            car = car.filter(
                self.price < params['upprice']
            )        

        if params['navi']:
            car = car.filter(
                self.navi < params['navi']
            )        

        if params['navi']:
            car = car.filter(
                self.navi < params['navi']
            )        

        if params['navi']:
            car = car.filter(
                self.navi < params['navi']
            )        


        # order by 
        car = car.order_by(self.carId)
        
        return car.all()    


class CarSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Car
