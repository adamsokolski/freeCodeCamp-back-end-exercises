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
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    person.favoriteFoods.push(foodToAdd);
    if (err) return done(err);
    person.save((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, person) => {
      if (err) return done(err);
      done(null, person);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, outcome) => {
    if (err) return done(err);
    done(null, outcome);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const query = Person.find({ favoriteFoods: foodToSearch })
    .sort("name")
    .limit(2)
    .select("name favoriteFoods");
  query.exec((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
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
