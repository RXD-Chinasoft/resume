
set client_encoding='utf8';

CREATE TABLE IF NOT EXISTS requirement (
    id serial NOT NULL,
    requirement character varying(100),
    area character varying(50),
    count integer,
    saler integer,
    dm integer,
    priority integer,
    english integer,
    rqtype integer,
    rqstatus integer,
    client character varying(100),
    salaryscope character varying(100),
    challengetarget character varying(100),
    resumetarget character varying(100),
    turn integer,
    teamrange character varying(100),
    candidate character varying(100),
    contact character varying(100),
    interviewaddr character varying(200),
    projectaddr character varying(200),
    createtime character varying(50),
    descrpition text[],
    matrix text[],
    clientrequirment character varying(100),
    department integer
) WITH(OIDS=FALSE);

CREATE TABLE IF NOT EXISTS candidate (
    id serial NOT NULL, 
    requirement integer,
    candidate character varying(100),
    hiringmanager integer,
    saler integer,
    dm integer,
    status integer,
    risk integer,
    descrpition character varying(500),
    file character varying(100),
    filename character varying(100),
    filesize integer,
    filetype character varying(100),
    createtime character varying(50),
    message character varying(500)
) WITH(OIDS=FALSE);

CREATE TABLE IF NOT EXISTS dictionary (
    id serial NOT NULL, 
    name character varying(100),
    type integer,
    descrpition character varying(100),
    extendedfield character varying(100),
    pkey integer
) WITH(OIDS=FALSE);

CREATE TABLE IF NOT EXISTS history (
    id serial NOT NULL, 
    requirement integer,
    operations text[]
) WITH(OIDS=FALSE);

DELETE FROM dictionary;
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('负责人1', 101, '销售负责人', '', 101);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('负责人2', 101, '销售负责人', '', 102);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('交付人1', 102, '交付负责人', '', 103);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('交付人2', 102, '交付负责人', '', 104);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('交付人3', 102, '交付负责人', '', 105);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('招聘人1', 103, '招聘负责人', '', 106);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('招聘人2', 103, '招聘负责人', '', 107);

INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('读写熟练', 1, '英语', '', 1);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('一般', 1, '英语', '', 2);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('流利沟通', 1, '英语', '', 3);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('紧急', 2, '需求类型', '', 4);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('一般', 2, '需求类型', '', 5);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('低级', 2, '需求类型', '', 6);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('正常', 3, '需求状态', '', 7);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('大量', 3, '需求状态', '', 8);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('少量', 3, '需求状态', '', 9);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('为筛选', 4, '当前状态', '', 10);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('面试中', 4, '当前状态', '', 11);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('录用', 4, '当前状态', '', 12);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('弃用', 4, '当前状态', '', 13);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('正常', 5, '风险等级', '', 14);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('大量', 5, '风险等级', '', 15);
INSERT INTO dictionary (name, type, descrpition, extendedfield, pkey) VALUES ('少量', 5, '风险等级', '', 16);
