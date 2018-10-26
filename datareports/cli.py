import sys
import argparse
import data_report
import db

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-c" ,"--config"    , action="store_true" , help="Configure a method")
    parser.add_argument("-q" ,"--query"     , help="Method Query")
    parser.add_argument("-n" ,"--name"      , help="Method Name")
    parser.add_argument("--host"      , help="DB Host")
    parser.add_argument("-db","--database"  , help="DB name")
    parser.add_argument("-u" ,"--user"      , help="DB user")
    parser.add_argument("-p" ,"--password"  , help="DB password")
    

    args = parser.parse_args()
#
    #print ("{} ==".format(args.config))
    #print ("{} ==".format(args.query))
    #print ("{} ==".format(args.name))

    if True == args.config:
        dbc=db.connect(args.host,args.database,args.user,args.password)
        dr=data_report.DataReport()
        res=dr.pre_configure(dbc,query=args.query,name=args.name)
        print(res)


if __name__ == '__main__':
    main()
