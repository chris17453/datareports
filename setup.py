from setuptools import setup


setup(
    name='datareports',
    version='1.1.72',
    packages=['datareports',],
    include_package_data=True,
    url='https://github.com/chris17453/datareports/',
    license='Creative Commons Attribution-Noncommercial-Share Alike license',
    long_description=open('README.md').read(),
    summary= 'Python backend for tablesorter',
    author= 'Charles Watkins',
    author_email= 'charles@titandws.com',
    description= 'A python backend for jquery plugin datareports a wrapper for tablesorter. Including custom search,filter,sort and multi search',
    platform= 'All',    
    install_requires=[
        'flask',
        'sqlalchemy',
        'pyyaml',
        'pymysql',
        'jsonpickle',
    ],

)



