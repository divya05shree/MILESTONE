const RSVP = require('../models/usermodel'); // Assuming RSVP is the Mongoose model


// 1. GET /priority - Retrieve RSVP list sorted by priority
exports.getPriorityRSVPs = async (req, res) => {
  try {
    const priorityOrder = [ 'organizers','VIP', 'speaker', 'attendee'];

    // Fetch all RSVPs and sort them based on the custom order
    const rsvps = await RSVP.find();

    // Sort manually using the priority order
    const sortedRSVPs = rsvps.sort((a, b) => {
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    });

    res.status(200).json(sortedRSVPs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sorted RSVPs', error });
  }
};


exports.getRSVPStats = async (req, res) => {
  try {
    const { sortBy } = req.query; // Retrieve the sortBy parameter from the request query

    // Default grouping field (can be 'preference' or 'priority')
    const groupByField = sortBy === 'priority' ? 'priority' : 'preference';

    // Fetch RSVP data and group by the specified field
    const stats = await RSVP.aggregate([
      {
        $group: {
          _id: `$${groupByField}`, // Group by dynamic field
          count: { $sum: 1 }, // Count entries in each group
        },
      },
    ]);

    // Define a tree-like structure for custom ordering
    const customOrder = {
      preference: ['vegetarian', 'non-vegetarian', 'vegan'],
      priority: ['VIP', 'speaker', 'attendee', 'general'],
    };

    // Determine the order array dynamically
    const order = customOrder[groupByField];

    // Sort the grouped data using a tree-based comparison
    stats.sort((a, b) => {
      const orderIndexA = order.indexOf(a._id);
      const orderIndexB = order.indexOf(b._id);
      return orderIndexA - orderIndexB;
    });
    // Respond with sorted data
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving RSVP stats', error });
  }
};


exports.getAll = async (req , res) =>{
  try {
    const rsvp = await RSVP.find()
    res.status(200).json(rsvp)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching RSVPs', error });
      } 

}
///Using tree concepts

class PriorityNode {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.rsvps = [];
  }

  addRSVP(rsvp) {
    this.rsvps.push(rsvp);
  }

  addChild(node) {
    this.children.push(node);
  }
  getRSVPs() {
    let allRSVPs = [...this.rsvps];
    for (const child of this.children) {
      allRSVPs = allRSVPs.concat(child.getRSVPs());
    }
    return allRSVPs;
  }
}
