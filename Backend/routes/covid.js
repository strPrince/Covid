const express = require('express');
const router = express.Router(); // Corrected from routerr to router
const Covid = require('../Models/Covid');

// API for getting all covid data
router.get('/coviddata', async (req, res) => {
  try {
    const covidData = await Covid.aggregate([
      {
        $group: {
          _id: "$state", // Group by state
          totalCases: { $sum: "$cases" }, // Sum up cases
          totalDeaths: { $sum: "$deaths" } // Sum up deaths
        }
      },
      {
        $project: {
          _id: 0, // Exclude the default `_id` field
          state: "$_id", // Rename `_id` to `state`
          totalCases: 1,
          totalDeaths: 1
        }
      }
    ]);

    res.json(covidData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//API  for perticular state data 
router.get('/state/:stateName', async (req, res) => {
  try {
    const stateData = await Covid.find({ state: req.params.stateName });
    if (!stateData) {
      return res.status(404).json({ message: 'State not found' });
    }
    res.json(stateData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//API for getting High cse and death 
router.get('/high-cases-deaths', async (req, res) => {
  const { casesThreshold, deathsThreshold } = req.query; // Ensure correct parameter names

  if (!casesThreshold || !deathsThreshold) {
    return res.status(400).json({ message: 'Please provide both casesThreshold and deathsThreshold.' });
  }

  try {
    const filteredData = await Covid.aggregate([
      {
        $match: {
          cases: { $gt: parseInt(casesThreshold) }, // Filter where cases exceed the threshold
          deaths: { $gt: parseInt(deathsThreshold) }, // Filter where deaths exceed the threshold
        },
      },
      {
        $group: {
          _id: "$state", // Group by state
          totalCases: { $sum: "$cases" }, // Sum up cases
          totalDeaths: { $sum: "$deaths" }, // Sum up deaths
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default `_id` field
          state: "$_id", // Rename `_id` to `state`
          totalCases: 1,
          totalDeaths: 1,
        },
      },
    ]);

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API for deleting perticuler record 
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedRecord = await Covid.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API for updateing Record 
router.put('/update/:id', async (req, res) => {
  try {
    const updatedRecord = await Covid.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//API for adding covid data 
router.post('/add', async (req, res) => {
  const { state, cases, deaths, date } = req.body;
  const newRecord = new Covid({ state, cases, deaths, date });
  try {
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;