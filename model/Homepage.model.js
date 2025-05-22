import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
});

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: imageSchema,
    default: null,
  },
  extendedDescription: {
    type: String,
    required: true,
  },
});

const authorSchema = new mongoose.Schema({
  image: {
    type: imageSchema,
    default: null,
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: imageSchema,
    default: null,
  },
});

const impactCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: imageSchema,
    default: null,
  },
  expandedDescription: {
    type: String,
    required: true,
  },
});

const quotes = new mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  italic: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

// main homepage schema
const HomepageSchema = new mongoose.Schema({
  hero: {
    images: {
      type: [imageSchema],
      default: [], // Default to 7 null images
    },
    mobileImages: {
      type: [imageSchema],
      default: [], // Default to 7 null images
    },
    title1: {
      word1: {
        type: String,
        required: true,
      },
      word2: {
        type: String,
        required: true,
      },
    },
    title2: {
      word1: {
        type: String,
        required: true,
      },
      word2: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  impact: {
    title1: {
      type: String,
      required: true,
    },
    title2: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ImpactCards: {
      type: [impactCardSchema],
      default: [null, null, null, null, null], // Default to 4 null cards
      required: true,
    },
  },
  scrollQuotes: {
    type: [quotes],
    required: true,
  },
  ourWork: {
    description: {
      type: String,
      required: true,
    },
    cards: {
      type: [CardSchema],
      required: true,
    },
  },
  mission: {
    primaryTitle: {
      type: String,
      required: true,
    },
    secondaryTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  raiseProject: {
    image: {
      type: imageSchema,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    mobileImages: {
      type: imageSchema,
      default: null,
    },
  },
  testimonial: {
    description: {
      type: String,
      required: true,
    },
    // an array will come here
    authors: {
      type: [authorSchema],
      required: true,
    },
  },
  clients: {
    type: [clientSchema],
    required: true,
  },
});

const homepageModel = mongoose.model("homepage", HomepageSchema);

export default homepageModel;
