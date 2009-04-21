#!/usr/bin/env python

import sqlite
import urllib2
import csv
import cgi
import simplejson

def urldecode(query):
   d = {}
   a = query.split('&')
   for s in a:
      if s.find('='):
         k,v = map(urllib2.unquote, s.split('='))
         try:
            d[k].append(v)
         except KeyError:
            d[k] = [v]
 
   return d

def myapp(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/plain')])
    args = cgi.parse_qs(environ['QUERY_STRING'])
    

    query = args['query'][0]
    uri = args['uri'][0]

    table = uri.split('/')[-1]
    table = table.split('.')[0]

    contents = urllib2.urlopen(uri)
    fields = ""
    for field in contents.readline().strip().split(','):
      fields += field
      fields += ","
    fields = fields.rstrip(',')
    
    con = sqlite.connect('mydatabase.db')
    cur = con.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' \
      AND name='%s';" % (table))
    if cur.fetchone() != None:
      cur.execute("DROP TABLE %s;" % (table))
    cur.execute("CREATE TABLE %s (%s);" % (table, fields))
    for line in contents:
      values = line.strip()
      values = "','".join([val.strip() for val in values.split(",")])
      values = "'" + values + "'"
      sql = "INSERT INTO %s (%s) VALUES (%s);" % (table, fields, values)
      cur.execute(sql)
    con.commit()
    cur.execute(query)

    results = []
    headings = [name[0] for name in cur.description]
    for result in cur.fetchall():
      results.append(dict(zip(headings, result)))
    results = { table : results }
    return simplejson.dumps(results)
      
if __name__ == '__main__':
    from fcgi import WSGIServer
    WSGIServer(myapp).run()

