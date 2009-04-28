#!/usr/bin/python

import random

num_pubtypes = 5
num_venues = 10
num_years = 15
num_authors = 20
num_papers = 100

print "id,title,author,year,venue,pubtype,url"
for papernum in range(num_papers):
  title = "This is the title of paper " + str(papernum)
  author = "first last" + str(random.randint(0, num_authors - 1))
  year = 1969 + random.randint(0, num_years - 1)
  pubtype = "pubtype" + str(random.randint(0, num_pubtypes - 1))
  venue = "venue location" + str(random.randint(0, num_venues - 1))
  url = "http://portal.acm.org/paperdb/location/of/paper" + str(papernum)
  print "%s,%s,%s,%s,%s,%s,%s" % (papernum, title, author, year, venue, \
        pubtype, url)
