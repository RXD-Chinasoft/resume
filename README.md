####server
  -go get github.com/lib/pq
  -npm install pg ====== install postgre node , psql -h 192.168.15.100 -p 54321 postgres postgres
  -node index.js ======init db

####deploy
  ##install
  -$ sudo apt-get install python-pip python-dev build-essential 
  -$ sudo pip install --upgrade pip 
  -$ sudo pip install --upgrade virtualenv 

  -$ sudo pip install docker-compose
  ##check
  -docker-compose
  -docker-compose -v
  ##problems
  -ERROR: Couldn't connect to Docker daemon at http+docker://localhost - is it running?
    -solve:sudo service docker start,sudo docker-compose up