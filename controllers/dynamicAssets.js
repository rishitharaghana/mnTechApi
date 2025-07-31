const Collaboration = require("../models/collaborationModel");
const Review = require("../models/reviewModel");
const OurSkills = require("../models/ourSkillsModel");
const LatestThinking = require("../models/latestThinkingModel");
const LatestProject = require("../models/latestProjectModel");
const SaasApplication = require("../models/saasApplicationModel");
const Hero = require("../models/heroModel");
const Safeguard = require("../models/safeguardModel");
const upload = require("../utils/upload.config");
const Client = require("../models/clientModel");
const About = require("../models/aboutModel");
const Value = require("../models/valueModel");
const Team = require("../models/teamModel");
const mongoose = require("mongoose");

const logMulter = (req, res, next) => {
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logoUrl", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: err.message });
    }
    console.log("✅ Multer body:", req.body);
    console.log("✅ Multer files:", req.files);
    next();
  });
};

module.exports = {

  createSaasApplication: async (req, res) => {
    const { sectionTitle, heading, subtitle, services } = req.body;

    if (!sectionTitle || !heading || !subtitle || !Array.isArray(services)) {
      return res.status(400).json({
        error: "All fields (sectionTitle, heading, subtitle, services[]) are required.",
      });
    }

    try {
      const newSaasApp = new SaasApplication({ sectionTitle, heading, subtitle, services });
      await newSaasApp.save();
      return res.status(201).json({ message: "Saas Application added", data: newSaasApp });
    } catch (error) {
      console.error("Error saving Saas Application:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getSaasApplication: async (req, res) => {
    try {
      const data = await SaasApplication.find().sort({ _id: -1 });
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching Saas Applications:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateSaasApplication: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for update." });

    try {
      const updated = await SaasApplication.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Saas Application updated", data: updated });
    } catch (error) {
      console.error("Error updating Saas Application:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteSaasApplication: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for deletion." });

    try {
      await SaasApplication.findByIdAndDelete(id);
      return res.status(200).json({ message: "Saas Application deleted" });
    } catch (error) {
      console.error("Error deleting Saas Application:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

   createSafeguard: async (req, res) => {
    const { title, subtitle, cards } = req.body;

    if (!title || !subtitle || !cards || !Array.isArray(cards)) {
      return res.status(400).json({
        error: "Title, subtitle, and cards (array) are required.",
      });
    }

    try {
      const newSafeguard = new Safeguard({ title, subtitle, cards });
      await newSafeguard.save();
      return res.status(201).json({ message: "Safeguard added", data: newSafeguard });
    } catch (error) {
      console.error("Error saving Safeguard:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getSafeguard: async (req, res) => {
    try {
      const data = await Safeguard.find().sort({ _id: -1 });
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching Safeguard:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateSafeguard: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID is required for update." });
    }

    try {
      const updated = await Safeguard.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Safeguard updated", data: updated });
    } catch (error) {
      console.error("Error updating Safeguard:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteSafeguard: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID is required for deletion." });
    }

    try {
      await Safeguard.findByIdAndDelete(id);
      return res.status(200).json({ message: "Safeguard deleted" });
    } catch (error) {
      console.error("Error deleting Safeguard:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  createClient: async (req, res) => {
    const { title, clients } = req.body;

    if (!title || !clients || !Array.isArray(clients)) {
      return res
        .status(400)
        .json({ error: "Title and clients array are required." });
    }

    for (let client of clients) {
      if (!client.company_name || !client.image) {
        return res.status(400).json({
          error: "Each client must have a company_name and image.",
        });
      }
    }

    try {
      const newClient = new Client({ title, clients });
      await newClient.save();

      return res
        .status(201)
        .json({ message: "Client group created", data: newClient });
    } catch (error) {
      console.error("Error creating client group:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getClients: async (req, res) => {
    try {
      const allClients = await Client.find().sort({ _id: -1 });
      return res.status(200).json(allClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateClient: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID is required for update." });
    }

    try {
      const updated = await Client.findByIdAndUpdate(id, req.body, { new: true });

      if (!updated) {
        return res.status(404).json({ error: "Client group not found." });
      }

      return res.status(200).json({ message: "Client group updated", data: updated });
    } catch (error) {
      console.error("Error updating client group:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  
  deleteClient: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID is required for deletion." });
    }

    try {
      const deleted = await Client.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ error: "Client group not found." });
      }

      return res.status(200).json({ message: "Client group deleted" });
    } catch (error) {
      console.error("Error deleting client group:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

   createHero: async (req, res) => {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: "File upload error" });
      }

      const {
        title_lines,
        subheading,
        subhighlight,
        description,
        button_text,
        button_path,
        features,
        intro_heading,
        intro_highlight,
        paragraph_text,
      } = req.body;

      if (
        !title_lines ||
        !subheading ||
        !description ||
        !button_text ||
        !features
      ) {
        return res.status(400).json({
          error:
            "Missing required fields: title_lines, subheading, description, button_text, features.",
        });
      }

      try {
        const newHero = new Hero({
          title_lines,
          subheading,
          subhighlight,
          description,
          button_text,
          button_path,
          features,
          intro_heading,
          intro_highlight,
          paragraph_text,
        });

        await newHero.save();
        return res.status(201).json({ message: "Hero section created", data: newHero });
      } catch (error) {
        console.error("Error creating Hero:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  },

  getHero: async (req, res) => {
    try {
      const data = await Hero.find().sort({ _id: -1 });
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching Hero:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateHero: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for update." });

    try {
      const updatedHero = await Hero.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Hero section updated", data: updatedHero });
    } catch (error) {
      console.error("Error updating Hero:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteHero: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for deletion." });

    try {
      await Hero.findByIdAndDelete(id);
      return res.status(200).json({ message: "Hero section deleted" });
    } catch (error) {
      console.error("Error deleting Hero:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

   createTeamMember: async (req, res) => {
    logMulter(req, res, async () => {
      const {
        name,
        designation,
        linkedin_url,
        twitter_url,
        facebook_url,
        instagram_url,
      } = req.body;

      const image = req.files?.image?.[0]?.path;

      if (!name || !designation || !image) {
        return res.status(400).json({
          error: "Name, Designation, and Image are required.",
        });
      }

      try {
        const newMember = new Team({
          name,
          designation,
          image,
          linkedin_url,
          twitter_url,
          facebook_url,
          instagram_url,
        });

        await newMember.save();
        return res.status(201).json({ message: "Team member added", data: newMember });
      } catch (error) {
        console.error("Error saving team member:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  },

  getTeamMember: async (req, res) => {
    try {
      const data = await Team.find().sort({ _id: -1 });
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
getTeamMemberById: async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Team.findById(id);
    if (!member) return res.status(404).json({ error: "Team member not found" });
    return res.status(200).json(member);
  } catch (error) {
    console.error("Error fetching team member by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
},

  updateTeamMember: async (req, res) => {
    const { id } = req.params;

    logMulter(req, res, async () => {
      const {
        name,
        designation,
        linkedin_url,
        twitter_url,
        facebook_url,
        instagram_url,
      } = req.body;

      const updateData = {
        name,
        designation,
        linkedin_url,
        twitter_url,
        facebook_url,
        instagram_url,
      };

      if (req.files?.image?.[0]?.path) {
        updateData.image = req.files.image[0].path;
      }

      try {
        const updated = await Team.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json({ message: "Team member updated", data: updated });
      } catch (error) {
        console.error("Error updating team member:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  },

  deleteTeamMember: async (req, res) => {
    const { id } = req.params;

    try {
      const member = await Team.findById(id);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }

      if (member.image && fs.existsSync(member.image)) {
        fs.unlinkSync(member.image);
      }

      await Team.findByIdAndDelete(id);
      return res.status(200).json({ message: "Team member deleted" });
    } catch (error) {
      console.error("Error deleting team member:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  createCollaboration: async (req, res) => {
    const { sectionSubtitle, sectionTitle, features, buttons } = req.body;

    if (!sectionSubtitle || !sectionTitle || !features || !Array.isArray(features)) {
      return res.status(400).json({
        error: "sectionSubtitle, sectionTitle, and a valid features array are required.",
      });
    }

    try {
      const newDoc = new Collaboration({
        sectionSubtitle,
        sectionTitle,
        features,
        buttons: buttons || [],
      });

      await newDoc.save();
      return res.status(201).json({ message: "Collaboration section created", data: newDoc });
    } catch (error) {
      console.error("Error creating Collaboration:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getCollaboration: async (req, res) => {
    try {
      const data = await Collaboration.find().sort({ _id: -1 });
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching Collaborations:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateCollaboration: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for update." });

    try {
      const updated = await Collaboration.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ error: "Collaboration data not found." });
      }
      return res.status(200).json({ message: "Collaboration section updated", data: updated });
    } catch (error) {
      console.error("Error updating Collaboration:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteCollaboration: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for deletion." });

    try {
      const deleted = await Collaboration.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: "Collaboration data not found." });
      }
      return res.status(200).json({ message: "Collaboration section deleted" });
    } catch (error) {
      console.error("Error deleting Collaboration:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

 createLatestProject: async (req, res) => {
    logMulter(req, res, async () => {
      const { title, author, description } = req.body;
      const image = req.files?.image?.[0]?.path;

      if (!image || !title || !author || !description) {
        return res.status(400).json({
          error: "Image, Title, Author, and Description are required.",
        });
      }

      try {
        const newProject = new LatestProject({
          image,
          title,
          author,
          description,
        });
        await newProject.save();
        return res.status(201).json({ message: "Latest Project added", data: newProject });
      } catch (error) {
        console.error("Error saving Latest Project:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  },

  getLatestProject: async (req, res) => {
    try {
      const data = await LatestProject.find().sort({ _id: -1 });
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching Latest Projects:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateLatestProject: async (req, res) => {
    logMulter(req, res, async () => {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "ID is required for update." });

      const { title, author, description } = req.body;
      const image = req.files?.image?.[0]?.path;

      const updateData = {
        title,
        author,
        description,
      };

      if (image) {
        updateData.image = image;
      }

      try {
        const updated = await LatestProject.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) {
          return res.status(404).json({ error: "Latest Project not found" });
        }
        return res.status(200).json({ message: "Latest Project updated", data: updated });
      } catch (error) {
        console.error("Error updating Latest Project:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  },

  deleteLatestProject: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for deletion." });

    try {
      const deleted = await LatestProject.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: "Latest Project not found" });
      }
      return res.status(200).json({ message: "Latest Project deleted" });
    } catch (error) {
      console.error("Error deleting Latest Project:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },


   createOurSkills: async (req, res) => {
    const { title, highlight, description, skills, buttonText, buttonLink } = req.body;

    if (!title || !highlight || !description || !skills || !Array.isArray(skills)) {
      return res.status(400).json({
        error: "Title, highlight, description, and skills[] are required.",
      });
    }

    try {
      const newSkillSet = new OurSkills({
        title,
        highlight,
        description,
        skills,
        buttonText,
        buttonLink,
      });
      await newSkillSet.save();
      return res.status(201).json({ message: "Skill section added", data: newSkillSet });
    } catch (error) {
      console.error("Error saving OurSkills:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getOurSkills: async (req, res) => {
    try {
      const result = await OurSkills.findOne().sort({ _id: -1 });
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching OurSkills:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateOurSkills: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for update." });

    try {
      const updated = await OurSkills.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Skill section updated", data: updated });
    } catch (error) {
      console.error("Error updating OurSkills:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteOurSkills: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for deletion." });

    try {
      await OurSkills.findByIdAndDelete(id);
      return res.status(200).json({ message: "Skill section deleted" });
    } catch (error) {
      console.error("Error deleting OurSkills:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  addSkill: async (req, res) => {
    const { id } = req.params;
    const { name, percentage } = req.body;

    if (!id) return res.status(400).json({ error: "ID is required." });
    if (!name || percentage === undefined) {
      return res.status(400).json({ error: "Name and percentage are required." });
    }
    if (percentage < 0 || percentage > 100) {
      return res.status(400).json({ error: "Percentage must be between 0 and 100." });
    }

    try {
      const updated = await OurSkills.findByIdAndUpdate(
        id,
        { $push: { skills: { name, percentage } } },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: "OurSkills not found" });
      return res.status(200).json({ message: "Skill added", data: updated });
    } catch (error) {
      console.error("Error adding skill:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateSkill: async (req, res) => {
    const { id, skillId } = req.params;
    const { name, percentage } = req.body;

    if (!id || !skillId) return res.status(400).json({ error: "ID and skillId are required." });

    try {
      const doc = await OurSkills.findById(id);
      if (!doc) return res.status(404).json({ error: "OurSkills not found" });

      const skill = doc.skills.id(skillId);
      if (!skill) return res.status(404).json({ error: "Skill not found" });

      if (name) skill.name = name;
      if (percentage !== undefined) skill.percentage = percentage;

      await doc.save();
      return res.status(200).json({ message: "Skill updated", data: doc });
    } catch (error) {
      console.error("Error updating skill:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteSkill: async (req, res) => {
    const { id, skillId } = req.params;

    if (!id || !skillId) return res.status(400).json({ error: "ID and skillId are required." });

    try {
      const doc = await OurSkills.findById(id);
      if (!doc) return res.status(404).json({ error: "OurSkills not found" });

      const skill = doc.skills.id(skillId);
      if (!skill) return res.status(404).json({ error: "Skill not found" });

      doc.skills.pull({ _id: skillId });

      await doc.save();
      return res.status(200).json({ message: "Skill deleted", data: doc });
    } catch (error) {
      console.error("Error deleting skill:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },


  createLatestThinking: async (req, res) => {
    logMulter(req, res, async () => {
      const { title, description, order, author } = req.body;
      const image = req.files?.image?.[0]?.path;

      if (!title || !description || !image || !author) {
        return res.status(400).json({
          error: "Title, description, image, and author are required.",
        });
      }

      try {
        const existing = await LatestThinking.findOne({ title, description, image, author });
        if (existing) {
          return res.status(409).json({ error: "Duplicate entry already exists." });
        }

        const newEntry = new LatestThinking({
          title,
          description,
          image,
          order,
          author,
        });
        await newEntry.save();
        return res.status(201).json({ message: "Latest Thinking added", data: newEntry });
      } catch (error) {
        console.error("Error creating Latest Thinking:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  },

  getLatestThinking: async (req, res) => {
    try {
      const results = await LatestThinking.aggregate([
        {
          $group: {
            _id: { title: "$title", description: "$description", image: "$image", author: "$author" },
            doc: { $first: "$$ROOT" },
          },
        },
        {
          $replaceRoot: { newRoot: "$doc" },
        },
        {
          $sort: { order: 1 },
        },
      ]);
      return res.status(200).json(results);
    } catch (error) {
      console.error("Error fetching Latest Thinking:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateLatestThinking: async (req, res) => {
    logMulter(req, res, async () => {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "ID is required for update." });

      const { title, description, order, author } = req.body;
      const image = req.files?.image?.[0]?.path;

      const updateData = {
        title,
        description,
        order,
        author,
      };

      if (image) {
        updateData.image = image;
      }

      try {
        const updated = await LatestThinking.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json({ message: "Latest Thinking updated", data: updated });
      } catch (error) {
        console.error("Error updating Latest Thinking:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  },

  deleteLatestThinking: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for deletion." });

    try {
      await LatestThinking.findByIdAndDelete(id);
      return res.status(200).json({ message: "Latest Thinking deleted" });
    } catch (error) {
      console.error("Error deleting Latest Thinking:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

   createReview: async (req, res) => {
    const { rating, user_name, comments, company, avatar } = req.body;

    if (!rating || !user_name || !comments || !company || !avatar) {
      return res.status(400).json({
        error: "Rating, user name, comments, company, and avatar are required.",
      });
    }

    try {
      const newReview = new Review({
        rating,
        comments,
        user_name,
        company,
        avatar,
      });
      await newReview.save();
      return res.status(201).json({ message: "Review added", data: newReview });
    } catch (error) {
      console.error("Error saving Review:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getReview: async (req, res) => {
    const { id } = req.params;

    try {
      if (id) {
        const review = await Review.findById(id);
        if (!review) {
          return res.status(404).json({ error: "Review not found" });
        }
        return res.status(200).json(review);
      } else {
        const reviews = await Review.find().sort({ _id: -1 });
        return res.status(200).json(reviews);
      }
    } catch (error) {
      console.error("Error fetching Review(s):", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateReview: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for update." });

    try {
      const updated = await Review.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ error: "Review not found" });
      }
      return res.status(200).json({ message: "Review updated", data: updated });
    } catch (error) {
      console.error("Error updating Review:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteReview: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for deletion." });

    try {
      const deleted = await Review.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: "Review not found" });
      }
      return res.status(200).json({ message: "Review deleted" });
    } catch (error) {
      console.error("Error deleting Review:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },


   createAbout: async (req, res) => {
    logMulter(req, res, async () => {
      const { subtitle, title, highlight, paragraph1, paragraph2, buttonText, buttonLink } = req.body;
      const image = req.files?.image?.[0]?.path;

      if (!subtitle || !title || !highlight || !paragraph1 || !paragraph2 || !image) {
        return res.status(400).json({
          error: "Image, Subtitle, Title, Highlight, Paragraph1, and Paragraph2 are required.",
        });
      }

      try {
        const aboutSection = new About({
          subtitle,
          title,
          highlight,
          paragraph1,
          paragraph2,
          buttonText,
          buttonLink,
          image,
        });
        await aboutSection.save();
        return res.status(201).json({ message: "About section created", data: aboutSection });
      } catch (error) {
        console.error("Error creating About section:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  },

  getAbout: async (req, res) => {
    try {
      const about = await About.findOne().sort({ _id: -1 });
      return res.status(200).json(about);
    } catch (error) {
      console.error("Error fetching About section:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateAbout: async (req, res) => {
    logMulter(req, res, async () => {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "ID is required for update." });

      const { subtitle, title, highlight, paragraph1, paragraph2, buttonText, buttonLink } = req.body;
      const image = req.files?.image?.[0]?.path;

      try {
        const existing = await About.findById(id);
        if (!existing) return res.status(404).json({ error: "About not found." });

        const updateData = {
          subtitle,
          title,
          highlight,
          paragraph1,
          paragraph2,
          buttonText,
          buttonLink,
          image: image || existing.image,
        };

        const updated = await About.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json({ message: "About updated", data: updated });
      } catch (error) {
        console.error("Error updating About section:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  },

  deleteAbout: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for deletion." });

    try {
      const aboutEntry = await About.findById(id);
      if (!aboutEntry) {
        return res.status(404).json({ error: "About section not found." });
      }

      if (aboutEntry.image) {
        const filePath = path.join(__dirname, "..", "..", aboutEntry.image);
        fs.unlink(filePath, (err) => {
          if (err) console.warn("Image deletion failed:", err.message);
        });
      }

      await About.findByIdAndDelete(id);
      return res.status(200).json({ message: "About section deleted" });
    } catch (error) {
      console.error("Error deleting About section:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

    createValue: async (req, res) => {
    const { mainTitle, highlight, suffix, values } = req.body;

    if (!mainTitle || !highlight || !suffix || !Array.isArray(values)) {
      return res.status(400).json({
        error: "All fields (mainTitle, highlight, suffix, values[]) are required.",
      });
    }

    try {
      const newValue = new Value({ mainTitle, highlight, suffix, values });
      await newValue.save();
      return res.status(201).json({ message: "Value added successfully", data: newValue });
    } catch (error) {
      console.error("Error saving Value:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getValue: async (req, res) => {
    try {
      const value = await Value.findOne().sort({ _id: -1 });
      if (!value) return res.status(404).json({ error: "No values found" });
      return res.status(200).json(value);
    } catch (error) {
      console.error("Error fetching Value:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateValue: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for update." });

    try {
      const updatedValue = await Value.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Value updated successfully", data: updatedValue });
    } catch (error) {
      console.error("Error updating Value:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteValue: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required for deletion." });

    try {
      await Value.findByIdAndDelete(id);
      return res.status(200).json({ message: "Value deleted successfully" });
    } catch (error) {
      console.error("Error deleting Value:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  
};
