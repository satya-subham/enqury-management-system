import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    customerName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'], 
        default: "Pending" // e.g., Pending, In Progress, Completed
    }, 
    assignedTo: { 
        type: String // could be user ID or name
    }, 
    isDeleted: { 
        type: Boolean, 
        default: false // for soft delete
    }, 
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
