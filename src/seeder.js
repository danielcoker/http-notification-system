const fs = require('fs');
const setupMongoose = require('./helpers/setupMongoose');

const Topic = require('./models/Topic');

setupMongoose();

const topics = JSON.parse(
  fs.readFileSync(`${process.env.PWD}/_data/topics.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Topic.create(topics);

    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data.
const deleteData = async () => {
  try {
    await Topic.deleteMany();

    console.log('Data deleted');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
