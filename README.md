# Button Game
This is implementation of preliminary assignment to apply a summerjob at Vincit. Assignment is given in assignment.pdf.

### prerequisites
You will need couple of things to be up and running:
- Apache HTTP Server (tested with v.  2.4.18)
- PHP (tested with v. 7.0)
- MYSQL-server

### Installation
###### Source
```
> git clone https://github.com/ilesoft/Button-Game.git /path/to/button_game
```
###### server
Configure apache to serve Button Game by adding button_game.conf to /etc/apache2/sites-avaible/ and replace needed values. Exsample config file is in the repository. After that run
```
> a2ensite button_game
```
###### database
Create new database to use with application.
```
mysql> CREATE DATABASE IF NOT EXISTS `button` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
mysql> USE `button`;
mysql> CREATE TABLE `counter` (`value` int(255) NOT NULL DEFAULT '0') ENGINE=InnoDB DEFAULT CHARSET=utf8;
mysql> INSERT INTO `counter` (`value`) VALUES (0);
```
Make sure there is user which have privileges to `SELECT` and `UPDATE` to button database. Credentials of this user should be configured to button_game.conf.
###### SSL
Configure apache to use SSL encryption.  Make sure that loation of your certificate files and paths in button_game.conf match.

Restart your server to load changes.
```
> systemctl restart apache2
```
###### Check that your server works
Go to your domain with browser and start playing.
