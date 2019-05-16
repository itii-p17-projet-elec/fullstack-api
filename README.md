
# SolarCharger App
Projet "Chargeur Solaire Connecté" - Partie "Fullstack" - ELEC ITII-4 P17

# Installation
It's important to install carefully all the server's part to avoid errors. Follow these steps in the right order.
> This installation guide is based on Ubuntu 18.04 LTS

## MySQL Database
In your favorite terminal:
```bash
sudo apt-get install mysql-server
```
But it will not configure at all, you will need to do it manually.
:warning: When the wizard will asking to setup the validate password plugin, say YES! :warning:
```bash
sudo mysql_secure_installation
> Would you like to setup VALIDATE PASSWORD plugin?
> y
> Please enter 0 = LOW, 1 = MEDIUM and  2 = STRONG:
> 0
....
Success.
All done!
```
Now, create the `solarcharger` user and database:
> Username: solarcharger
> Password: solarcharger

```bash
sudo mysql -u root -p
```
> Type the root password previously setup
```sql
mysql> GRANT ALL PRIVILEGES ON *.* TO 'solarcharger'@'localhost' IDENTIFIED BY 
'solarcharger';
mysql> exit;
```
And into the `solarcharger/` directory, simply type this:
```bash
sudo mysql -u solarcharger -p < database/schema.sql
```
> Type the solarcharger account password
 
## NodeJS and NPM
Go to the `api/` folder, and just type :
```bash
npm install
sudo npm i -g mysql
```

# Usage

## Run the API server
```bash
node api/server.js
```

## Use the API routes
See the [SolarCharger API](https://documenter.getpostman.com/view/7553528/S1M2RkwV) documentation to know how to use correctly the API.
