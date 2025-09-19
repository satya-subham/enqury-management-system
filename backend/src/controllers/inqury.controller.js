import Enquiry from "../models/inqury.model.js";
export async function addInqury(req, res) {
  try {
    const {customerName, email, phone, message, status, assignedTo, isDeleted} = req.body;
    if (!customerName || !email || !phone || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (status && !['Pending', 'In Progress', 'Completed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }
    if (isDeleted) {
        return res.status(400).json({ error: 'isDeleted cannot be set on creation' });
    }
    if (assignedTo && typeof assignedTo !== 'string') {
        return res.status(400).json({ error: 'Invalid assignedTo value' });
    }
    if (typeof customerName !== 'string' || typeof email !== 'string' || typeof phone !== 'string' || typeof message !== 'string') {
        return res.status(400).json({ error: 'Invalid data types for fields' });
    }
    if (customerName.length > 100 || email.length > 100 || phone.length > 15 || message.length > 1000) {
        return res.status(400).json({ error: 'Field lengths exceed allowed limits' });
    }
    
    if (phone && !/^\+?[0-9]{7,15}$/.test(phone)) {
        return res.status(400).json({ error: 'Invalid phone number format' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    const enquiry = new Enquiry({
        customerName,
        email,
        phone,
        message,
        status: status || 'Pending',
        assignedTo: assignedTo || null,
        isDeleted: false
    });
    await enquiry.save();
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getInquries(req, res) {
  try {
    const filters = { isDeleted: false, ...req.query }; // filter out soft deleted
    const enquiries = await Enquiry.find(filters);
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getInquryById(req, res) {
  try {
    const enquiry = await Enquiry.findOne({ _id: req.params.id, isDeleted: false });
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });
    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateInqury(req, res) {
  try {
    const enquiry = await Enquiry.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });
    res.status(200).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteInqury(req, res) {
  try {
    const enquiry = await Enquiry.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found or already deleted' });
    res.status(200).json({ message: 'Enquiry soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}