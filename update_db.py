import time
import hashlib
import requests
from bs4 import BeautifulSoup
import gspread
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine.url import URL
from config import DATABASE

DeclarativeBase = declarative_base()


class numbers(DeclarativeBase):
    __tablename__ = 'numbers'
    id = Column('№', Integer, primary_key=True)
    number = Column('заказ №', Integer)
    cost_usd = Column('стоимость,$', Integer)
    date = Column('срок поставки', String)
    cost_rub = Column('стоимость в руб', Integer)
    hash = Column('hash summ', String)


class users(DeclarativeBase):
    __tablename__ = 'users'
    id = Column('UserID', Integer, primary_key=True)

    def __repr__(self):
        return f"{self.id}"


class initilaze_db:
    """Внутри класса методы для получения данных и записи в БД"""

    #инициализируем класс, создавая сессию
    def __init__(self):
        engine = create_engine(URL.create(**DATABASE))
        DeclarativeBase.metadata.create_all(engine)
        Session = sessionmaker(bind=engine)
        self.session = Session()
        self.hash_all = 0
        self.commit_db()

    #Тут получаем список из таблицы
    def get_sheet(self):
        gc = gspread.service_account(filename=f'credentials.json')
        sh = gc.open("Копия тестовое")
        worksheet = sh.get_worksheet(0)
        return [worksheet.col_values(i) for i in range(1, 5)]

    #парсим апи ЦБ, вытаскивам коттировку
    def get_rate(self):
        soup = BeautifulSoup(requests.get('https://www.cbr.ru/scripts/XML_daily.asp').text, 'xml')
        return int(float(soup.find("Valute", ID="R01235").Value.text.replace(",", ".")))

    #получам hash сумму строки из БД, если строка существует, иначе None
    def get_hash_row(self, i):
        i -= 1
        get_values = self.session.query(numbers).all()
        try:
            return get_values[i].hash
        except:
            return None

    #записываем данные в БД
    def commit_db(self):
        #создаем бесконечный цикл
        while True:
            #спим, чтобы на налегать на ограниченич гугл апи
            time.sleep(5)
            data = self.get_sheet()
            #создаем hash данных, чтобы не дергать БД лишний раз
            new_hash_all = hashlib.md5(bytearray(str(data).encode('utf-8'))).hexdigest()
            if new_hash_all != self.hash_all:
                self.hash_all = new_hash_all
                #пробегаем циклом по таблице, проверяя изменения через hash, вносим новые значения, обновляем
                for i in range(1, len(data[0])):
                    new_hash_row = str([data[k][i] for k in range(3)])
                    hash_row = self.get_hash_row(i)
                    if hash_row is None:
                        new_write = numbers(number=data[1][i],
                                            cost_usd=data[2][i], date=data[3][i], cost_rub=int(data[2][i]) * self.get_rate(),
                                            hash=new_hash_row)
                        self.session.add(new_write)
                    elif hash_row != new_hash_row:
                        self.session.query(numbers).filter(numbers.id == i).update(
                            {'number': data[1][i], 'cost_usd': data[2][i],
                             'date': data[3][i], 'cost_rub': data[2][i]})
            self.session.commit()




