const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a person (Define a Schema))
let personSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "Abdallah" },
  age: { type: Number, default: 5 },
  favoriteFoods: { type: [String], default: ["Soupe Kandia"] },
});

// Create a Model
const Person = mogoose.model("Person", personSchema);

// Create and Save a Record of a Model
let person = new Person({
  name: "Oumou",
  age: 30,
  favoriteFoods: ["Soupe Kandia", "Mafe", "Mbakhal Saloum"],
});
person.save((err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

// Create Many Records with model.create()
const arrayOfPeople = [
  {
    name: "Lamine",
    age: 30,
    favoriteFoods: ["Soupe Kandia", "Mbakhal Saloum"],
  },
  { name: "Seynabou", age: 40, favoriteFoods: ["Thiebou Yap", "Yassa Guinar"] },
  { name: "Ismaila", age: 34, favoriteFoods: ["Etodiay", "Thiebou Dieun"] },
  { name: "Fatima", age: 28, favoriteFoods: ["Sauce Vermicelle "] },
];
Person.create(arrayOfPeople);

// Use model.find() to Search Your Database
const findPerson = (persName) => {
  Person.find({ name: persName }, (err, pers) => {
    if (err) return console.error(err);
    console.log(pers);
  });
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, onePers) => {
    if (err) return console.error(err);
    console.log(onePers);
  });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId) => {
  Person.findById({ _id: personId }, (err, persFoundById) => {
    if (err) return console.error(err);
    console.log(persFoundById);
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const updatePerson = (personId) => {
  Person.find({ _id: personId }, (err, pers) => {
    if (err) return console.error(err);
    pers.favoriteFoods.push("hamburger");
    pers.save((err, updatePers) => {
      if (err) return console.error(err);
      console.log(updatePers);
    });
  });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const docUpdate = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, persDocUpdate) => {
      if (err) return console.error(err);
      console.log(persDocUpdate);
    }
  );
};

// Delete One Document Using model.findByIdAndRemove
const deletePerson = (personId) => {
  Person.findByIdAndRemove({ _id: personId }, (err, persDelete) => {
    if (err) return console.error(err);
    console.log(persDelete);
  });
};

// MongoDB and Mongoose - Delete Many Documents with model.remove()
const removePerson = () => {
  Person.remove({ name: "Mary" }, (err, persRemove) => {
    if (err) return console.error(err);
    console.log(persRemove);
  });
};

// Chain Search Query Helpers to Narrow Search Results
const searchPersons = () => {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 }) // Sort by name
    .limit(2) // Limit to 2 documents
    .select({ age: 0 }) // Hide age
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log(data);
    });
};

// Exporting the Model
module.exports = Person;
