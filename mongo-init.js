db.createUser({
  user: "mongouser",
  pwd: "mongopass",
  roles: [{ role: "root", db: "admin" }],
});

const configuration = {
  _id: "rs0",
  members: [{ _id: 0, host: "mongo_db:27017" }],
};

rs.initiate(configuration);

/*
try {
  rs.status();
} catch (e) {
  if (e.errmsg === 'not running with --replSet') {
    print('MongoDB not running with --replSet, this should not happen if docker-compose is configured correctly.');
  } else if (e.errmsg === 'no replset config has been received') {
    print('Initiating replica set "rs0"');
    const config = {
      _id: "rs0",
      members: [{ _id: 0, host: "mongo_db:27017" }]
    };
    rs.initiate(config);
  } else {
    print('Error checking replica set status:');
    printjson(e);
  }
}

// Create the user if it doesn't exist
db = db.getSiblingDB('admin');
const userExists = db.system.users.findOne({ user: "mongouser" });

if (!userExists) {
  print('Creating user "mongouser" with root role');
  db.createUser({
    user: "mongouser",
    pwd: "mongopass",
    roles: [ { role: "root", db: "admin" } ]
  });
} else {
  print('User "mongouser" already exists');
}
  */
