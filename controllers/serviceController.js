const ServiceSection = require("../models/serviceSectionModel");
const Service = require("../models/serviceModel");
const mongoose = require('mongoose');

module.exports = {
  // --- SERVICE HANDLERS ---
  createService: async (req, res) => {
    const { sectionTitle, heading, subtitle, services, topBanner, callToAction } = req.body;

    if (!sectionTitle || !heading || !subtitle || !Array.isArray(services)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newService = new Service({
        sectionTitle,
        heading,
        subtitle,
        services: services.map(s => ({ ...s, _id: new mongoose.Types.ObjectId() })),
        topBanner,
        callToAction,
      });

      await newService.save();
      return res.status(201).json({ message: 'Service created', data: newService });
    } catch (err) {
      console.error('Create service error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAllServices: async (req, res) => {
    try {
      const data = await Service.find().sort({ _id: -1 });
      return res.status(200).json(data);
    } catch (err) {
      console.error('Get services error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateService: async (req, res) => {
    const id = req.params.id;

    try {
      const updated = await Service.findByIdAndUpdate(id, { ...req.body, updatedAt: Date.now() }, { new: true });
      if (!updated) return res.status(404).json({ error: 'Service not found' });
      return res.status(200).json({ message: 'Service updated', data: updated });
    } catch (err) {
      console.error('Update service error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteService: async (req, res) => {
    const id = req.params.id;

    try {
      const deleted = await Service.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Service not found' });
      return res.status(200).json({ message: 'Service deleted' });
    } catch (err) {
      console.error('Delete service error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getServiceItem: async (req, res) => {
    const { id, itemId } = req.params;

    try {
      const service = await Service.findById(id);
      if (!service) return res.status(404).json({ error: 'Service not found' });

      const item = service.services.id(itemId);
      if (!item) return res.status(404).json({ error: 'Service item not found' });

      return res.status(200).json(item);
    } catch (err) {
      console.error('Get service item error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  createServiceItem: async (req, res) => {
    const { id } = req.params;
    const { title, description, icon } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required' });
    }

    try {
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
    } catch (err) {
      console.error('Create service item error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateServiceItem: async (req, res) => {
    const { id, itemId } = req.params;
    const { title, description, icon } = req.body;

    try {
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

      if (!updated) return res.status(404).json({ error: 'Service or item not found' });
      return res.status(200).json({ message: 'Service item updated', data: updated });
    } catch (err) {
      console.error('Update service item error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteServiceItem: async (req, res) => {
    const { id, itemId } = req.params;

    try {
      const updated = await Service.findByIdAndUpdate(
        id,
        {
          $pull: { services: { _id: itemId } },
          updatedAt: Date.now(),
        },
        { new: true }
      );

      if (!updated) return res.status(404).json({ error: 'Service or item not found' });
      return res.status(200).json({ message: 'Service item deleted', data: updated });
    } catch (err) {
      console.error('Delete service item error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // --- SERVICE SECTION HANDLERS ---
  createServiceSection: async (req, res) => {
    const { sectionTitle, itServicesTitle, productsTitle, itServices, products } = req.body;

    if (!sectionTitle || !itServicesTitle) {
      return res.status(400).json({ error: 'sectionTitle and itServicesTitle are required' });
    }

    try {
      const newSection = new ServiceSection({
        sectionTitle,
        itServicesTitle,
        productsTitle: productsTitle || '',
        itServices: itServices || [],
        products: products || [],
      });

      await newSection.save();
      return res.status(201).json({ message: 'Service section created', data: newSection });
    } catch (err) {
      console.error('Create section error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getServiceSection: async (req, res) => {
    try {
      const data = await ServiceSection.findOne();
      if (!data) return res.status(404).json({ error: 'Section not found' });
      return res.status(200).json(data);
    } catch (err) {
      console.error('Get section error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateServiceSection: async (req, res) => {
    const { id } = req.params;
    try {
      const updated = await ServiceSection.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ error: 'Section not found' });
      return res.status(200).json({ message: 'Section updated', data: updated });
    } catch (err) {
      console.error('Update section error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteServiceSection: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await ServiceSection.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Section not found' });
      return res.status(200).json({ message: 'Section deleted' });
    } catch (err) {
      console.error('Delete section error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

    // --- SERVICE SECTION ITEM HANDLERS ---

    getSectionItem: async (req, res) => {
  const { id, type, itemId } = req.params;

  if (!['itServices', 'products'].includes(type)) {
    return res.status(400).json({ error: 'Invalid section type' });
  }

  try {
    const section = await ServiceSection.findById(id);

    if (!section) return res.status(404).json({ error: 'Section not found' });

    const item = section[type].find(i => i._id.toString() === itemId);
    if (!item) return res.status(404).json({ error: `${type} item not found` });

    return res.status(200).json({ data: item });
  } catch (err) {
    console.error('Get section item error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
},


  createSectionItem: async (req, res) => {
    const { id, type } = req.params; // type = 'itServices' or 'products'
    const { title, description } = req.body;

    if (!['itServices', 'products'].includes(type)) {
      return res.status(400).json({ error: 'Invalid section type' });
    }

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required' });
    }

    try {
      const update = await ServiceSection.findByIdAndUpdate(
        id,
        {
          $push: {
            [type]: {
              _id: new mongoose.Types.ObjectId(),
              title,
              description,
            },
          },
        },
        { new: true }
      );

      if (!update) return res.status(404).json({ error: 'Section not found' });
      return res.status(201).json({ message: `${type} item added`, data: update });
    } catch (err) {
      console.error('Create section item error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateSectionItem: async (req, res) => {
    const { id, type, itemId } = req.params;
    const { title, description } = req.body;

    if (!['itServices', 'products'].includes(type)) {
      return res.status(400).json({ error: 'Invalid section type' });
    }

    try {
      const updated = await ServiceSection.findOneAndUpdate(
        { _id: id, [`${type}._id`]: itemId },
        {
          $set: {
            [`${type}.$.title`]: title,
            [`${type}.$.description`]: description,
          },
        },
        { new: true }
      );

      if (!updated) return res.status(404).json({ error: 'Section or item not found' });
      return res.status(200).json({ message: 'Section item updated', data: updated });
    } catch (err) {
      console.error('Update section item error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteSectionItem: async (req, res) => {
    const { id, type, itemId } = req.params;

    if (!['itServices', 'products'].includes(type)) {
      return res.status(400).json({ error: 'Invalid section type' });
    }

    try {
      const updated = await ServiceSection.findByIdAndUpdate(
        id,
        {
          $pull: {
            [type]: { _id: itemId },
          },
        },
        { new: true }
      );

      if (!updated) return res.status(404).json({ error: 'Section or item not found' });
      return res.status(200).json({ message: 'Section item deleted', data: updated });
    } catch (err) {
      console.error('Delete section item error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

};

  