const ReachUs = require("../models/reachUsModel");

module.exports = {
  createReachUS: async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      role,
      ProductDesign,
      message,
      ProjectBudget,
    } = req.body;

    if (!firstName || !lastName || !phone || !company || !ProductDesign || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const newReach = new ReachUs({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        company,
        role,
        product_design: ProductDesign,
        product_description: message,
        project_budget: ProjectBudget,
      });

      await newReach.save();
      res.status(201).json({ message: "Reach Us form submitted successfully" });
    } catch (error) {
      console.error("Error saving ReachUs:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  
 getAllReachUS: async (req, res) => {
    try {
      const reachData = await ReachUs.find().sort({ createdAt: -1 });
      res.status(200).json(reachData);
    } catch (error) {
      console.error("Error fetching ReachUs data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
