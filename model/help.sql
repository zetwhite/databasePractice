create databASe market; 
use market; 

create table Customer(
    name varchar(30) not null primary key, 
    phone varchar(20) , 
    address varchar(30) , 
    gender char(1) not null
); 

create table Product(
    name varchar(30) not null, 
    productid varchar(10) primary key, 
    suppliername varchar(30) not null 
); 

create table Transition(
    transitionid varchar(30) primary key, 
    productid varchar(10) not null, 
    price real not null, 
    date date not null, 
    customername varchar(30) not null
); 

/*남자보다 여자가 많이 산 상품의 이름*/
SELECT *
FROM (
    SELECT Product.name AS name,  Product.productid AS id,  SUM(gender = 'm') AS m, SUM(gender = 'f') AS f, count(*) AS c
    FROM Customer, Transition, Product
    WHERE Transition.customername = Customer.name AND Transition.productid = Product.productid
    GROUP BY Product.productid ) Favor
WHERE f > m;  


SELECT Product.name AS name,  Product.productid AS id,  SUM(gender = 'm') AS m, SUM(gender = 'f') AS f, count(*) AS c
FROM Customer, Transition, Product
WHERE Transition.customername = Customer.name AND Transition.productid = Product.productid
GROUP BY Product.productid
HAVING SUM(gender='f') > SUM(gender='m') 



/*주어진 날 이전에 가장 많은 거래가 이루어진 k 가지 상품*/

SELECT Product.name, Freq.*
FROM Product,  
    (
        SELECT Product.productid AS pid, SUM(Transition.price) AS cnt
        FROM Transition, Product
        WHERE Transition.productid = Product.productid and Transition.date < '2017-10-10'
        GROUP BY Product.productid
        ORDER BY cnt DESC
        LIMIT 10 
    ) Freq
WHERE Product.productid = Freq.pid; 




/*하나의 suplier에서 m번 이상의 제품을 산 고객의 이름*/
SELECT Customer.name, Product.suppliername, COUNT(*)
FROM Customer, Transition, Product 
WHERE Transition.customername = Customer.name AND Transition.productid = Product.productid 
GROUP BY Customer.name, Product.suppliername
HAVING COUNT(*) >= 1; 

SELECT DISTINCT Customer.name
FROM Customer, Transition, Product 
WHERE Transition.customername = Customer.name AND Transition.productid = Product.productid 
GROUP BY Customer.name, Product.suppliername
HAVING COUNT(*) >= 1; 