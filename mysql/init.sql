CREATE TABLE iot_device (
    ID INT NOT NULL,
    name VARCHAR(20) NOT NULL,
    value INT NOT NULL,
    type VARCHAR(50),
    alert INT NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE iot_message (
    ID INT NOT NULL,
    info VARCHAR(100),
    lng DOUBLE NOT NULL,
    lat DOUBLE NOT NULL,
    timestamp BIGINT NOT NULL,
    PRIMARY KEY (ID, timestamp),
    FOREIGN KEY (ID) REFERENCES iot_device(ID)
);

CREATE TABLE user (
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL UNIQUE,
    PRIMARY KEY (username)
);

-- 插入初始数据
INSERT INTO sys.iot_device VALUES ('1', 'test1', 0, 'default', 0);
INSERT INTO sys.iot_device VALUES ('2', 'test2', 0, 'default', 0);
INSERT INTO sys.iot_device VALUES ('3', 'test3', 0, 'default', 0);
INSERT INTO sys.iot_device VALUES ('4', 'test4', 0, 'default', 0);
INSERT INTO sys.iot_device VALUES ('5', 'test5', 0, 'default', 0);
