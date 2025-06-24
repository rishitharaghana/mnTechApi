const Collaboration = require("../models/collaborationModel");
const Review = require("../models/reviewModel");
const OurSkills = require("../models/ourSkillsModel");
const LatestThinking = require("../models/latestThinkingModel");
const LatestProject = require("../models/latestProjectModel");
const SaasApplication = require("../models/saasApplicationModel");
const Service = require("../models/serviceModel");
const Hero = require("../models/heroModel");
const Safeguard = require("../models/safeguardModel");
const upload = require("../utils/upload.config");
const ServiceFooter = require("../models/serviceFooterModel");
const Footer = require("../models/footerModel");
const ServiceSection = require("../models/serviceSectionModel");
const Navigation = require("../models/navigationModel");
const Client = require("../models/clientModel");
const About = require("../models/aboutModel");
const Value = require("../models/valueModel");
const Team = require("../models/teamModel");
const mongoose = require('mongoose');

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
  navigation: async (req, res) => {
    const id = req.params.id;

    try {
      if (req.method === "GET") {
        const items = await Navigation.find().sort({ _id: -1 });
        return res.status(200).json(items);
      } else if (req.method === "POST") {
        const { name, path, submenu } = req.body;

        if (!name) {
          return res.status(400).json({ error: "Name is required." });
        }

        const newItem = new Navigation({
          name,
          path,
          submenu: Array.isArray(submenu) ? submenu : [],
        });

        await newItem.save();
        return res
          .status(201)
          .json({ message: "Nav item added", data: newItem });
      } else if (req.method === "PUT") {
        if (!id) return res.status(400).json({ error: "ID is required." });

        const updated = await Navigation.findByIdAndUpdate(id, req.body, {
          new: true,
        });

        if (!updated) return res.status(404).json({ error: "Not found." });

        return res
          .status(200)
          .json({ message: "Nav item updated", data: updated });
      } else if (req.method === "DELETE") {
        if (!id) return res.status(400).json({ error: "ID is required." });

        const deleted = await Navigation.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: "Not found." });

        return res.status(200).json({ message: "Nav item deleted" });
      } else {
        return res.status(405).json({ error: "Method not allowed" });
      }
    } catch (err) {
      console.error("Navigation error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  saasApplication: async (req, res) => {
    const id = req.params.id;

    if (req.method === "POST") {
      const { sectionTitle, heading, subtitle, services } = req.body;

      if (!sectionTitle || !heading || !subtitle || !Array.isArray(services)) {
        return res.status(400).json({
          error:
            "All fields (sectionTitle, heading, subtitle, services[]) are required.",
        });
      }

      try {
        const newSaasApp = new SaasApplication({
          sectionTitle,
          heading,
          subtitle,
          services,
        });

        await newSaasApp.save();
        return res
          .status(201)
          .json({ message: "Saas Application added", data: newSaasApp });
      } catch (error) {
        console.error("Error saving Saas Application:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "GET") {
      try {
        const data = await SaasApplication.find().sort({ _id: -1 });
        return res.status(200).json(data);
      } catch (error) {
        console.error("Error fetching Saas Applications:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "PUT") {
      if (!id)
        return res.status(400).json({ error: "ID is required for update." });

      try {
        const updated = await SaasApplication.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res
          .status(200)
          .json({ message: "Saas Application updated", data: updated });
      } catch (error) {
        console.error("Error updating Saas Application:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "DELETE") {
      if (!id)
        return res.status(400).json({ error: "ID is required for deletion." });

      try {
        await SaasApplication.findByIdAndDelete(id);
        return res.status(200).json({ message: "Saas Application deleted" });
      } catch (error) {
        console.error("Error deleting Saas Application:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  },
  safeguard: async (req, res) => {
    const id = req.params.id;

    if (req.method === "POST") {
      const { title, subtitle, cards } = req.body;

      if (!title || !subtitle || !cards || !Array.isArray(cards)) {
        return res.status(400).json({
          error: "Title, subtitle, and cards (array) are required.",
        });
      }

      try {
        const newSafeguard = new Safeguard({ title, subtitle, cards });
        await newSafeguard.save();
        return res
          .status(201)
          .json({ message: "Safeguard added", data: newSafeguard });
      } catch (error) {
        console.error("Error saving Safeguard:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "GET") {
      try {
        const data = await Safeguard.find().sort({ _id: -1 });
        return res.status(200).json(data);
      } catch (error) {
        console.error("Error fetching Safeguard:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "PUT") {
      if (!id)
        return res.status(400).json({ error: "ID is required for update." });

      try {
        const updated = await Safeguard.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res
          .status(200)
          .json({ message: "Safeguard updated", data: updated });
      } catch (error) {
        console.error("Error updating Safeguard:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "DELETE") {
      if (!id)
        return res.status(400).json({ error: "ID is required for deletion." });

      try {
        await Safeguard.findByIdAndDelete(id);
        return res.status(200).json({ message: "Safeguard deleted" });
      } catch (error) {
        console.error("Error deleting Safeguard:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  },
  client: async (req, res) => {
    const id = req.params.id;

    try {
      if (req.method === "GET") {
        const allClients = await Client.find().sort({ _id: -1 });
        return res.status(200).json(allClients);
      } else if (req.method === "POST") {
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

        const newClient = new Client({ title, clients });
        await newClient.save();

        return res
          .status(201)
          .json({ message: "Client group created", data: newClient });
      } else if (req.method === "PUT") {
        if (!id) {
          return res.status(400).json({ error: "ID is required for update." });
        }

        const updated = await Client.findByIdAndUpdate(id, req.body, {
          new: true,
        });

        if (!updated) {
          return res.status(404).json({ error: "Client group not found." });
        }

        return res
          .status(200)
          .json({ message: "Client group updated", data: updated });
      } else if (req.method === "DELETE") {
        if (!id) {
          return res
            .status(400)
            .json({ error: "ID is required for deletion." });
        }

        const deleted = await Client.findByIdAndDelete(id);

        if (!deleted) {
          return res.status(404).json({ error: "Client group not found." });
        }

        return res.status(200).json({ message: "Client group deleted" });
      } else {
        return res.status(405).json({ error: "Method not allowed" });
      }
    } catch (error) {
      console.error("Client API error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  hero: async (req, res) => {
    const id = req.params.id;

    if (req.method === "POST") {
      return logMulter(req, res, async () => {
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

        let images = [];
        if (Array.isArray(req.files)) {
          images = req.files.map((file) => file.path);
        } else if (req.files && typeof req.files === "object") {
          images = Object.values(req.files)
            .flat()
            .map((file) => file.path);
        }

        if (!title_lines || !subheading || !description || !button_text) {
          return res.status(400).json({
            error:
              "All fields (title_lines, subheading,  description, button_text) are required.",
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
            image: images,
            intro_heading,
            intro_highlight,
            paragraph_text,
            features: features ? JSON.parse(features) : [],
          });

          await newHero.save();
          return res
            .status(201)
            .json({ message: "Hero section created", data: newHero });
        } catch (error) {
          console.error("Error saving Hero section:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
    } else if (req.method === "GET") {
      try {
        const hero = await Hero.find().sort({ _id: -1 });
        return res.status(200).json(hero);
      } catch (error) {
        console.error("Error fetching Hero section:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "PUT") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for update." });
      }

      return logMulter(req, res, async () => {
        console.log("Put-handler req.files:", req.files);
        console.log("Put-handler req.body:", req.body);

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

        let images = [];
        if (Array.isArray(req.files)) {
          images = req.files.map((file) => file.path);
        } else if (req.files && typeof req.files === "object") {
          images = Object.values(req.files)
            .flat()
            .map((file) => file.path);
        }

        let parsedFeatures = [];
        try {
          parsedFeatures = features ? JSON.parse(features) : [];
        } catch (err) {
          return res
            .status(400)
            .json({ error: "Invalid JSON format in 'features'" });
        }

        const updateData = {
          title_lines,
          subheading,
          subhighlight,
          description,
          button_text,
          button_path,
          features: parsedFeatures,
          intro_heading,
          intro_highlight,
          paragraph_text,
        };

        if (images.length > 0) {
          updateData.image = images;
        }

        try {
          const updated = await Hero.findByIdAndUpdate(id, updateData, {
            new: true,
          });
          if (!updated) {
            return res.status(404).json({ error: "Hero section not found" });
          }
          return res
            .status(200)
            .json({ message: "Hero section updated", data: updated });
        } catch (error) {
          console.error("Error updating Hero section:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
    } else if (req.method === "DELETE") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for deletion." });
      }

      try {
        const deleted = await Hero.findByIdAndDelete(id);
        if (!deleted) {
          return res.status(404).json({ error: "Hero section not found" });
        }
        return res.status(200).json({ message: "Hero section deleted" });
      } catch (error) {
        console.error("Error deleting Hero section:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  },
  team: async (req, res) => {
    const id = req.params.id;

    if (req.method === "POST") {
      return logMulter(req, res, async () => {
        const {
          name,
          designation,
          linkedin_url,
          twitter_url,
          facebook_url,
          instagram_url,
          title,
        } = req.body;
        const image =
          req.files && req.files.image && req.files.image.length > 0
            ? req.files.image[0].path
            : null;
        if (!name || !designation || !image) {
          return res.status(400).json({
            error: "Name, Designation, and Image are required.",
          });
        }

        try {
          const newTeamMember = new Team({
            name,
            designation,
            image,
            linkedin_url,
            twitter_url,
            facebook_url,
            instagram_url,
          });
          await newTeamMember.save();
          return res.status(201).json({
            message: "Team member added",
            data: newTeamMember,
          });
        } catch (error) {
          console.error("Error saving team member:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
    } else if (req.method === "GET") {
      try {
        if (id) {
          const teamMember = await Team.findById(id);
          if (!teamMember) {
            return res.status(404).json({ error: "Team member not found" });
          }
          return res.status(200).json(teamMember);
        } else {
          const teamMembers = await Team.find().sort({ createdAt: -1 });
          return res.status(200).json(teamMembers);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "PUT") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for update" });
      }
      return logMulter(req, res, async () => {
        const {
          name,
          designation,
          linkedin_url,
          twitter_url,
          facebook_url,
          instagram_url,
        } = req.body;
        const image = req.file ? req.file.path : undefined;
        const updateData = {
          name,
          designation,
          linkedin_url,
          twitter_url,
          facebook_url,
          instagram_url,
        };
        if (image) {
          updateData.image = image;
        }
        try {
          const updatedTeamMember = await Team.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
          );
          if (!updatedTeamMember) {
            return res.status(404).json({ error: "Team member not found" });
          }
          return res.status(200).json({
            message: "Team member updated",
            data: updatedTeamMember,
          });
        } catch (error) {
          console.error("Error updating team member:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
    } else if (req.method === "DELETE") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for deletion." });
      }

      try {
        const deletedTeamMember = await Team.findByIdAndDelete(id);
        if (!deletedTeamMember) {
          return res.status(404).json({ error: "Team member not found" });
        }
        return res.status(200).json({ message: "Team member deleted" });
      } catch (error) {
        console.error("Error deleting team member:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  },

  productsList: (req, res) => {},

  service : async (req, res) => {
  const id = req.params.id; // Parent Service document ID
  const itemId = req.params.itemId; // ID of the individual service item in the services array

  try {
    // GET: Fetch all Service documents
    if (req.method === 'GET' && !id) {
      const data = await Service.find().sort({ _id: -1 });
      return res.status(200).json(data);
    }

    // GET: Fetch a specific service item by itemId
    if (req.method === 'GET' && id && itemId && req.path.includes('/service-item')) {
      const service = await Service.findById(id);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      const serviceItem = service.services.id(itemId);
      if (!serviceItem) {
        return res.status(404).json({ error: 'Service item not found' });
      }
      return res.status(200).json(serviceItem);
    }

    // POST: Create a new Service document
    if (req.method === 'POST' && !id) {
      const { sectionTitle, heading, subtitle, services, topBanner, callToAction } = req.body;
      if (!sectionTitle || !heading || !subtitle || !Array.isArray(services)) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const newService = new Service({
        sectionTitle,
        heading,
        subtitle,
        services: services.map((service) => ({
          ...service,
          _id: new mongoose.Types.ObjectId(), // Generate _id for each service item
        })),
        topBanner,
        callToAction,
      });
      await newService.save();
      return res.status(201).json({ message: 'Service content created', data: newService });
    }

    // POST: Add a new service item to the services array
    if (req.method === 'POST' && id && req.path.includes('/service-item')) {
      const { title, description, icon } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }
      const updated = await Service.findByIdAndUpdate(
        id,
        {
          $push: {
            services: {
              _id: new mongoose.Types.ObjectId(),
              title,
              description,
              icon,
            },
          },
          updatedAt: Date.now(),
        },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Service not found' });
      return res.status(201).json({ message: 'Service item added', data: updated });
    }

    // PUT: Update the entire Service document
    if (req.method === 'PUT' && id && !req.path.includes('/service-item')) {
      const updated = await Service.findByIdAndUpdate(
        id,
        { ...req.body, updatedAt: Date.now() },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json({ message: 'Updated successfully', data: updated });
    }

    // PUT: Update a specific service item in the services array
    if (req.method === 'PUT' && id && itemId && req.path.includes('/service-item')) {
      const { title, description, icon } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }
      const updated = await Service.findOneAndUpdate(
        { _id: id, 'services._id': itemId },
        {
          $set: {
            'services.$.title': title,
            'services.$.description': description,
            'services.$.icon': icon || undefined,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Service or service item not found' });
      return res.status(200).json({ message: 'Service item updated', data: updated });
    }

    // DELETE: Delete the entire Service document
    if (req.method === 'DELETE' && id && !req.path.includes('/service-item')) {
      const deleted = await Service.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json({ message: 'Deleted successfully' });
    }

    // DELETE: Delete a specific service item from the services array
    if (req.method === 'DELETE' && id && itemId && req.path.includes('/service-item')) {
      const updated = await Service.findByIdAndUpdate(
        id,
        {
          $pull: { services: { _id: itemId } },
          updatedAt: Date.now(),
        },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Service or service item not found' });
      return res.status(200).json({ message: 'Service item deleted', data: updated });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Service error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
},

 serviceSection : async (req, res) => {
  const { id, itemId } = req.params;
  const isItService = req.path.includes("/it-service-item");
  const isProduct = req.path.includes("/product-item");

  try {
    // GET: Fetch all documents
    if (req.method === "GET" && !id) {
      const data = await ServiceSection.find().sort({ _id: -1 });
      return res.status(200).json(data);
    }

    // GET: Fetch a specific item
    if (req.method === "GET" && id && itemId && (isItService || isProduct)) {
      const section = await ServiceSection.findById(id);
      if (!section) return res.status(404).json({ error: "Section not found" });

      const item = isItService
        ? section.itServices.id(itemId)
        : section.products.id(itemId);

      if (!item) return res.status(404).json({ error: "Item not found" });

      return res.status(200).json(item);
    }

    // POST: Create full section
    if (req.method === "POST" && !id) {
      const { sectionTitle, itServicesTitle, productsTitle, itServices, products } = req.body;

      if (!sectionTitle || !itServicesTitle) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newSection = new ServiceSection({
        sectionTitle,
        itServicesTitle,
        productsTitle,
        itServices: (itServices || []).map(item => ({
          ...item,
          _id: new mongoose.Types.ObjectId()
        })),
        products: (products || []).map(item => ({
          ...item,
          _id: new mongoose.Types.ObjectId()
        }))
      });

      await newSection.save();
      return res.status(201).json({ message: "Section created", data: newSection });
    }

    // POST: Add a new item
    if (req.method === "POST" && id && (isItService || isProduct)) {
      const { title, description, icon } = req.body;
      if (!title || !description) return res.status(400).json({ error: "Missing title/description" });

      const update = {
        $push: {
          [isItService ? "itServices" : "products"]: {
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            icon
          }
        }
      };

      const updated = await ServiceSection.findByIdAndUpdate(id, update, { new: true });
      if (!updated) return res.status(404).json({ error: "Section not found" });

      return res.status(201).json({ message: "Item added", data: updated });
    }

    // PUT: Update full section
    if (req.method === "PUT" && id && !isItService && !isProduct) {
      const updated = await ServiceSection.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ error: "Section not found" });

      return res.status(200).json({ message: "Section updated", data: updated });
    }

    // PUT: Update an individual item
    if (req.method === "PUT" && id && itemId && (isItService || isProduct)) {
      const { title, description, icon } = req.body;

      const updated = await ServiceSection.findOneAndUpdate(
        {
          _id: id,
          [`${isItService ? "itServices" : "products"}._id`]: itemId
        },
        {
          $set: {
            [`${isItService ? "itServices" : "products"}.$.title`]: title,
            [`${isItService ? "itServices" : "products"}.$.description`]: description,
            [`${isItService ? "itServices" : "products"}.$.icon`]: icon
          }
        },
        { new: true }
      );

      if (!updated) return res.status(404).json({ error: "Item not found" });

      return res.status(200).json({ message: "Item updated", data: updated });
    }

    // DELETE: Delete full section
    if (req.method === "DELETE" && id && !isItService && !isProduct) {
      const deleted = await ServiceSection.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: "Section not found" });

      return res.status(200).json({ message: "Section deleted" });
    }

    // DELETE: Delete an item
    if (req.method === "DELETE" && id && itemId && (isItService || isProduct)) {
      const pullField = isItService ? "itServices" : "products";

      const updated = await ServiceSection.findByIdAndUpdate(
        id,
        {
          $pull: {
            [pullField]: { _id: itemId }
          }
        },
        { new: true }
      );

      if (!updated) return res.status(404).json({ error: "Section or item not found" });

      return res.status(200).json({ message: "Item deleted", data: updated });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("ServiceSection error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
},



  collaboration: async (req, res) => {
    const id = req.params.id;

    try {
      if (req.method === "GET") {
        const data = await Collaboration.find().sort({ _id: -1 });
        return res.status(200).json(data);
      } else if (req.method === "POST") {
        const { sectionSubtitle, sectionTitle, features, buttons } = req.body;

        if (
          !sectionSubtitle ||
          !sectionTitle ||
          !features ||
          !Array.isArray(features)
        ) {
          return res.status(400).json({
            error:
              "sectionSubtitle, sectionTitle, and a valid features array are required.",
          });
        }

        const newDoc = new Collaboration({
          sectionSubtitle,
          sectionTitle,
          features,
          buttons: buttons || [],
        });

        await newDoc.save();
        return res
          .status(201)
          .json({ message: "Collaboration section created", data: newDoc });
      } else if (req.method === "PUT") {
        if (!id) {
          return res.status(400).json({ error: "ID is required for update." });
        }

        const updated = await Collaboration.findByIdAndUpdate(id, req.body, {
          new: true,
        });

        if (!updated) {
          return res
            .status(404)
            .json({ error: "Collaboration data not found." });
        }

        return res
          .status(200)
          .json({ message: "Collaboration section updated", data: updated });
      } else if (req.method === "DELETE") {
        if (!id) {
          return res
            .status(400)
            .json({ error: "ID is required for deletion." });
        }

        const deleted = await Collaboration.findByIdAndDelete(id);

        if (!deleted) {
          return res
            .status(404)
            .json({ error: "Collaboration data not found." });
        }

        return res
          .status(200)
          .json({ message: "Collaboration section deleted" });
      } else {
        return res.status(405).json({ error: "Method not allowed" });
      }
    } catch (error) {
      console.error("Collaboration controller error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  latestProject: async (req, res) => {
    const id = req.params.id;

    if (req.method === "POST") {
      return logMulter(req, res, async () => {
        const { title, author, description } = req.body;
        const image =
          req.files && req.files.length > 0 ? req.files[0].path : null;

        if (!image || !title || !author || !description) {
          return res.status(400).json({
            error: "Image, Title, Author, and Description are required.",
          });
        }

        try {
          const newlatestProject = new LatestProject({
            image,
            title,
            author,
            description,
          });
          await newlatestProject.save();
          return res
            .status(201)
            .json({ message: "Latest Project added", data: newlatestProject });
        } catch (error) {
          console.error("Error saving Latest Projects:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
    } else if (req.method === "GET") {
      try {
        const latestProjects = await LatestProject.find().sort({ _id: -1 });
        return res.status(200).json(latestProjects);
      } catch (error) {
        console.error("Error fetching Latest Projects:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "PUT") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for update." });
      }

      return logMulter(req, res, async () => {
        const { title, author, description } = req.body;
        const image = req.file ? req.file.path : undefined;

        const updateData = {
          title,
          author,
          description,
        };

        if (image) {
          updateData.image = image;
        }

        try {
          const updated = await LatestProject.findByIdAndUpdate(
            id,
            updateData,
            {
              new: true,
            }
          );
          if (!updated) {
            return res.status(404).json({ error: "Latest Project not found" });
          }
          return res
            .status(200)
            .json({ message: "Latest Project updated", data: updated });
        } catch (error) {
          console.error("Error updating Latest Projects:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
    } else if (req.method === "DELETE") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for deletion." });
      }

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
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  },

  ourSkills: async (req, res) => {
    const id = req.params.id;
    const skillId = req.params.skillId;

    if (req.method === "POST" && id && req.url.endsWith("/skill")) {
      const { name, percentage } = req.body;

      if (!name || percentage === undefined) {
        return res
          .status(400)
          .json({ error: "Name and percentage are required." });
      }

      if (percentage < 0 || percentage > 100) {
        return res
          .status(400)
          .json({ error: "Percentage must be between 0 and 100." });
      }

      try {
        const updated = await OurSkills.findByIdAndUpdate(
          id,
          { $push: { skills: { name, percentage } } },
          { new: true }
        );

        if (!updated)
          return res.status(404).json({ error: "OurSkills not found" });

        return res.status(200).json({ message: "Skill added", data: updated });
      } catch (error) {
        console.error("Error adding skill:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }

    // 🔹 Update a specific skill item
    else if (req.method === "PUT" && id && skillId) {
      const { name, percentage } = req.body;

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
    }

    // 🔹 Delete a specific skill item
    else if (req.method === "DELETE" && id && skillId) {
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
    }

    // 🔹 Create new skill section
    else if (req.method === "POST") {
      const { title, highlight, description, skills, buttonText, buttonLink } =
        req.body;

      if (
        !title ||
        !highlight ||
        !description ||
        !skills ||
        !Array.isArray(skills)
      ) {
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
        return res
          .status(201)
          .json({ message: "Skill section added", data: newSkillSet });
      } catch (error) {
        console.error("Error saving skill section:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }

    // 🔹 Get latest skill section
    else if (req.method === "GET") {
      try {
        const result = await OurSkills.findOne().sort({ _id: -1 });
        return res.status(200).json(result);
      } catch (error) {
        console.error("Error fetching skill section:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }

    // 🔹 Update entire section
    else if (req.method === "PUT") {
      if (!id)
        return res.status(400).json({ error: "ID is required for update." });

      try {
        const updated = await OurSkills.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res
          .status(200)
          .json({ message: "Skill section updated", data: updated });
      } catch (error) {
        console.error("Error updating skill section:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }

    else if (req.method === "DELETE") {
      if (!id)
        return res.status(400).json({ error: "ID is required for deletion." });

      try {
        await OurSkills.findByIdAndDelete(id);
        return res.status(200).json({ message: "Skill section deleted" });
      } catch (error) {
        console.error("Error deleting skill section:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }

    else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  },

  latestThinking: async (req, res) => {
    const id = req.params.id;

    if (req.method === "GET") {
      try {
        const results = await LatestThinking.aggregate([
          {
            $group: {
              _id: {
                title: "$title",
                description: "$description",
                image: "$image",
                author: "$author",
              },
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
      } catch (err) {
        console.error("Error fetching Latest Thinking:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
    if (req.method === "POST") {
      return logMulter(req, res, async () => {
        console.log("Post-handler req.file:", req.file);
        console.log("Post-handler req.body:", req.body);

        const { title, description, order, author } = req.body;
        const image = req.file ? req.file.path : null;

        if (!title || !description || !image || !author) {
          console.log("Validation failed:", {
            title,
            description,
            image,
            author,
          });
          return res.status(400).json({
            error: "Title, description, image, and author are required.",
          });
        }

        try {
          const existing = await LatestThinking.findOne({
            title,
            description,
            image,
            author,
          });
          if (existing) {
            return res.status(409).json({
              error: "Duplicate entry already exists.",
            });
          }

          const newEntry = new LatestThinking({
            title,
            description,
            image,
            order,
            author,
          });
          await newEntry.save();
          return res
            .status(201)
            .json({ message: "Latest Thinking added", data: newEntry });
        } catch (err) {
          console.error("Error creating Latest Thinking:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
    }
    if (req.method === "PUT") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for update." });
      }

      try {
        const updated = await LatestThinking.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res
          .status(200)
          .json({ message: "Updated successfully", data: updated });
      } catch (err) {
        console.error("Error updating Latest Thinking:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    }

    if (req.method === "DELETE") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for deletion." });
      }

      try {
        await LatestThinking.findByIdAndDelete(id);
        return res.status(200).json({ message: "Deleted successfully" });
      } catch (err) {
        console.error("Error deleting Latest Thinking:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
    return res.status(405).json({ error: "Method not allowed" });
  },

  review: async (req, res) => {
    const id = req.params.id;
    if (req.method === "POST") {
      const { rating, user_name, comments, company, avatar } = req.body;
      if (!rating || !user_name || !comments || !company || !avatar) {
        return res.status(400).json({
          error:
            "Rating, user name, comments, company, and avatar are required.",
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
        return res
          .status(201)
          .json({ message: "Review added", data: newReview });
      } catch (error) {
        console.error("Error saving Review:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "GET") {
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
    } else if (req.method === "PUT") {
      if (!id)
        return res.status(400).json({ error: "ID is required for update." });
      try {
        const updated = await Review.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updated) {
          return res.status(404).json({ error: "Review not found" });
        }
        return res
          .status(200)
          .json({ message: "Review updated", data: updated });
      } catch (error) {
        console.error("Error updating Review:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "DELETE") {
      if (!id)
        return res.status(400).json({ error: "ID is required for deletion." });
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
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  },

  serviceFooter: async (req, res) => {
    const id = req.params.id;

    if (req.method === "POST") {
      const {
        logoText,
        address,
        phone,
        email,
        socialLinks,
        links,
        copyright,
        reserved,
        joinHeading,
        joinDescription,
      } = req.body;

      if (!logoText || !address || !phone || !email || !socialLinks || !links) {
        return res
          .status(400)
          .json({ error: "All required fields must be provided." });
      }

      try {
        const footer = new ServiceFooter({
          logoText,
          address,
          phone,
          email,
          socialLinks,
          links,
          copyright,
          reserved,
          joinHeading,
          joinDescription,
        });

        await footer.save();
        return res
          .status(201)
          .json({ message: "Service footer saved", data: footer });
      } catch (err) {
        console.error("Error saving footer:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "GET") {
      try {
        const footer = await ServiceFooter.find().sort({ _id: -1 });
        return res.status(200).json(footer);
      } catch (err) {
        console.error("Error fetching footer:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "PUT") {
      if (!id)
        return res.status(400).json({ error: "ID is required for update." });

      try {
        const updated = await ServiceFooter.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res
          .status(200)
          .json({ message: "Footer updated", data: updated });
      } catch (err) {
        console.error("Error updating footer:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "DELETE") {
      if (!id)
        return res.status(400).json({ error: "ID is required for deletion." });

      try {
        await ServiceFooter.findByIdAndDelete(id);
        return res.status(200).json({ message: "Footer deleted" });
      } catch (err) {
        console.error("Error deleting footer:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  },

  footer: async (req, res) => {
    const id = req.params.id;

    if (req.method === "POST") {
      try {
        const {
          socialLinks,
          sectionTitles,
          menuLinks,
          productLinks,
          branch,
          copyright,
          policyLinks,
        } = req.body;

        const cleanProductLinks =
          req.body["productLinks"] || req.body["productLinks\t"];

        if (
          !socialLinks ||
          !sectionTitles ||
          !menuLinks ||
          !cleanProductLinks ||
          !branch ||
          !policyLinks
        ) {
          return res
            .status(400)
            .json({ error: "All required fields must be provided." });
        }

        const newFooter = new Footer({
          socialLinks: JSON.parse(socialLinks),
          sectionTitles: JSON.parse(sectionTitles.replace(/^json/, "")),
          menuLinks: JSON.parse(menuLinks),
          productLinks: JSON.parse(cleanProductLinks),
          branch: JSON.parse(branch),
          policyLinks: JSON.parse(policyLinks),
          copyright,
        });

        await newFooter.save();
        return res
          .status(201)
          .json({ message: "Footer saved successfully", data: newFooter });
      } catch (error) {
        console.error("Error saving footer:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "GET") {
      try {
        const footers = await Footer.find().sort({ _id: -1 });
        return res.status(200).json(footers);
      } catch (error) {
        console.error("Error fetching footer:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "PUT") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for update." });
      }

      try {
        const updated = await Footer.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res
          .status(200)
          .json({ message: "Footer updated", data: updated });
      } catch (error) {
        console.error("Error updating footer:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "DELETE") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for deletion." });
      }

      try {
        await Footer.findByIdAndDelete(id);
        return res.status(200).json({ message: "Footer deleted successfully" });
      } catch (error) {
        console.error("Error deleting footer:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  },

  about: async (req, res) => {
    const id = req.params.id;

    if (req.method === "POST") {
      return logMulter(req, res, async () => {
        const {
          subtitle,
          title,
          highlight,
          paragraph1,
          paragraph2,
          buttonText,
          buttonLink,
        } = req.body;

        const image = req.files?.image?.[0]?.path;

        if (
          !subtitle ||
          !title ||
          !highlight ||
          !paragraph1 ||
          !paragraph2 ||
          !image
        ) {
          return res.status(400).json({
            error:
              "Image, Subtitle, Title, Highlight, Paragraph1, and Paragraph2 are required.",
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
          return res
            .status(201)
            .json({ message: "About section created", data: aboutSection });
        } catch (err) {
          console.error("Error creating About section:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
    }

    if (req.method === "PUT") {
      if (!id)
        return res.status(400).json({ error: "ID is required for update." });

      return logMulter(req, res, async () => {
        const {
          subtitle,
          title,
          highlight,
          paragraph1,
          paragraph2,
          buttonText,
          buttonLink,
        } = req.body;

        const image = req.files?.image?.[0]?.path;

        const existing = await About.findById(id);
        if (!existing)
          return res.status(404).json({ error: "About not found." });

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

        try {
          const updated = await About.findByIdAndUpdate(id, updateData, {
            new: true,
          });
          return res
            .status(200)
            .json({ message: "About updated", data: updated });
        } catch (err) {
          console.error("Error updating About section:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
    }

    if (req.method === "GET") {
      try {
        const about = await About.findOne().sort({ _id: -1 });
        return res.status(200).json(about);
      } catch (err) {
        console.error("Error fetching About section:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    }

    if (req.method === "DELETE") {
      if (!id)
        return res.status(400).json({ error: "ID is required for deletion." });

      try {
        const aboutEntry = await About.findById(id);
        if (!aboutEntry) {
          return res.status(404).json({ error: "About section not found." });
        }

        // delete image file from disk
        if (aboutEntry.image) {
          const filePath = path.join(__dirname, "..", "..", aboutEntry.image);
          fs.unlink(filePath, (err) => {
            if (err) console.warn("Image deletion failed:", err.message);
          });
        }

        await About.findByIdAndDelete(id);
        return res.status(200).json({ message: "About section deleted." });
      } catch (err) {
        console.error("Error deleting About section:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    }

    return res.status(405).json({ error: "Method not allowed" });
  },

  value: async (req, res) => {
    const id = req.params.id;

    if (req.method === "POST") {
      const { mainTitle, highlight, suffix, values } = req.body;

      if (!mainTitle || !highlight || !suffix || !Array.isArray(values)) {
        return res.status(400).json({
          error:
            "All fields (mainTitle, highlight, suffix, values[]) are required.",
        });
      }

      try {
        const newValue = new Value({ mainTitle, highlight, suffix, values });
        await newValue.save();
        return res
          .status(201)
          .json({ message: "Value added successfully", data: newValue });
      } catch (error) {
        console.error("Error saving value:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "GET") {
      try {
        const value = await Value.findOne().sort({ _id: -1 }); // ✅ only one
        if (!value) return res.status(404).json({ error: "No values found" });

        return res.status(200).json(value); // ✅ send one object
      } catch (error) {
        console.error("Error fetching value:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "PUT") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for update." });
      }

      try {
        const updatedValue = await Value.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res
          .status(200)
          .json({ message: "Value updated successfully", data: updatedValue });
      } catch (error) {
        console.error("Error updating value:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else if (req.method === "DELETE") {
      if (!id) {
        return res.status(400).json({ error: "ID is required for deletion." });
      }

      try {
        await Value.findByIdAndDelete(id);
        return res.status(200).json({ message: "Value deleted successfully" });
      } catch (error) {
        console.error("Error deleting value:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  },
};
