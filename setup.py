from setuptools import setup


setup(
    name='datareports',
    version='0.1dev',
    packages=['datareports',],
    license='Creative Commons Attribution-Noncommercial-Share Alike license',
    long_description=open('README.txt').read(),
    #cmdclass={
     #   'npm_install': NPMInstall
    #},
    summary= 'Python backend for tablesorter',
    author= 'Charles Watkins',
    description= 'A python backend for tablesorter. Including custom search,filter,sort and multi search',
    platform= 'All',    
    install_requires=[
        'flask',
        'sqlalchemy',
        'pyyaml',
        'jsonpickle',
    ],
    

)



