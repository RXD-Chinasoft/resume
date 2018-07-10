
set client_encoding='utf8';

CREATE TABLE IF NOT EXISTS test (
    id serial NOT NULL, 
    email character varying(100)
) WITH(OIDS=FALSE);

CREATE TABLE IF NOT EXISTS test1 (
    id serial NOT NULL, 
    email character varying(100)
) WITH(OIDS=FALSE);

CREATE TABLE IF NOT EXISTS dictionary (
    id serial NOT NULL, 
    name character varying(100),
    type integer,
    descrpition character varying(100),
    extendedfield character varying(100),
    pkey integer
) WITH(OIDS=FALSE);

DELETE FROM dictionary;
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('负责人1', 1, '销售负责人', '', 1);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('负责人2', 1, '销售负责人', '', 2);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('交付人1', 2, '交付负责人', '', 3);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('交付人2', 2, '交付负责人', '', 4);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('交付人3', 2, '交付负责人', '', 5);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('紧急', 3, '需求类型', '', 6);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('一般', 3, '需求类型', '', 7);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('低级', 3, '需求类型', '', 8);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('正常', 5, '需求状态', '', 9);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('大量', 5, '需求状态', '', 10);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('少量', 5, '需求状态', '', 11);