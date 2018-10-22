CREATE DATABASE `datareports_test`;
USE `datareports_test`;


CREATE USER 'datareports_user' IDENTIFIED BY 'datareports_password';
GRANT ALL PRIVILEGES ON `datareports_test`.* TO 'datareports_user'@'%' IDENTIFIED BY 'datareports_password';
GRANT ALL PRIVILEGES ON *.*                  TO 'datareports_user'@'%' IDENTIFIED BY 'datareports_password';


FLUSH PRIVILEGES;

DROP TABLE `datareports_test`;

CREATE TABLE `datareports_test` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `first` varchar(255) default NULL,
  `last` varchar(255) default NULL,
  `item` TEXT default NULL,
  `loc` varchar(255),
  `cost` varchar(100) default NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Erasmus","Madden","lorem","Viverra Donec Foundation","84.91");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Octavius","Bates","cursus a,","Ridiculus Mus PC","27.79");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Gary","Byers","auctor quis,","Eu Lacus Quisque Industries","70.83");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Harper","Battle","magna et","Urna Company","43.52");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Orlando","Harmon","Donec","Urna Vivamus LLC","64.64");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Finn","Wilkinson","per conubia","Penatibus Et Magnis Inc.","89.33");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Logan","Burgess","a, scelerisque","Id Enim Corp.","83.47");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Judah","Rojas","vitae purus","Integer LLC","57.11");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Mark","Kent","ullamcorper,","Integer Eu Lacus Inc.","63.53");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Wyatt","Davidson","nec,","Consectetuer Mauris Id LLC","68.98");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Amery","Wilkins","molestie","Magna Associates","24.62");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Vincent","Mccullough","Vivamus sit","Nulla Facilisi Sed LLC","29.15");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Wing","Schwartz","Mauris magna.","Tellus Company","3.35");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Chandler","Mckenzie","auctor vitae,","Ipsum Curabitur Ltd","48.76");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Gil","Taylor","dolor egestas","Est Mollis Non Institute","1.00");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Lionel","Lloyd","facilisi.","Curabitur Associates","35.00");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Dalton","Shelton","eros. Nam","Eu Odio PC","36.17");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Francis","Reilly","vel","Mauris Quis Turpis Corporation","82.99");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Oren","Larsen","Phasellus","A Ultricies Adipiscing LLP","42.59");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Timothy","Hancock","Mauris","Dui Foundation","46.28");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Brock","Reilly","dolor","Vulputate Nisi Consulting","35.35");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Lee","Hooper","lectus","Porttitor Eros LLC","38.29");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Xavier","Warren","lectus","Donec Corp.","25.91");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Colorado","Simmons","ridiculus","Enim Condimentum Incorporated","41.55");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Norman","Justice","Fusce dolor","Nullam Ut Company","37.94");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Fuller","Schroeder","venenatis lacus.","Blandit Inc.","45.23");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Wylie","Ward","luctus","Leo Corp.","74.24");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Barrett","Valentine","magna. Sed","Lobortis Augue Corp.","29.34");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Kane","Maynard","lobortis quam","Cursus Et Ltd","46.05");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Emmanuel","Fowler","Morbi","Id Ante Nunc Associates","64.51");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Hoyt","Hunter","vulputate dui,","Aliquet Odio Company","23.17");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Kadeem","Ortiz","at sem","Est Industries","64.32");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Timothy","Levy","Quisque","Morbi Quis Urna LLP","4.41");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Stone","Rodriguez","euismod est","Aliquet Phasellus Institute","24.73");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Xander","Deleon","ipsum dolor","Sed Institute","63.69");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Kibo","Nixon","at","Sed Foundation","62.14");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Timon","Gregory","Fusce dolor","Aliquet LLP","2.50");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Dylan","Stephenson","libero","Nec Eleifend Non PC","49.92");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Cooper","West","ullamcorper magna.","Lobortis Quam A Industries","37.91");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Kermit","Clark","Quisque imperdiet,","Amet Risus Corp.","15.51");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Laith","Bass","Fusce","Inceptos Hymenaeos Consulting","49.24");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Calvin","Martin","Proin","Sed Facilisis Vitae Associates","52.54");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Channing","Bailey","nunc est,","Faucibus Inc.","28.67");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Jarrod","Harrell","nunc","Metus Aenean Incorporated","25.09");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Stone","Diaz","semper. Nam","Natoque LLP","22.19");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Kuame","Gibbs","interdum feugiat.","Morbi Tristique Consulting","37.58");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Elvis","Spencer","sit amet,","Ligula Consectetuer Associates","97.42");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Martin","Eaton","gravida sagittis.","In Felis Institute","67.26");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Lester","Nieves","blandit","Turpis Aliquam Consulting","8.19");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Nero","Morales","et, magna.","Proin Nisl Associates","66.51");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Kenneth","Lancaster","a neque.","Ac Institute","34.11");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Walter","Head","magna sed","Magna Et Foundation","49.27");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Chancellor","Oneill","Etiam","Non Company","96.74");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Sylvester","Frederick","ligula. Aenean","Malesuada Limited","99.39");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Edward","Patel","quis,","Ornare In Faucibus Company","45.49");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Paki","Cleveland","mauris","Lacus Etiam Inc.","77.23");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Grant","Barton","diam","Dui In Corp.","39.81");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Baker","Stone","ullamcorper. Duis","Quis Massa Mauris Corp.","37.58");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Hector","Gentry","Suspendisse","Lectus Inc.","24.24");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Quamar","Hansen","faucibus orci","Nec Malesuada LLC","68.96");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Ivor","Shepherd","nisi","Dolor Corp.","13.14");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Bert","Garner","mollis","Fermentum Risus At LLP","67.66");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Malcolm","Maddox","ante. Vivamus","Turpis Corp.","68.86");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Malachi","Harrington","a,","Lacinia Vitae Consulting","59.98");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Jerome","Cantu","molestie dapibus","Eu Corporation","15.49");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Plato","Powers","posuere","Phasellus Elit Industries","42.12");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Beck","Patrick","Curabitur vel","Aenean Euismod Industries","15.05");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Carlos","Stevens","sed,","Duis PC","18.96");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Xanthus","Whitley","Mauris","Arcu Vivamus Sit Inc.","65.34");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Macon","Melton","ullamcorper.","Aptent Taciti Sociosqu Associates","60.35");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Dean","Leon","lorem","Penatibus Corporation","62.47");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Ahmed","Peck","velit. Sed","Ut Lacus Nulla PC","13.64");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Trevor","Flynn","neque.","Eu LLC","53.10");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Jerome","Mejia","non","Suscipit Consulting","70.84");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Hoyt","Reid","convallis","Porttitor Interdum Sed Inc.","5.29");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Ulysses","Nash","montes,","Aliquam Foundation","27.05");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Colin","Drake","malesuada malesuada.","Rhoncus Donec Est Consulting","68.80");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Colby","Edwards","lacus vestibulum","Lectus Pede Et LLP","17.29");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Elmo","Stewart","dolor","Cursus Nunc Mauris Incorporated","84.42");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Thor","Wheeler","quam quis","Elit Foundation","69.23");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Merritt","Mcleod","vitae, orci.","Vel Faucibus Id Inc.","29.90");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Quinlan","Walter","amet","Elit Curabitur Sed PC","27.91");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Jared","Simon","Sed auctor","Pede Ac PC","66.39");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Baker","Oconnor","et,","Sociosqu LLP","97.80");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Russell","Day","enim","Nisl Elementum Purus Industries","77.05");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Mohammad","Tucker","nulla","Ac Company","45.17");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Howard","Hartman","mauris","Arcu Institute","55.71");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Vaughan","Jacobson","arcu et","Elit Foundation","25.89");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Jackson","Nelson","ullamcorper eu,","Integer Tincidunt Corporation","60.34");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Kareem","Sheppard","sed,","Eu Euismod Ac Foundation","55.45");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Nigel","Wilkinson","convallis convallis","Nisl Arcu Iaculis Institute","26.14");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Prescott","Dorsey","Nulla","Pharetra Nam Ac Institute","40.76");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Coby","Barnett","sit","Ultrices Corp.","74.29");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Jared","Pugh","Fusce","Nunc In At Corp.","47.81");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Samuel","Gray","ridiculus mus.","Nec Tempus Mauris Foundation","4.05");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Amery","Shelton","Cum","Ante Dictum Mi Industries","86.56");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Philip","Crosby","Donec","Mauris Vel Foundation","65.71");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Hilel","Gay","ullamcorper,","Quisque Nonummy Ipsum Ltd","58.06");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Laith","Figueroa","interdum.","Cras Corp.","22.28");
INSERT INTO `datareports_test` (`first`,`last`,`item`,`loc`,`cost`) VALUES ("Chancellor","Tyler","vitae mauris","Suscipit Limited","16.39");
