# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html
import json


class LchItem(dict):
    # matchDay = scrapy.Field()
    # matchId = scrapy.Field()
    # leagueName = scrapy.Field()
    # homeTeam = scrapy.Field()
    # guestTeam = scrapy.Field()
    # homeScore = scrapy.Field()
    # guestScore = scrapy.Field()
    # startTime = scrapy.Field()
    #
    # homeFirstOdds_1 = scrapy.Field()
    # homeUpOdds_1 = scrapy.Field()
    # firstOdds_1 = scrapy.Field()
    # upOdds_1 = scrapy.Field()
    # guestFirstOdds_1 = scrapy.Field()
    # guestUpOdds_1 = scrapy.Field()
    #
    # homeWinFirstOdds = scrapy.Field()
    # homeWinUpOdds = scrapy.Field()
    # firsDrawnOdds = scrapy.Field()
    # upDrawnOdds = scrapy.Field()
    # guestWinFirstOdds = scrapy.Field()
    # guestWinUpOdds = scrapy.Field()
    #
    # homeFirstOdds_3 = scrapy.Field()
    # homeUpOdds_3 = scrapy.Field()
    # firstOdds_3 = scrapy.Field()
    # upOdds_3 = scrapy.Field()
    # guestFirstOdds_3 = scrapy.Field()
    # guestUpOdds_3 = scrapy.Field()

    def makeSQL(self):
        keys = ','.join(self.keys())
        keys = str(keys)

        values = ','.join(self.values())
        values = str(values)
        values = values.replace(',','\",\"')
        values = '\"'+values+'\"'

        sql = "insert into nowscore_history(%s) values(%s)"%(keys,values)
        return sql