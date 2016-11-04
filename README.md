# Simple Employee Contact Form
Simple Employee Contact Form

## Installation

###I. Install mongodb

##### MacOSX

> http://www.mkyong.com/mongodb/how-to-install-mongodb-on-mac-os-x/

##### Windows

> https://blog.ajduke.in/2013/04/10/install-setup-and-start-mongodb-on-windows/

##### Linux

* Ubuntu

>https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04

* Centos

  * Centos 6
  
    > https://www.liquidweb.com/kb/how-to-install-mongodb-on-centos-6/
    
  * Centos 7
  
    > https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-centos-7

* Arch Linux

> https://wiki.archlinux.org/index.php/MongoDB

* Other Linux

> https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-linux/

###II. Install / Update nodejs / npm

##### MacOSX

 > http://blog.teamtreehouse.com/install-node-js-npm-mac

##### Windows

> http://blog.teamtreehouse.com/install-node-js-npm-windows

##### Linux

* Ubuntu

> https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04

* Centos

  * Centos 6
  
    > https://www.digitalocean.com/community/tutorials/how-to-install-and-run-a-node-js-app-on-centos-6-4-64bit
    
  * Centos 7
  
    > https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server
    
* Other Linux

> http://blog.teamtreehouse.com/install-node-js-npm-linux

## How to test

* Start mongodb server

* Config smtp server

  * Open file `app.js` and change this

```
auth : {
            user: "<account_smtp>",
            pass: "<password>"
    }
```

* Locate to nodejs directory and run

```
node app
```

* Open browser

```
http://127.0.0.1:3000
```
