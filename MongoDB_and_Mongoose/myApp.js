require("dotenv").config();
const mongoose = require("mongoose");
const URI = process.env["MONGO_URI"];
const { Schema } = mongoose;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: { type: String, default: "Name", required: true },
  age: { type: Number, default: 18, required: true },
  favoriteFoods: {
    type: [String],
    default: ["Bananas", "Apples", "Oranges"],
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const temp = new Person({
    name: "Adam",
    age: 20,
    favoriteFoods: ["Wraps", "Kebab", "Corn"],
  });

  temp.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  { name: "John", age: 25, favoriteFoods: ["Fries", "Nuggets", "Eggs"] },
  { name: "Patric", age: 30, favoriteFoods: ["Fish", "Rice"] },
  {
    name: "Felix",
    age: 26,
    favoriteFoods: ["Pizza", "Roasted chicken", "Hamburger"],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
